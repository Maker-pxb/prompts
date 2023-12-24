import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { connectToDB } from '@utils/database'
import User from '@models/user'
// console.log(
//   '🚀 ~ file: route.js:17 ~ process.env.GITHUB_CLIENT_SECRET:',
//   process.env.GOOGLE_CLIENT_SECRET
// )
// console.log(
//   '🚀 ~ file: route.js:17 ~ process.env.GITHUB_ID:',
//   process.env.GOOGLE_ID
// )
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  secret: process.env.SECRET,
  database: process.env.MONGODB_URI,
  session: {
    jwt: true
  },

  callbacks: {
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl
    //   if (pathname === '/middleware-example') return !!auth
    //   return true
    // },
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()
      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDB()
        const { email, name, avatar_url: image } = profile
        console.log('🚀 ~ file: route.js:46 ~ signIn ~ profile:', profile)
        // check if a user already exists
        const userExists = await User.findOne({ email })
        console.log('🚀 ~ file: route.js:48 ~ signIn ~ userExists:', userExists)
        // if not, create a new user
        if (!userExists) {
          const user = await User.create({
            email,
            username: name.replace(' ', ''),
            image
          })
          if (user) {
            return user
          }
        } else {
          await User.updateOne(
            { email },
            {
              $set: {
                username: name.replace(' ', ''),
                image
              }
            }
          )
        }
        return true
      } catch (error) {
        console.log('🚀 ~ file: route.js:64 ~ signIn ~ error:', error)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }
