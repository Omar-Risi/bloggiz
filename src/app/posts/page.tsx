import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Home, FileText, Calendar, User, Shield, LogIn } from "lucide-react"
import { auth } from "@/lib/auth"
import { LogoutButton } from "@/components/logout-button"

// Sample posts for now - will be replaced with database posts later
const samplePosts = [
  {
    id: "1",
    title: "Welcome to Bloggiz",
    content: "This is your first blog post! Bloggiz is a modern blogging platform built with Next.js, Prisma, and NextAuth.js. Features include user authentication, role-based access, modern UI, and database integration.",
    excerpt: "Welcome to Bloggiz - a modern blogging platform with authentication and role-based access control.",
    slug: "welcome-to-bloggiz",
    published: true,
    createdAt: new Date("2024-01-15"),
    author: { name: "Admin User", email: "admin@bloggiz.com" }
  },
  {
    id: "2", 
    title: "Understanding Authentication in Modern Web Apps",
    content: "Authentication is a crucial aspect of modern web applications. In this post, we'll explore how authentication works in Bloggiz using NextAuth.js, role-based access control, and security best practices.",
    excerpt: "A deep dive into how authentication and role-based access control works in modern web applications.",
    slug: "understanding-authentication-modern-web-apps",
    published: true,
    createdAt: new Date("2024-01-12"),
    author: { name: "Admin User", email: "admin@bloggiz.com" }
  }
]

export default async function PostsPage() {
  const session = await auth()

  const truncateContent = (content: string, maxLength = 200) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  const formatDate = (date: Date) => {
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
              <Link href="/" className="text-xl font-bold text-foreground">Bloggiz</Link>
            </div>
            <div className="flex items-center space-x-4">
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
              {session ? (
                <div className="flex items-center gap-4">
                  {(session.user as any).role === "ADMIN" && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <Shield size={16} />
                        Admin
                      </Link>
                    </Button>
                  )}
                  <LogoutButton />
                </div>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn size={16} />
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
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
            {samplePosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {truncateContent(post.content)}
                    <Link href={`/posts/${post.slug}`} className="text-primary hover:underline ml-1 font-medium">
                      read more
                    </Link>
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author.name}</span>
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

