import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists'],
    lowercase: true
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'Username already exists'],
    match: [/^[\u4e00-\u9fa5a-zA-Z0-9]+$/, 'Username is invalid'],
    lowercase: true
  },
  image: {
    type: String
  }
})

export default models.User || model('User', UserSchema)
