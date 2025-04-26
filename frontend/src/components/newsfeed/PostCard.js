"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaHeart, FaRegHeart, FaComment, FaShare, FaEllipsisV } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns"
import CommentList from "./CommentList"
import CommentForm from "./CommentForm"
import useAuth from "../../hooks/useAuth"
import postService from "../../services/postService"
import "../../styles/PostCard.css"

const PostCard = ({ post, onPostUpdate, onPostDelete }) => {
  const { currentUser } = useAuth()
  const [showComments, setShowComments] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [isLiked, setIsLiked] = useState(post.likes.some((like) => like.user === currentUser?._id))
  const [likesCount, setLikesCount] = useState(post.likes.length)

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await postService.unlikePost(post._id)
        setLikesCount((prev) => prev - 1)
      } else {
        await postService.likePost(post._id)
        setLikesCount((prev) => prev + 1)
      }
      setIsLiked(!isLiked)
    } catch (err) {
      console.error("Error toggling like:", err)
    }
  }

  const handleCommentToggle = () => {
    setShowComments(!showComments)
  }

  const handleOptionsToggle = () => {
    setShowOptions(!showOptions)
  }

  const handleDelete = async () => {
    try {
      await postService.deletePost(post._id)
      onPostDelete(post._id)
    } catch (err) {
      console.error("Error deleting post:", err)
    }
  }

  const handleCommentSubmit = async (commentText) => {
    try {
      const updatedPost = await postService.addComment(post._id, { text: commentText })
      onPostUpdate(updatedPost)
    } catch (err) {
      console.error("Error adding comment:", err)
    }
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          <img
            src={post.user.profilePicture || "/placeholder.svg?height=40&width=40"}
            alt={post.user.name}
            className="user-avatar"
          />
          <div className="user-info">
            <Link to={`/profile/${post.user._id}`} className="user-name">
              {post.user.name}
            </Link>
            <span className="post-time">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
          </div>
        </div>

        {currentUser && currentUser._id === post.user._id && (
          <div className="post-options">
            <button className="options-button" onClick={handleOptionsToggle} aria-label="Post options">
              <FaEllipsisV />
            </button>

            {showOptions && (
              <div className="options-dropdown">
                <button onClick={handleDelete} className="delete-button">
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="post-content">
        <p>{post.text}</p>

        {post.image && <img src={post.image || "/placeholder.svg"} alt="Post" className="post-image" />}
      </div>

      <div className="post-actions">
        <button className={`action-button ${isLiked ? "liked" : ""}`} onClick={handleLikeToggle}>
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span>{likesCount}</span>
        </button>

        <button className="action-button" onClick={handleCommentToggle}>
          <FaComment />
          <span>{post.comments.length}</span>
        </button>

        <button className="action-button">
          <FaShare />
        </button>
      </div>

      {showComments && (
        <div className="post-comments">
          <CommentList comments={post.comments} postId={post._id} onPostUpdate={onPostUpdate} />
          <CommentForm onSubmit={handleCommentSubmit} />
        </div>
      )}
    </div>
  )
}

export default PostCard

