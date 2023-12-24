'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
  const { data: session } = useSession()
  const [prompts, setPrompts] = useState([])
  const router = useRouter()
  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`)
  }
  const handleDelete = async (post) => {
    console.log('🚀 ~ file: page.jsx:16 ~ handleDelete ~ post:', post)
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
    if (!hasConfirmed) return
    try {
      const res = await fetch(`/api/prompt/${post._id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        const filteredPrompts = prompts.filter(
          (prompt) => prompt._id !== post._id
        )
        setPrompts(filteredPrompts)
      }
    } catch (error) {
      console.log('🚀 ~ file: page.jsx:22 ~ handleDelete ~ error:', error)
      alert('Failed to delete the prompt')
    }
  }

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/user/${session?.user.id}/posts`)
      const json = await res.json()
      setPrompts(json)
    } catch (error) {}
  }

  useEffect(() => {
    if (!session?.user?.id) return
    fetchPosts()
  }, [session?.user?.id])

  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your personal profile page."
        data={prompts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  )
}

export default MyProfile
