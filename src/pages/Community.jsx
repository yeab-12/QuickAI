
import React, { useMemo, useState } from 'react'
import {
  Users,
  Search,
  Heart,
  MessageCircle,
  Sparkles,
  Image as ImageIcon,
  FileText,
  Filter,
  Plus,
  X,
  Send
} from 'lucide-react'

const initialPosts = [
  {
    id: 1,
    author: 'Alex Morgan',
    initials: 'AM',
    time: '2 hours ago',
    category: 'AI Art',
    title: 'Beautiful AI-generated landscape',
    description:
      'Experimenting with AI image generation to create a peaceful mountain landscape at sunset.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900',
    likes: 24,
    comments: 5,
    liked: false
  },
  {
    id: 2,
    author: 'Sarah Johnson',
    initials: 'SJ',
    time: '5 hours ago',
    category: 'Writing',
    title: 'Tips for better blog titles',
    description:
      'Try using clear language, specific benefits, and curiosity to make your blog titles more engaging.',
    image: '',
    likes: 18,
    comments: 3,
    liked: false
  },
  {
    id: 3,
    author: 'Daniel Lee',
    initials: 'DL',
    time: '1 day ago',
    category: 'AI Tools',
    title: 'My AI productivity workflow',
    description:
      'I use AI tools to brainstorm ideas, organize research, and create first drafts before editing everything carefully.',
    image: '',
    likes: 31,
    comments: 8,
    liked: false
  }
]

const categories = ['All', 'AI Art', 'Writing', 'AI Tools']

const Community = () => {
  const [posts, setPosts] = useState(initialPosts)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newCategory, setNewCategory] = useState('AI Tools')
  const [notice, setNotice] = useState('')

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        post.category === selectedCategory

      const searchText =
        `${post.title} ${post.description} ${post.author}`.toLowerCase()

      return matchesCategory && searchText.includes(search.toLowerCase())
    })
  }, [posts, search, selectedCategory])

  const toggleLike = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1)
            }
          : post
      )
    )
  }

  const createPost = (e) => {
    e.preventDefault()

    if (!newTitle.trim() || !newDescription.trim()) return

    const newPost = {
      id: Date.now(),
      author: 'You',
      initials: 'YO',
      time: 'Just now',
      category: newCategory,
      title: newTitle.trim(),
      description: newDescription.trim(),
      image: '',
      likes: 0,
      comments: 0,
      liked: false
    }

    setPosts((currentPosts) => [newPost, ...currentPosts])
    setNewTitle('')
    setNewDescription('')
    setNewCategory('AI Tools')
    setShowCreateForm(false)
    setSelectedCategory('All')
    setSearch('')
    setNotice('Your demo post was added to the feed.')

    window.setTimeout(() => setNotice(''), 3000)
  }

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 sm:p-6 text-slate-700">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-semibold">Community</h1>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Discover ideas, share creations, and connect with AI creators.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-700"
          >
            {showCreateForm ? (
              <X className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {showCreateForm ? 'Cancel' : 'Create Post'}
          </button>
        </div>

        {notice && (
          <p role="status" className="mt-4 text-sm text-green-700">
            {notice}
          </p>
        )}

        {/* Create post form */}
        {showCreateForm && (
          <form
            onSubmit={createPost}
            className="mt-6 rounded-xl border border-gray-200 bg-white p-5"
          >
            <h2 className="font-semibold text-lg">Share with the community</h2>

            <label className="block text-sm font-medium mt-4">
              Post title
            </label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Give your post a title"
              maxLength={100}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-purple-500"
            />

            <label className="block text-sm font-medium mt-4">
              Description
            </label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Share your idea or creation..."
              rows={4}
              maxLength={2000}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-purple-500"
            />

            <label className="block text-sm font-medium mt-4">
              Category
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-purple-500"
            >
              {categories
                .filter((category) => category !== 'All')
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>

            <button
              type="submit"
              className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
            >
              <Send className="w-4 h-4" />
              Publish Post
            </button>
          </form>
        )}

        {/* Search */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search community posts..."
              className="w-full py-3 text-sm outline-none"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 mr-1" />
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                selectedCategory === category
                  ? 'border-purple-600 bg-purple-600 text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-purple-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-semibold text-purple-700">
                    {post.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{post.author}</p>
                    <p className="text-xs text-gray-400">{post.time}</p>
                  </div>

                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700">
                    {post.category}
                  </span>
                </div>

                <h2 className="mt-4 font-semibold text-lg">{post.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600 whitespace-pre-wrap">
                  {post.description}
                </p>
              </div>

              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full max-h-72 object-cover"
                />
              )}

              <div className="flex items-center gap-5 border-t border-gray-100 px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleLike(post.id)}
                  aria-pressed={post.liked}
                  className={`flex items-center gap-2 text-sm ${
                    post.liked
                      ? 'text-pink-600'
                      : 'text-gray-500 hover:text-pink-600'
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={post.liked ? 'currentColor' : 'none'}
                  />
                  {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
                </button>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MessageCircle className="w-5 h-5" />
                  {post.comments} Comments
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white py-14 text-center">
            <FileText className="mx-auto h-10 w-10 text-gray-300" />
            <h2 className="mt-3 font-semibold">No posts found</h2>
            <p className="mt-2 text-sm text-gray-500">
              Try another search or choose a different category.
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 pb-4 text-xs text-gray-400">
          <Sparkles className="w-4 h-4" />
          QuickAI Community
        </div>
      </div>
    </div>
  )
}

export default Community
