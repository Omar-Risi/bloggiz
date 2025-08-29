"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, X, Home, FileText, LogIn, User } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"
import { LogoutButton } from "@/components/logout-button"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

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
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
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
                    {(session.user as any)?.role === "ADMIN" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <User size={16} />
                          Dashboard
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
                    className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home size={16} />
                    Home
                  </Link>
                  <Link
                    href="/posts"
                    className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FileText size={16} />
                    Posts
                  </Link>
                  <div className="px-3 py-2">
                    {session ? (
                      <div className="space-y-2">
                        {(session.user as any)?.role === "ADMIN" && (
                          <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-2 justify-center"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <User size={16} />
                              Dashboard
                            </Link>
                          </Button>
                        )}
                        <div onClick={() => setIsMobileMenuOpen(false)}>
                          <LogoutButton />
                        </div>
                      </div>
                    ) : (
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
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">Bloggiz</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-md mx-auto">
            Blogs all day. Everyday!
          </p>
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

