import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Implement actual authentication logic
    // - Query database for user with email
    // - Verify password hash
    // - Generate JWT token or session
    
    // Mock implementation for now
    if (email === 'demo@example.com' && password === 'password123') {
      const user = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        createdAt: new Date().toISOString(),
      };

      const token = 'mock-jwt-token-' + Date.now();

      const response = NextResponse.json(
        {
          success: true,
          token,
          user,
          message: 'Login successful',
        },
        { status: 200 }
      );

      // Set cookie
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
