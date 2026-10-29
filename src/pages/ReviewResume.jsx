
import React, { useState } from 'react'
import {
  FileText,
  Upload,
  Sparkles,
  X,
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react'

const ReviewResume = () => {
  const [resume, setResume] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [review, setReview] = useState(null)
  const [error, setError] = useState('')

  const onResumeChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF or DOCX resume.')
      e.target.value = ''
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10 MB.')
      e.target.value = ''
      return
    }

    setResume(file)
    setReview(null)
    setError('')
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!resume) {
      setError('Please upload your resume first.')
      return
    }

    setError('')
    setLoading(true)
    setReview(null)

    // Demo only: connect your backend resume-review API here.
    setTimeout(() => {
      setReview({
        score: null,
        summary:
          'Your resume has been uploaded successfully. Connect an AI review API to receive a real analysis.',
        strengths: [
          'Resume file uploaded successfully',
          'Ready for review against your target role'
        ],
        improvements: [
          'Add measurable achievements to your work experience.',
          'Use clear headings and consistent formatting.',
          'Include skills that match the target job description.'
        ]
      })
      setLoading(false)
    }, 1000)
  }

  const clearResume = () => {
    setResume(null)
    setReview(null)
    setError('')
  }

  const downloadReport = () => {
    if (!review) return

    const report = [
      'RESUME REVIEW REPORT',
      '',
      review.summary,
      '',
      'STRENGTHS',
      ...review.strengths.map((item) => `- ${item}`),
      '',
      'AREAS TO IMPROVE',
      ...review.improvements.map((item) => `- ${item}`)
    ].join('\n')

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'resume-review.txt'
    link.click()

    URL.revokeObjectURL(url)
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
          <h1 className="text-xl font-semibold">AI Resume Reviewer</h1>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Upload your resume and prepare it for your next job application.
        </p>

        <p className="text-sm font-medium mt-6">Upload Resume</p>

        {!resume ? (
          <label className="mt-2 flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-purple-50 transition">
            <Upload className="w-8 h-8 text-purple-500 mb-3" />
            <p className="text-sm font-medium">Click to upload your resume</p>
            <p className="text-xs text-gray-400 mt-2">
              PDF or DOCX (maximum 10 MB)
            </p>

            <input
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={onResumeChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="mt-3 p-3 flex items-center gap-3 border border-gray-200 rounded-lg">
            <FileText className="w-8 h-8 text-purple-600 shrink-0" />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{resume.name}</p>
              <p className="text-xs text-gray-400">
                {(resume.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={clearResume}
              aria-label="Remove resume"
              className="p-2 rounded-full hover:bg-red-50"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}

        <p className="text-sm font-medium mt-5">
          Target Job Description (Optional)
        </p>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={4}
          placeholder="Paste the job description to compare your resume with the role..."
          className="w-full px-3 py-2 mt-2 outline-none text-sm border border-gray-300 rounded-md focus:border-purple-400"
        />

        {error && (
          <p role="alert" className="text-sm text-red-600 mt-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !resume}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5" />
          {loading ? 'Reviewing Resume...' : 'Review Resume'}
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-purple-600" />
          <h1 className="text-xl font-semibold">Review Results</h1>
        </div>

        <div className="flex-1 mt-5">
          {loading ? (
            <div className="min-h-64 flex flex-col justify-center items-center gap-4 text-gray-400">
              <Sparkles className="w-10 h-10 animate-pulse" />
              <p className="text-sm">Preparing your resume review...</p>
            </div>
          ) : review ? (
            <div className="space-y-5">
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="font-semibold text-purple-800">Summary</p>
                <p className="text-sm mt-2 text-gray-600">
                  {review.summary}
                </p>
                <p className="text-xs mt-3 text-purple-600">
                  No AI score is available in this demo.
                </p>
              </div>

              <div>
                <h2 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Strengths
                </h2>
                <ul className="mt-3 space-y-2">
                  {review.strengths.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex gap-2"
                    >
                      <span className="text-green-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-semibold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Areas to Improve
                </h2>
                <ul className="mt-3 space-y-2">
                  {review.improvements.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex gap-2"
                    >
                      <span className="text-orange-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={downloadReport}
                className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-lg"
              >
                <Download className="w-4 h-4" />
                Download Review Report
              </button>
            </div>
          ) : (
            <div className="min-h-64 flex flex-col justify-center items-center gap-5 text-gray-400">
              <FileText className="w-10 h-10" />
              <p className="text-sm text-center">
                Upload your resume and click Review Resume to see your results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewResume
