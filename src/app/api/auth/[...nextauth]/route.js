import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const client = new MongoClient(process.env.DATABASE_URL)
const clientPromise = client.connect()

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
          throw new Error('Missing credentials')
        }

        // Validate DTU email format
        if (!credentials.email.endsWith('@dtu.ac.in')) {
          throw new Error('Please use your DTU email address (@dtu.ac.in)')
        }

        const db = (await clientPromise).db(process.env.DATABASE_NAME)
        const user = await db.collection('users').findOne({
          email: credentials.email
        })

        if (!user) {
          throw new Error('No user found with this email')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          throw new Error('Invalid password')
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          userType: user.userType,
          avatar: user.avatar || null,
          preferences: user.preferences || {}
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
      if (url.startsWith('/auth/signin')) {
        return baseUrl + '/dashboard'
      }
      return url.startsWith(baseUrl) ? url : baseUrl
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
