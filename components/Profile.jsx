import React from 'react'
import PromptCard from './PromptCard'
import { PromptCardList } from './Feed'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span>
        Profile
      </h1>
      <p className="desc text-left max-w-md">{desc}</p>
      <section className="mt-10 prompt_layout ">
        {data.map((prompt) => (
          <PromptCard
            key={prompt.id}
            post={prompt}
            handleEdit={() => handleEdit?.(prompt)}
            handleDelete={() => handleDelete?.(prompt)}
          />
        ))}
      </section>
    </section>
  )
}

export default Profile
