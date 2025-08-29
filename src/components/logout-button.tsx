"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut size={16} className="mr-2" />
      Logout
    </Button>
  )
}
