
import React, { useEffect, useState } from 'react'
import {
  ImagePlus,
  Sparkles,
  Upload,
  X,
  Eraser,
  Download
} from 'lucide-react'

const RemoveBackground = () => {
  const [image, setImage] = useState('')
  const [resultImage, setResultImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Clean up temporary image URLs when the image changes or the page unmounts.
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image)
      if (resultImage) URL.revokeObjectURL(resultImage)
    }
  }, [image, resultImage])

  const onImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      e.target.value = ''
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10 MB.')
      e.target.value = ''
      return
    }

    setError('')
    setImage(URL.createObjectURL(file))
    setResultImage('')
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (!image) {
      setError('Please upload an image first.')
      return
    }

    setError('')
    setLoading(true)
    setResultImage('')

    // Demo only: connect your backend background-removal API here.
    setTimeout(() => {
      setLoading(false)
      setError(
        'Background removal is not connected yet. Connect an AI background-removal API to process this image.'
      )
    }, 1000)
  }

  const clearImage = () => {
    setImage('')
    setResultImage('')
    setError('')
  }

  return (
    <div className="h-full overflow-y-auto p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h1 className="text-xl font-semibold">AI Background Remover</h1>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Remove the background from your image in a few steps.
        </p>

        <p className="text-sm font-medium mt-6">Upload Image</p>

        {!image ? (
          <label className="mt-2 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-purple-50 transition">
            <Upload className="w-8 h-8 text-purple-500 mb-3" />
            <p className="text-sm font-medium">
              Click to upload an image
            </p>
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG or WEBP (max. 10 MB)
            </p>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={onImageChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative mt-3">
            <img
              src={image}
              alt="Original uploaded image"
              className="w-full max-h-72 object-contain rounded-lg border border-gray-200"
            />

            <button
              type="button"
              onClick={clearImage}
              aria-label="Remove uploaded image"
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-600 mt-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !image}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-50"
        >
          <Eraser className="w-5 h-5" />
          {loading ? 'Processing...' : 'Remove Background'}
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[650px]">
        <div className="flex items-center gap-3">
          <ImagePlus className="w-5 h-5 text-purple-600" />
          <h1 className="text-xl font-semibold">Result</h1>
        </div>

        <div
          className="flex-1 flex justify-center items-center mt-5 rounded-lg"
          style={{
            backgroundImage:
              'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0'
          }}
        >
          {loading ? (
            <p className="text-sm text-gray-600 bg-white/80 rounded p-3">
              Processing your image...
            </p>
          ) : resultImage ? (
            <img
              src={resultImage}
              alt="Image with background removed"
              className="w-full max-h-[450px] object-contain"
            />
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-500 text-center p-5">
              <ImagePlus className="w-10 h-10" />
              <p>
                Your transparent-background image will appear here.
              </p>
            </div>
          )}
        </div>

        {resultImage && (
          <a
            href={resultImage}
            download="background-removed.png"
            className="mt-4 w-full flex justify-center items-center gap-2 bg-green-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-green-700"
          >
            <Download className="w-5 h-5" />
            Download Image
          </a>
        )}
      </div>
    </div>
  )
}

export default RemoveBackground
