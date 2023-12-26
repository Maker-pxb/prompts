import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (req, res) => {
  try {
    await connectToDB()
    const prompts = await Prompt.find({}).populate('creator')
    console.log('🚀 ~ file: route.js:8 ~ GET ~ prompts:', prompts)
    res.setHeader('Cache-Control', 'no-store, max-age=0')
    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed To fetch all prompt', {
      status: 500
    })
  }
}
