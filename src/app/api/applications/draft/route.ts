import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// DraftStore interface for pluggable persistence
interface DraftStore {
  saveDraft(key: string, data: any): Promise<void>;
  getDraft(key: string): Promise<any | null>;
  deleteDraft(key: string): Promise<void>;
  getAllDrafts(): Promise<any[]>;
}

// File-based implementation for development/fallback
class FileDraftStore implements DraftStore {
  private draftsDir: string;

  constructor() {
    this.draftsDir = path.join(process.cwd(), '.drafts');
    this.ensureDraftsDir();
  }

  private ensureDraftsDir() {
    if (!fs.existsSync(this.draftsDir)) {
      fs.mkdirSync(this.draftsDir, { recursive: true });
    }
  }

  private getDraftPath(key: string): string {
    // Use SHA-256 hash for collision-resistant encoding
    const hash = crypto.createHash('sha256').update(key).digest('hex');
    // Keep a short prefix for readability
    const prefix = key.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 16);
    return path.join(this.draftsDir, `${prefix}_${hash}.json`);
  }

  async saveDraft(key: string, data: any): Promise<void> {
    this.ensureDraftsDir();
    const filePath = this.getDraftPath(key);
    const tempPath = `${filePath}.tmp.${Date.now()}`;

    try {
      // Write to temp file first
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      // Atomically rename to final path
      fs.renameSync(tempPath, filePath);
    } catch (error) {
      // Clean up temp file on error
      try {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      } catch (cleanupError) {
        console.error('Error cleaning up temp file:', cleanupError);
      }
      console.error('Error writing draft file:', error);
      throw error;
    }
  }

  async getDraft(key: string): Promise<any | null> {
    this.ensureDraftsDir();
    const filePath = this.getDraftPath(key);
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Error reading draft file:', error);
    }
    return null;
  }

  async deleteDraft(key: string): Promise<void> {
    this.ensureDraftsDir();
    const filePath = this.getDraftPath(key);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting draft file:', error);
      throw error;
    }
  }

  async getAllDrafts(): Promise<any[]> {
    this.ensureDraftsDir();
    try {
      const files = fs.readdirSync(this.draftsDir)
        .filter(f => f.endsWith('.json') && !f.includes('.tmp'));

      const drafts = [];
      for (const file of files) {
        try {
          const filePath = path.join(this.draftsDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const draft = JSON.parse(content);
          drafts.push(draft);
        } catch (parseError) {
          console.error(`Error parsing draft file ${file}:`, parseError);
        }
      }
      return drafts;
    } catch (error) {
      console.error('Error listing drafts:', error);
      return [];
    }
  }
}

// TODO: In production, replace with database/Redis/S3-backed implementation
// Example: const draftStore: DraftStore = new DatabaseDraftStore();
const draftStore: DraftStore = process.env.NODE_ENV === 'production' && process.env.DRAFT_STORE_TYPE === 'external'
  ? (() => { throw new Error('External draft store not configured. Set up DatabaseDraftStore or similar.') })()
  : new FileDraftStore();

// Helper to get user ID from session
const getUserId = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    if (sessionCookie) {
      const session = JSON.parse(sessionCookie.value);
      return session.userId || session.user?.id || 'temp-user-id';
    }
  } catch (error) {
    console.error('Error getting user ID:', error);
  }
  return 'temp-user-id'; // Fallback for development
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate insuranceType
    if (typeof body.insuranceType !== 'string' || body.insuranceType.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'insuranceType is required' },
        { status: 400 }
      );
    }

    // Generate a unique key for this user's draft of this insurance type
    const draftKey = `${userId}-${body.insuranceType}`;

    // Get existing draft if any
    const existingDraft = await draftStore.getDraft(draftKey);

    const draftData = {
      id: body.id || existingDraft?.id || `draft-${Date.now()}`,
      userId,
      insuranceType: body.insuranceType,
      status: 'draft',
      data: body.data || {},
      lastSavedStep: body.lastSavedStep ?? existingDraft?.lastSavedStep ?? 0,
      savedAt: body.savedAt || new Date().toISOString(),
      createdAt: existingDraft?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save the draft via store
    await draftStore.saveDraft(draftKey, draftData);

    console.log('Draft saved:', draftKey);

    return NextResponse.json({
      success: true,
      id: draftData.id,
      message: 'Draft saved successfully',
    });
  } catch (error) {
    console.error('Draft save error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save draft' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if requesting a specific draft by type
    const { searchParams } = new URL(request.url);
    const insuranceType = searchParams.get('type');

    if (insuranceType) {
      // Return specific draft
      const draftKey = `${userId}-${insuranceType}`;
      const draft = await draftStore.getDraft(draftKey);

      if (draft) {
        return NextResponse.json(draft);
      } else {
        return NextResponse.json(null);
      }
    }

    // Return all drafts for user
    const allDrafts = await draftStore.getAllDrafts();
    const userDrafts: any[] = [];

    for (const draft of allDrafts) {
      if (draft && draft.userId === userId) {
        userDrafts.push(draft);
      }
    }

    return NextResponse.json({
      success: true,
      drafts: userDrafts,
    });
  } catch (error) {
    console.error('Draft fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch drafts' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const insuranceType = searchParams.get('type');

    if (!insuranceType) {
      return NextResponse.json(
        { success: false, message: 'insuranceType is required' },
        { status: 400 }
      );
    }

    const draftKey = `${userId}-${insuranceType}`;
    await draftStore.deleteDraft(draftKey);

    return NextResponse.json({
      success: true,
      message: 'Draft deleted successfully',
    });
  } catch (error) {
    console.error('Draft delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete draft' },
      { status: 500 }
    );
  }
}
