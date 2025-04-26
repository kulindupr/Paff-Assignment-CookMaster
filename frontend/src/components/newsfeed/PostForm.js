"use client"

import { useState } from "react"
import { FaImage, FaTimes } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"
import postService from "../../services/postService"
import "../../styles/PostForm.css"

const PostForm = ({ onPostCreated }) => {
  const { currentUser } = useAuth()
  const [postText, setPostText] = useState("")
  const [postImage, setPostImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleTextChange = (e) => {
    setPostText(e.target.value)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }

      setPostImage(file)
      setImagePreview(URL.createObjectURL(file))
      setError("")
    }
  }

  const handleRemoveImage = () => {
    setPostImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!postText.trim() && !postImage) {
      setError("Post must contain text or an image")
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      const formData = new FormData()
      formData.append("text", postText)

      if (postImage) {
        formData.append("image", postImage)
      }

      const newPost = await postService.createPost(formData)

      setPostText("")
      setPostImage(null)
      setImagePreview(null)

      if (onPostCreated) {
        onPostCreated(newPost)
      }
    } catch (err) {
      setError(err.message || "Failed to create post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="post-form-login">
        <p>Please log in to create a post</p>
      </div>
    )
  }

  return (
    <div className="post-form-container">
      <form className="post-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-header">
          <img
            src={currentUser.profilePicture || "/placeholder.svg?height=40&width=40"}
            alt={currentUser.name}
            className="user-avatar"
          />
          <textarea
            placeholder="Share your cooking experience..."
            value={postText}
            onChange={handleTextChange}
            disabled={isSubmitting}
            rows={3}
          />
        </div>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview || "/placeholder.svg"} alt="Preview" />
            <button type="button" className="remove-image" onClick={handleRemoveImage}>
              <FaTimes />
            </button>
          </div>
        )}

        <div className="form-actions">
          <div className="form-buttons">
            <label htmlFor="post-image" className="image-button">
              <FaImage />
              <span>Add Image</span>
            </label>
            <input
              type="file"
              id="post-image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting || (!postText.trim() && !postImage)}>
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostForm

