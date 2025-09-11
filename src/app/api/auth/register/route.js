import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

const client = new MongoClient(process.env.MONGODB_URI)

export async function POST(request) {
  try {
    const { name, email, password, userType } = await request.json()

    // Validation
    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate DTU email format
    if (!email.endsWith(process.env.NEXT_PUBLIC_INSTITUTION_DOMAIN)) {
      return NextResponse.json(
        { error: `Please use your DTU email address (${process.env.NEXT_PUBLIC_INSTITUTION_DOMAIN})` },
        { status: 400 }
      )
    }

    // Validate user type
    if (!['student', 'counselor', 'admin'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      )
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    await client.connect()
    const db = client.db(process.env.DATABASE_NAME)

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = {
      name,
      email,
      password: hashedPassword,
      userType,
      avatar: null,
      preferences: {
        language: 'en',
        theme: 'light',
        notifications: true
      },
      createdAt: new Date(),
      isActive: true,
      // Student specific fields
      ...(userType === 'student' && {
        moodHistory: [],
        chatSessions: [],
        appointments: [],
        savedResources: [],
        streakDays: 0,
        journalEntries: [],
        emergencyContacts: []
      }),
      // Counselor specific fields
      ...(userType === 'counselor' && {
        workingHours: {
          start: '16:00', // 4 PM
          end: '24:00',   // 12 AM
          workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        },
        specializations: [],
        appointments: [],
        isAvailable: true,
        breakDuration: 60 // 1 hour break between sessions
      }),
      // Admin specific fields
      ...(userType === 'admin' && {
        permissions: ['view_analytics', 'manage_content', 'manage_counselors'],
        institution: 'DTU'
      })
    }

    const result = await db.collection('users').insertOne(user)

    return NextResponse.json(
      { 
        message: 'User created successfully',
        userId: result.insertedId
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await client.close()
  }
}
