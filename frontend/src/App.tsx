
import { useState } from "react";

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

  const stories = [
    {
      id: 1,
      title: 'The Great Escape',
      author: 'Johnny',
      published: true,
    },
    {
      id: 2,
      title: 'Journey to Centre of the Earth',
      author: 'Johnny',
      published: false,
    },
    {
      id: 3,
      title: 'Misadventures',
      author: 'Marty',
      published: true,
    },
    
  ]

  return (
    <>
      <div>
        <h1>{appName}</h1>
        {stories.map(story =>
          <StoryCard 
            key={story.id}
            title={story.title}
            author={story.author}
            published={story.published}
          />
        )}
      </div>
    </>
  )
}

export default App
