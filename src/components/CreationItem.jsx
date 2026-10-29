
import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2>{item.prompt}</h2>

          <p className="text-gray-500">
            {item.type} - {
              item.created_at
                ? new Date(item.created_at).toLocaleDateString()
                : 'Date unavailable'
            }
          </p>
        </div>

        <button
          type="button"
          className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full"
        >
          {item.type}
        </button>
      </div>

      {expanded && (
        <div className="mt-3">
          {item.type === 'image' ? (
            <img
              src={item.content}
              alt={item.prompt || 'Generated image'}
              className="w-full max-w-md rounded-lg"
            />
          ) : (
            <div className="max-h-80 overflow-y-auto whitespace-pre-wrap text-sm text-slate-700">
              <div>
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem
