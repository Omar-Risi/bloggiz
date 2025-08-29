"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Menu, X, Home, FileText, LogIn, Calendar, User } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Sample posts data
const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    content:
      "Next.js 14 brings exciting new features including the stable App Router, improved performance optimizations, and enhanced developer experience. In this comprehensive guide, we'll explore all the new features and how to migrate your existing applications to take advantage of these improvements.",
    author: "John Doe",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "The Future of Web Development",
    content:
      "Web development is evolving rapidly with new frameworks, tools, and methodologies emerging constantly. From server-side rendering to edge computing, developers need to stay updated with the latest trends to build modern, performant applications that meet user expectations.",
    author: "Jane Smith",
    date: "2024-01-12",
  },
  {
    id: 3,
    title: "Building Responsive Designs with Tailwind CSS",
    content:
      "Tailwind CSS has revolutionized how we approach styling in modern web applications. Its utility-first approach allows developers to build responsive, maintainable designs quickly without writing custom CSS. Learn the best practices and advanced techniques for creating beautiful interfaces.",
    author: "Mike Johnson",
    date: "2024-01-10",
  },
  {
    id: 4,
    title: "Understanding React Server Components",
    content:
      "React Server Components represent a paradigm shift in how we think about rendering in React applications. They enable us to build faster, more efficient applications by moving computation to the server while maintaining the interactive nature of client-side React.",
    author: "Sarah Wilson",
    date: "2024-01-08",
  },
  {
    id: 5,
    title: "TypeScript Best Practices for Large Applications",
    content:
      "As applications grow in complexity, TypeScript becomes essential for maintaining code quality and developer productivity. This article covers advanced TypeScript patterns, configuration strategies, and organizational techniques for large-scale projects.",
    author: "David Brown",
    date: "2024-01-05",
  },
]

export default function PostsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-foreground">Bloggiz</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Home size={16} />
                  Home
                </Link>
                <Link
                  href="/posts"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <FileText size={16} />
                  Posts
                </Link>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn size={16} />
                    Login
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden border-t bg-background overflow-hidden"
              >
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-2 pt-2 pb-3 space-y-1"
                >
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home size={16} />
                    Home
                  </Link>
                  <Link
                    href="/posts"
                    className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FileText size={16} />
                    Posts
                  </Link>
                  <div className="px-3 py-2">
                    <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                      <Link
                        href="/login"
                        className="flex items-center gap-2 justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LogIn size={16} />
                        Login
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest Posts</h1>
            <p className="text-muted-foreground text-lg">Discover our latest thoughts and insights</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {truncateContent(post.content)}
                    <Link href={`/posts/${post.id}`} className="text-primary hover:underline ml-1 font-medium">
                      read more
                    </Link>
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Bloggiz</h3>
            <p className="text-sm text-muted-foreground">© Bloggiz</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

