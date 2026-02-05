import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Temporary in-memory storage (replace with database in production)
// In a real app, this would be stored in a database per user
const draftsStore = new Map<string, any>();

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
    
    // Generate a unique key for this user's draft of this insurance type
    const draftKey = `${userId}-${body.insuranceType}`;
    
    // Get existing draft if any
    const existingDraft = draftsStore.get(draftKey);
    
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
    
    // Save the draft
    draftsStore.set(draftKey, draftData);
    
    console.log('Draft saved:', draftKey, draftData);
    
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
      const draft = draftsStore.get(draftKey);
      
      if (draft) {
        return NextResponse.json(draft);
      } else {
        return NextResponse.json(null);
      }
    }
    
    // Return all drafts for user
    const userDrafts: any[] = [];
    draftsStore.forEach((draft, key) => {
      if (key.startsWith(userId)) {
        userDrafts.push(draft);
      }
    });
    
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
    
    if (insuranceType) {
      const draftKey = `${userId}-${insuranceType}`;
      draftsStore.delete(draftKey);
    }
    
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
