import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Home, FileText, Calendar, User, Shield, LogIn, ArrowLeft } from "lucide-react"
import { auth } from "@/lib/auth"
import { LogoutButton } from "@/components/logout-button"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const session = await auth()
  
  // Fetch the post by slug
  const post = await (prisma as any).post.findUnique({
    where: { 
      slug: params.slug,
      published: true 
    },
    include: { 
      author: { 
        select: { name: true, email: true } 
      } 
    }
  })

  if (!post) {
    notFound()
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
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
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
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link href="/posts" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Back to Posts
                </Link>
              </Button>
            </div>

            {/* Post Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-foreground mb-4">
                  {post.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(new Date(post.createdAt))}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{post.author.name}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {post.excerpt && (
                  <div className="text-lg text-muted-foreground mb-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                    {post.excerpt}
                  </div>
                )}
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </div>
                </div>
              </CardContent>
            </Card>
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
