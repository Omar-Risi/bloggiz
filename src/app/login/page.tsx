"use client"

import { useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [tab, setTab] = useState("login")

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>{tab === "login" ? "Login" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="********" />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Button variant="outline">Back</Button>
                  <Button>Login</Button>
                </div>
              </div>
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Name</Label>
                  <Input type="text" placeholder="Your Name" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="********" />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Button variant="outline">Back</Button>
                  <Button>Sign Up</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}

