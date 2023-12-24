import mongoose, { Schema } from 'mongoose'

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    required: [true, 'Please provide a creator'],
    ref: 'User'
  },
  prompt: {
    type: String,
    required: [true, 'Please provide a prompt']
  },
  tag: {
    type: String,
    required: [true, 'Please provide a tag']
  }
})

export default mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema)
