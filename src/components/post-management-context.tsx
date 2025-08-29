"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  published: boolean
  createdAt: string
  author: {
    name: string
    email: string
  }
}

interface PostManagementContextType {
  posts: Post[]
  setPosts: (posts: Post[]) => void
  addPost: (post: Post) => void
  removePost: (postId: string) => void
  refreshPosts: () => Promise<void>
}

const PostManagementContext = createContext<PostManagementContextType | undefined>(undefined)

export function PostManagementProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([])

  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev])
  }

  const removePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId))
  }

  const refreshPosts = async () => {
    try {
      const response = await fetch('/api/posts/admin')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  return (
    <PostManagementContext.Provider value={{
      posts,
      setPosts,
      addPost,
      removePost,
      refreshPosts
    }}>
      {children}
    </PostManagementContext.Provider>
  )
}

export function usePostManagement() {
  const context = useContext(PostManagementContext)
  if (context === undefined) {
    throw new Error('usePostManagement must be used within a PostManagementProvider')
  }
  return context
}
