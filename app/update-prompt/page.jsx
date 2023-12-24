'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  console.log('🚀 ~ file: page.jsx:11 ~ EditPrompt ~ promptId:', promptId)

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  const updatePost = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (!promptId) return alert('No prompt id')
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      setSubmitting(false)
      if (res.ok) {
        setPost({ prompt: '', tag: '' })
        router.back()
      }
      const json = await res.json()
      console.log('🚀 ~ file: page.jsx:75 ~ createPost ~ json', json)
    } catch (error) {
      console.log('🚀 ~ file: page.jsx:77 ~ createPost ~ error', error)
    } finally {
      setSubmitting(false)
    }
  }

  const fetchPost = async (promptId) => {
    try {
      const res = await fetch(`/api/prompt/${promptId}`)
      const json = await res.json()
      setPost(json)
    } catch (error) {
      console.log('🚀 ~ file: page.jsx:77 ~ createPost ~ error', error)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (!promptId) return
    fetchPost(promptId)
  }, [promptId])

  return (
    <>
      <p>post{JSON.stringify(post)}</p>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePost}
      />
    </>
  )
}

export default EditPrompt
