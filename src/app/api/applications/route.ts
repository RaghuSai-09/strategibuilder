import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Temporary in-memory storage (replace with database in production)
const applicationsStore = new Map<string, any>();

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

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get all applications for this user
    const userApplications: any[] = [];
    applicationsStore.forEach((app, key) => {
      if (app.userId === userId) {
        userApplications.push(app);
      }
    });
    
    // Sort by updated date, newest first
    userApplications.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    
    return NextResponse.json({
      success: true,
      applications: userApplications,
    });
  } catch (error) {
    console.error('Applications fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

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
    
    // Generate unique ID
    const appId = body.id || `app-${Date.now()}`;
    
    const newApplication = {
      id: appId,
      userId,
      insuranceType: body.insuranceType,
      status: body.status || 'submitted',
      data: body.data || {},
      submittedAt: body.submittedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Store the application
    applicationsStore.set(appId, newApplication);
    
    console.log('Application created:', appId, newApplication);
    
    return NextResponse.json({
      success: true,
      id: appId,
      application: newApplication,
    });
  } catch (error) {
    console.error('Application creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create application' },
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
    const appId = searchParams.get('id');
    
    if (appId) {
      const app = applicationsStore.get(appId);
      if (app && app.userId === userId) {
        applicationsStore.delete(appId);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    console.error('Application delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
