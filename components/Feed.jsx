'use client'
import React, { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

export const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <section className="mt-16 prompt_layout ">
      {data.map((prompt) => (
        <PromptCard
          key={prompt.id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </section>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [prompts, setPrompts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/prompt')
      const json = await res.json()
      setPrompts(json)
      console.log('🚀 ~ file: Feed.jsx:116 ~ ferchPosts ~ json', json)
    } catch (error) {
      console.log('🚀 ~ file: Feed.jsx:118 ~ ferchPosts ~ error', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={handleSearchChange} />
    </section>
  )
}

export default Feed
