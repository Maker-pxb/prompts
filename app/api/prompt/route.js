import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async () => {
  try {
    await connectToDB()
    const prompts = await Prompt.find({}).populate('creator')
    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    console.log('🚀 ~ file: route.js:14 ~ GET ~ error:', error)
    return new Response('Failed To fetch all prompt', {
      status: 500
    })
  }
}
