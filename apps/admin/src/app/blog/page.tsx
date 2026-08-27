'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Newspaper,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Search,
  Sparkles,
  Save,
  X,
  Upload,
  Calendar,
  User,
  Clock,
} from 'lucide-react'
import { toast } from 'sonner'

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

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Modal State for Adding / Editing
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  // Form State
  const [postTitle, setPostTitle] = useState('')
  const [postCategory, setPostCategory] = useState('Bridal Trends')
  const [postReadTime, setPostReadTime] = useState('4 min read')
  const [postAuthor, setPostAuthor] = useState('Kaviya S (Lead Designer)')
  const [postImage, setPostImage] = useState('https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80')
  const [postExcerpt, setPostExcerpt] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postPublished, setPostPublished] = useState(true)
  const [uploadingImage, setUploadingImage] = useState(false)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/blog-store?admin=true')
      const data = await res.json()
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts)
      }
    } catch {
      toast.error('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const syncBlogApi = async (payload: any) => {
    try {
      const res = await fetch('/api/blog-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts)
      }
    } catch {
      toast.error('Failed to sync blog update')
    }
  }

  const openNewPostModal = () => {
    setEditingPost(null)
    setPostTitle('')
    setPostCategory('Bridal Trends')
    setPostReadTime('4 min read')
    setPostAuthor('Kaviya S (Lead Designer)')
    setPostImage('https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80')
    setPostExcerpt('')
    setPostContent('')
    setPostPublished(true)
    setModalOpen(true)
  }

  const openEditPostModal = (p: BlogPost) => {
    setEditingPost(p)
    setPostTitle(p.title)
    setPostCategory(p.category)
    setPostReadTime(p.readTime)
    setPostAuthor(p.author)
    setPostImage(p.image)
    setPostExcerpt(p.excerpt)
    setPostContent(p.content)
    setPostPublished(p.published !== false)
    setModalOpen(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    setUploadingImage(true)

    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string
      if (base64) {
        fetch('/api/blog-store', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'upload_file',
            fileData: base64,
            fileName: `blog_${Date.now()}_${file.name}`,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.uploadedSrc) {
              setPostImage(data.uploadedSrc)
              toast.success('Cover image uploaded successfully!')
            }
          })
          .finally(() => setUploadingImage(false))
      }
    }
    reader.readAsDataURL(file)
  }

  const savePost = () => {
    if (!postTitle.trim() || !postContent.trim()) {
      toast.error('Please enter a post title and content')
      return
    }

    const payloadPost = {
      id: editingPost ? editingPost.id : undefined,
      title: postTitle,
      category: postCategory,
      readTime: postReadTime,
      author: postAuthor,
      image: postImage,
      excerpt: postExcerpt || postContent.slice(0, 140) + '...',
      content: postContent,
      published: postPublished,
    }

    if (editingPost) {
      syncBlogApi({ action: 'update_post', post: payloadPost })
      toast.success('Blog post updated!')
    } else {
      syncBlogApi({ action: 'add_post', post: payloadPost })
      toast.success('New daily blog post published!')
    }

    setModalOpen(false)
  }

  const togglePublish = (id: string, title: string) => {
    syncBlogApi({ action: 'toggle_publish', id })
    toast.success(`Toggled publication status for "${title.slice(0, 25)}..."`)
  }

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete post "${title}"?`)) {
      syncBlogApi({ action: 'delete_post', id })
      toast.success('Post removed from Blogspot!')
    }
  }

  const categories = ['All', 'Bridal Trends', 'Federation Updates', 'Embroidery Guides', 'Care & Maintenance', 'Studio Updates']

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-cream flex items-center gap-2">
            <Newspaper className="text-gold-400" size={28} />
            Blogspot &amp; Daily Updates Manager
          </h1>
          <p className="font-inter text-xs text-cream/50 mt-1">
            Publish daily articles, bridal embroidery tips, and Federation announcements live to your customers.
          </p>
        </div>

        <button
          onClick={openNewPostModal}
          className="btn-admin-gold py-2.5 px-5 flex items-center gap-2 text-xs"
        >
          <Plus size={16} /> Write Daily Update
        </button>
      </div>

      {/* SEARCH & CATEGORY FILTER */}
      <div className="glass-admin p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts by title or keyword..."
            className="input-admin pl-9 text-xs w-full"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-inter text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-darkbase shadow-md'
                  : 'glass border border-white/10 text-cream/60 hover:text-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* BLOG POSTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((p) => {
          const isDraft = p.published === false
          return (
            <div
              key={p.id}
              className={`glass-admin rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
                isDraft ? 'border-red-500/30 opacity-75 bg-black/40' : 'border-white/10 hover:border-gold-500/40'
              }`}
            >
              <div>
                <div className="relative aspect-[16/9] w-full bg-black/60">
                  <Image src={p.image} alt={p.title} fill unoptimized className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbase via-transparent to-transparent opacity-60" />

                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-gold-400 border border-gold-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full font-inter">
                    {p.category}
                  </span>

                  <button
                    onClick={() => togglePublish(p.id, p.title)}
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-md font-inter text-[10px] font-bold flex items-center gap-1 shadow-md transition-all ${
                      isDraft
                        ? 'bg-red-500 text-white border border-red-400'
                        : 'bg-black/80 text-green-400 border border-green-500/40'
                    }`}
                  >
                    {isDraft ? <EyeOff size={11} /> : <Eye size={11} />}
                    {isDraft ? 'DRAFT' : 'PUBLISHED'}
                  </button>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-cream/50 font-inter">
                    <span className="flex items-center gap-1"><Calendar size={12} className="text-gold-400" /> {p.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} className="text-gold-400" /> {p.readTime}</span>
                  </div>

                  <h3 className="font-playfair text-lg font-bold text-cream line-clamp-2 mt-1">
                    {p.title}
                  </h3>

                  <p className="font-inter text-xs text-cream/70 line-clamp-3 leading-relaxed">
                    {p.excerpt}
                  </p>
                </div>
              </div>

              {/* CARD ACTIONS */}
              <div className="p-4 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => openEditPostModal(p)}
                  className="px-3 py-1.5 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold flex items-center gap-1.5"
                >
                  <Edit3 size={13} /> Edit Post
                </button>

                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  className="p-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                  title="Delete post"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* WRITE / EDIT BLOG POST MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-admin rounded-3xl border border-gold-500/40 p-6 max-w-2xl w-full space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-playfair text-xl font-bold text-cream flex items-center gap-2">
                  <Newspaper className="text-gold-400" size={20} />
                  {editingPost ? 'Edit Blogspot Article' : 'Write New Daily Update'}
                </h2>
                <p className="font-inter text-xs text-cream/50 mt-0.5">
                  Publish Aari work trends, federation updates, or studio news.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-cream/60 hover:text-cream"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-inter text-xs text-gold-400 font-bold block mb-1">Article Title *</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. 5 Latest Bridal Blouse Sleeve Trends for 2026"
                  className="input-admin text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-inter text-xs text-cream/70 block mb-1">Category *</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="input-admin text-xs bg-darkbase"
                  >
                    <option value="Bridal Trends">Bridal Trends</option>
                    <option value="Federation Updates">Federation Updates</option>
                    <option value="Embroidery Guides">Embroidery Guides</option>
                    <option value="Care & Maintenance">Care & Maintenance</option>
                    <option value="Studio Updates">Studio Updates</option>
                  </select>
                </div>

                <div>
                  <label className="font-inter text-xs text-cream/70 block mb-1">Author Name</label>
                  <input
                    type="text"
                    value={postAuthor}
                    onChange={(e) => setPostAuthor(e.target.value)}
                    className="input-admin text-xs"
                  />
                </div>
              </div>

              {/* COVER IMAGE UPLOADER */}
              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Cover Image</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden border border-white/20 bg-black shrink-0">
                    <Image src={postImage} alt="Cover preview" fill unoptimized className="object-cover" />
                  </div>
                  <input
                    type="text"
                    value={postImage}
                    onChange={(e) => setPostImage(e.target.value)}
                    placeholder="https://... or /blog/photo.jpg"
                    className="input-admin text-xs flex-1"
                  />
                  <label className="px-3 py-2 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1.5">
                    <Upload size={14} />
                    {uploadingImage ? 'Uploading...' : 'Upload Cover'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Short Excerpt (Summary)</label>
                <textarea
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                  rows={2}
                  placeholder="A brief 1-2 sentence preview for the blog card..."
                  className="input-admin text-xs w-full"
                />
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Full Article Content *</label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={6}
                  placeholder="Write your daily update or blog post here..."
                  className="input-admin text-xs w-full leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPostPublished(!postPublished)}
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    postPublished
                      ? 'bg-green-500/20 border-green-500/40 text-green-400'
                      : 'bg-red-500/20 border-red-500/40 text-red-400'
                  }`}
                >
                  {postPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                  {postPublished ? 'Publish Live Instantly' : 'Save as Hidden Draft'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold font-inter glass border border-white/10 text-cream/60 hover:text-cream"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={savePost}
                className="btn-admin-gold text-xs py-2 px-6 flex items-center gap-2"
              >
                <Save size={14} /> {editingPost ? 'Save Changes' : 'Publish Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
