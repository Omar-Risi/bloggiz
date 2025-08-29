import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoutButton } from "@/components/logout-button"
import { CreatePostForm } from "@/components/create-post-form"
import { PostsTable } from "@/components/posts-table"
import { PostManagementProvider } from "@/components/post-management-context"
import { User, Calendar, Shield } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  // Check if user is admin
  if ((session.user as any).role !== "ADMIN") {
    redirect("/")
  }

  // Get published post count
  const postCount = await (prisma as any).post.count({
    where: { published: true }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-foreground">
                Bloggiz
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {session.user?.name || session.user?.email}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your Bloggiz dashboard! Authentication is working perfectly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* User Info Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Profile</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{session.user?.name || "Admin"}</div>
                <p className="text-xs text-muted-foreground">
                  {session.user?.email}
                </p>
              </CardContent>
            </Card>

            {/* Session Info Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Session Status</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Active</div>
                <p className="text-xs text-muted-foreground">
                  Admin privileges enabled
                </p>
              </CardContent>
            </Card>

            {/* Posts Stats Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{postCount}</div>
                <p className="text-xs text-muted-foreground">
                  Published articles
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/posts">View All Posts</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Post Management Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Post Management</h2>
            <PostManagementProvider>
              <div className="space-y-6">
                <CreatePostForm />
                <PostsTable />
              </div>
            </PostManagementProvider>
          </div>
        </div>
      </main>
    </div>
  )
}
