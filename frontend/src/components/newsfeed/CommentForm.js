"use client"

import { useState } from "react"
import { FaPaperPlane } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"
import "../../styles/CommentForm.css"

const CommentForm = ({ onSubmit }) => {
  const { currentUser } = useAuth()
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!comment.trim()) return

    try {
      setIsSubmitting(true)
      await onSubmit(comment)
      setComment("")
    } catch (err) {
      console.error("Error submitting comment:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="comment-form-login">
        <p>Please log in to comment</p>
      </div>
    )
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-input">
        <img
          src={currentUser.profilePicture || "/placeholder.svg?height=30&width=30"}
          alt={currentUser.name}
          className="user-avatar"
        />
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <button type="submit" className="submit-button" disabled={!comment.trim() || isSubmitting}>
        {isSubmitting ? "Posting..." : "Post"}
      </button>
    </form>
  )
}

export default CommentForm

