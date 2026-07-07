import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '../../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid email or password')
        }

        // Normalize email
        const normalizedEmail = credentials.email.trim().toLowerCase()

        // Validate DTU email format
        if (!normalizedEmail.endsWith(process.env.NEXT_PUBLIC_INSTITUTION_DOMAIN)) {
          throw new Error(`Please use your DTU email address (${process.env.NEXT_PUBLIC_INSTITUTION_DOMAIN})`)
        }

        try {
          const db = (await clientPromise).db(process.env.DATABASE_NAME)
          const user = await db.collection('users').findOne({
            email: normalizedEmail
          })

          if (!user) {
            // Generic message to prevent user enumeration
            throw new Error('Invalid email or password')
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) {
            throw new Error('Invalid email or password')
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            userType: user.userType,
            avatar: user.avatar || null,
            preferences: user.preferences || {}
          }
        } catch (error) {
          console.error('Auth error:', error)
          // If the error message is already our custom validation error, rethrow it
          if (error.message === `Please use your DTU email address (${process.env.NEXT_PUBLIC_INSTITUTION_DOMAIN})` || 
              error.message === 'Invalid email or password') {
            throw error
          }
          throw new Error('An error occurred during authentication')
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType
        token.avatar = user.avatar
        token.preferences = user.preferences
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.userType = token.userType
        session.user.avatar = token.avatar
        session.user.preferences = token.preferences
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect based on user type after login
      if (typeof url === 'string' && url.startsWith('/auth/signin')) {
        return baseUrl + '/dashboard'
      }
      return (typeof url === 'string' && url.startsWith(baseUrl)) ? url : baseUrl
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
