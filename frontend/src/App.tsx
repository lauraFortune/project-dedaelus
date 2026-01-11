
import { useState, useEffect } from "react";
import storyService from './services/stories';
import type { Story } from './types/story';
import LoginForm from "./components/LoginForm";

type StoryCardProps = {
  title: string
  author: string
  published: boolean 
}

const StoryCard = ({ title, author, published }: StoryCardProps ) => {
  
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <h3>{title}</h3>
      <p>By {author}</p>
      <p>Status: {published ? 'published': 'Draft'}</p>
      <p>Likes: {likes}</p>
      <button onClick={() => setLikes(likes + 1)}>Like</button>
    </div>
  )
}


function App() {

  const appName = 'Project Dedalus'

  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const [user, setUser] = useState<{token: string, email: string, userId: string} | null>(null)

  // Handler function 
  const handleSetUser = (userData: {token: string, email: string, userId: string } | null) => {
    setUser(userData)
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  }
  // useEffect hooks
  useEffect(() => {
    storyService
      .getAll()
      .then(initialStories => {
        setStories(initialStories)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message || 'Failed to fetch stories')
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if (loading) return <p>Loading stories...</p>
  if (error) return <p>Error: {error} </p>

  return (
    <>
      <div>
        <h1>{appName}</h1>
        {user ? (
          <div>
            <p>Logged in as: {user.email}</p>
            <button onClick={() => handleSetUser(null)}>Logout</button>
          </div>
        ) : (
          <LoginForm setUser={handleSetUser}/>
        )}
        
        {stories.map(story =>
          <StoryCard 
            key={story._id}
            title={story.title}
            author={story.author}
            published={story.publish}
          />
        )}
      </div>
    </>
  )
}

export default App

