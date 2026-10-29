
import React, { useState } from 'react'
import { Edit, Sparkles, Hash } from 'lucide-react'

const BlogTitles = () => {
  const blogCategories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food'
  ]

  const [selectedCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')
  const [titles, setTitles] = useState([])

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    const keyword = input.trim()

    setTitles([
      `The Ultimate Guide to ${keyword}`,
      `10 Things You Should Know About ${keyword}`,
      `How ${keyword} Is Changing ${selectedCategory}`,
      `The Future of ${keyword}: Trends and Insights`,
      `A Beginner's Guide to ${keyword}`
    ])
  }

  return (
    <div className="h-full overflow-y-auto p-6 flex items-start flex-wrap gap-4 text-slate-700">

      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        <p className="text-sm font-medium mt-6">Keyword</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Enter a topic or keyword..."
          className="w-full px-3 py-2 mt-2 outline-none text-sm border border-gray-300 rounded-md"
          required
        />

        <p className="mt-4 text-sm font-medium">Blog Category</p>

        <div className="flex flex-wrap gap-3 mt-3">
          {blogCategories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedCategory === item
                  ? 'bg-purple-50 text-purple-700 border-purple-300'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          <Hash className="w-5" />
          Generate titles
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">

        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">Generated Titles</h1>
        </div>

        <div className="flex-1 mt-5 space-y-3 overflow-y-auto">
          {titles.length > 0 ? (
            titles.map((title, index) => (
              <div
                key={index}
                className="p-3 border border-gray-200 rounded-lg text-sm hover:bg-purple-50"
              >
                {title}
              </div>
            ))
          ) : (
            <div className="h-full flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Edit className="w-9 h-9" />
                <p>Enter a topic and click Generate titles to get started.</p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default BlogTitles
