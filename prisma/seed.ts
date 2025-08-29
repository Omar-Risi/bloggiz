import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Delete existing admin user if it exists (to recreate with correct password)
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@bloggiz.com' }
  })

  if (existingAdmin) {
    await prisma.user.delete({
      where: { email: 'admin@bloggiz.com' }
    })
    console.log('🗑️  Deleted existing admin user to recreate with correct credentials')
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@bloggiz.com',
      password: hashedPassword,
      role: 'ADMIN',
    }
  })

  console.log('✅ Admin user created:', adminUser.email)

  // Create some sample posts
  const samplePosts = [
    {
      title: 'Welcome to Bloggiz',
      content: `# Welcome to Bloggiz

This is your first blog post! Bloggiz is a modern blogging platform built with Next.js, Prisma, and NextAuth.js.

## Features

- **User Authentication**: Secure login and registration
- **Role-based Access**: Admin users can manage posts
- **Modern UI**: Built with Tailwind CSS and shadcn/ui
- **Database Integration**: PostgreSQL with Prisma ORM

## Getting Started

As an admin, you can create, edit, and manage blog posts from the dashboard. Regular users can read posts and authenticate to access additional features.

Happy blogging! 🚀`,
      excerpt: 'Welcome to Bloggiz - a modern blogging platform with authentication and role-based access control.',
      slug: 'welcome-to-bloggiz',
      published: true,
    },
    {
      title: 'Understanding Authentication in Modern Web Apps',
      content: `# Understanding Authentication in Modern Web Apps

Authentication is a crucial aspect of modern web applications. In this post, we'll explore how authentication works in Bloggiz.

## NextAuth.js Integration

Bloggiz uses NextAuth.js for handling authentication, which provides:

- Multiple authentication providers
- Secure session management
- JWT token handling
- Database integration

## Role-Based Access Control

Our system implements role-based access control with two main roles:

1. **USER**: Can authenticate and access user features
2. **ADMIN**: Can manage posts and access the admin dashboard

## Security Best Practices

- Passwords are hashed using bcrypt
- JWT tokens are signed with secure secrets
- Sessions are managed server-side
- Protected routes require authentication

Stay tuned for more technical deep-dives!`,
      excerpt: 'A deep dive into how authentication and role-based access control works in modern web applications.',
      slug: 'understanding-authentication-modern-web-apps',
      published: true,
    }
  ]

  for (const postData of samplePosts) {
    const existingPost = await prisma.post.findUnique({
      where: { slug: postData.slug }
    })

    if (!existingPost) {
      await prisma.post.create({
        data: {
          ...postData,
          authorId: adminUser.id,
        }
      })
      console.log('✅ Created post:', postData.title)
    } else {
      console.log('⚠️  Post already exists:', postData.title)
    }
  }

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
