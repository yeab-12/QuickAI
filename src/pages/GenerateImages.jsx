
import React, { useState } from 'react'
import { Image, Sparkles } from 'lucide-react'

const GenerateImages = () => {
  const imageStyle = [
    'Realistic',
    'Ghibli style',
    'Anime style',
    'Cartoon style',
    'Fantasy style',
    '3D style',
    'Portrait style'
  ]

  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [publish, setPublish] = useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    setLoading(true)
    setGeneratedImage('')

    // Demo only: this creates a preview using a placeholder image.
    // Connect a backend AI image-generation API for real results.
    setTimeout(() => {
      setGeneratedImage(
        `https://placehold.co/600x400?text=${encodeURIComponent(
          selectedStyle + ' image preview'
        )}`
      )
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="h-full overflow-y-auto p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 text-green-600" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="text-sm font-medium mt-6">Describe Your Image</p>

        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          placeholder="Describe what you want to see in the image..."
          className="w-full px-3 py-2 mt-2 outline-none text-sm border border-gray-300 rounded-md"
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>

        <div className="flex flex-wrap gap-3 mt-3">
          {imageStyle.map((item) => (
            <button
              type="button"
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? 'bg-purple-50 text-green-700 border-purple-300'
                  : 'text-gray-500 border-gray-300'
              }`}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input type="checkbox" onChange={(e)=>setPublish(e.target.checked)}
            checked={publish} className='sr-only peer'/>

            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>

            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
          </label>
          <p className='text-sm'>Make this image Public</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-50"
        >
          <Image className="w-5 h-5" />
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-green-600" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center mt-5">
          {loading ? (
            <p className="text-sm text-gray-400">Preparing preview...</p>
          ) : generatedImage ? (
            <img
              src={generatedImage}
              alt={`${selectedStyle} preview for ${input}`}
              className="w-full rounded-lg object-contain"
            />
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Image className="w-9 h-9" />
              <p className="text-center">
                Describe an image and click Generate Image to see a preview.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GenerateImages
