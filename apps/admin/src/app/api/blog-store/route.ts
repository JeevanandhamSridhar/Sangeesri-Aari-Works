import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const JSON_PATH = path.join(process.cwd(), '../client/src/data/blog-storage.json')
const ADMIN_BLOG_DIR = path.join(process.cwd(), 'public/blog')
const CLIENT_BLOG_DIR = path.join(process.cwd(), '../client/public/blog')

export interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  readTime: string
  date: string
  author: string
  image: string
  excerpt: string
  content: string
  published?: boolean
}

function readBlogFile(): BlogPost[] {
  try {
    if (!fs.existsSync(JSON_PATH)) return []
    const raw = fs.readFileSync(JSON_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeBlogFile(items: BlogPost[]) {
  try {
    const dir = path.dirname(JSON_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(JSON_PATH, JSON.stringify(items, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing blog storage JSON:', err)
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const isAdmin = searchParams.get('admin') === 'true'
  const posts = readBlogFile()
  const filtered = isAdmin ? posts : posts.filter((p) => p.published !== false)
  return NextResponse.json({ success: true, posts: filtered })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, id, post, fileData, fileName } = body
    let current = readBlogFile()

    if (action === 'upload_file' && fileData && fileName) {
      if (!fs.existsSync(ADMIN_BLOG_DIR)) fs.mkdirSync(ADMIN_BLOG_DIR, { recursive: true })
      if (!fs.existsSync(CLIENT_BLOG_DIR)) {
        try { fs.mkdirSync(CLIENT_BLOG_DIR, { recursive: true }) } catch {}
      }

      const cleanName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_')
      const base64Data = fileData.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      fs.writeFileSync(path.join(ADMIN_BLOG_DIR, cleanName), buffer)
      if (fs.existsSync(CLIENT_BLOG_DIR)) {
        try { fs.writeFileSync(path.join(CLIENT_BLOG_DIR, cleanName), buffer) } catch {}
      }

      const relativeSrc = `/blog/${cleanName}`
      return NextResponse.json({ success: true, uploadedSrc: relativeSrc, posts: current })
    }

    if (action === 'add_post' && post) {
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        title: post.title || 'Untitled Blog Post',
        slug: (post.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: post.category || 'Studio Updates',
        readTime: post.readTime || '4 min read',
        date: post.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: post.author || 'Kaviya S (Sangee Sri Studio)',
        image: post.image || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80',
        excerpt: post.excerpt || '',
        content: post.content || '',
        published: typeof post.published === 'boolean' ? post.published : true,
      }
      current.unshift(newPost)
      writeBlogFile(current)
      return NextResponse.json({ success: true, posts: current })
    }

    if (action === 'update_post' && post && post.id) {
      current = current.map((p) => (p.id === post.id ? { ...p, ...post } : p))
      writeBlogFile(current)
      return NextResponse.json({ success: true, posts: current })
    }

    if (action === 'toggle_publish' && id) {
      current = current.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
      writeBlogFile(current)
      return NextResponse.json({ success: true, posts: current })
    }

    if (action === 'delete_post' && id) {
      current = current.filter((p) => p.id !== id)
      writeBlogFile(current)
      return NextResponse.json({ success: true, posts: current })
    }

    return NextResponse.json({ success: true, posts: current })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
