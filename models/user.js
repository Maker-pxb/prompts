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
    // 用户名长度为8~10个字符, 可以包含字母和数字,必须字母开头
    match: [/^[a-zA-Z][a-zA-Z0-9_]{7,20}$/, 'Username is invalid'],
    lowercase: true
  },
  image: {
    type: String
  }
})

export default models.User || model('User', UserSchema)
