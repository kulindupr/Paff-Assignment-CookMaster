"use client"

import React from "react"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"
import "../../styles/CommentList.css"

const CommentList = ({ comments, postId, onPostUpdate }) => {
  const { currentUser } = useAuth()

  if (comments.length === 0) {
    return (
      <div className="no-comments">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          onPostUpdate={onPostUpdate}
          isOwner={currentUser && currentUser._id === comment.userId}
        />
      ))}
    </div>
  )
}

const CommentItem = ({ comment, postId, onPostUpdate, isOwner }) => {
  const [showOptions, setShowOptions] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editText, setEditText] = React.useState(comment.text)

  const handleOptionsToggle = () => {
    setShowOptions(!showOptions)
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setShowOptions(false)
  }

  const handleDeleteClick = async () => {
    try {
      const postService = (await import("../../services/postService")).default
      const updatedPost = await postService.deleteComment(postId, comment.id)
      onPostUpdate(updatedPost)
    } catch (err) {
      console.error("Error deleting comment:", err)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditText(comment.text)
  }

  const handleSaveEdit = async () => {
    if (!editText.trim()) return

    try {
      const postService = (await import("../../services/postService")).default
      const updatedPost = await postService.updateComment(postId, comment.id, { text: editText })
      onPostUpdate(updatedPost)
      setIsEditing(false)
    } catch (err) {
      console.error("Error updating comment:", err)
    }
  }

  return (
    <div className="comment-item">
      <div className="comment-avatar">
        <img src={comment.userProfilePicture || "/placeholder.svg?height=30&width=30"} alt={comment.userName} />
      </div>

      <div className="comment-content">
        <div className="comment-header">
          <Link to={`/profile/${comment.userId}`} className="comment-author">
            {comment.userName}
          </Link>
          <span className="comment-time">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
        </div>

        {isEditing ? (
          <div className="comment-edit">
            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={2} />
            <div className="edit-actions">
              <button onClick={handleCancelEdit}>Cancel</button>
              <button onClick={handleSaveEdit}>Save</button>
            </div>
          </div>
        ) : (
          <p className="comment-text">{comment.text}</p>
        )}
      </div>

      {isOwner && !isEditing && (
        <div className="comment-options">
          <button className="options-button" onClick={handleOptionsToggle}>
            <FaEllipsisV />
          </button>

          {showOptions && (
            <div className="options-dropdown">
              <button onClick={handleEditClick}>
                <FaEdit />
                <span>Edit</span>
              </button>
              <button onClick={handleDeleteClick}>
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CommentList

