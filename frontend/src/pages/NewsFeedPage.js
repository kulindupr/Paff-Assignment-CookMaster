"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { FaImage } from "react-icons/fa"
import PostCard from "../components/newsfeed/PostCard"
import Loader from "../components/common/Loader"
import ErrorMessage from "../components/common/ErrorMessage"
import useAuth from "../hooks/useAuth"
import postService from "../services/postService"
import "../styles/NewsFeedPage.css"

const NewsFeedPage = () => {
  const { currentUser } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newPostText, setNewPostText] = useState("")
  const [newPostImage, setNewPostImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async (refresh = false) => {
    try {
      setLoading(refresh ? true : loadingMore)
      const currentPage = refresh ? 1 : page

      const data = await postService.getNewsFeed(currentPage)

      if (refresh) {
        setPosts(data.posts)
      } else {
        setPosts((prev) => [...prev, ...data.posts])
      }

      setHasMore(data.hasMore)
      setPage(currentPage + 1)
      setError(null)
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.")
      console.error("Error fetching posts:", err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true)
      fetchPosts()
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewPostImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmitPost = async (e) => {
    e.preventDefault()

    if (!newPostText.trim() && !newPostImage) {
      return
    }

    try {
      setSubmitting(true)

      const formData = new FormData()
      formData.append("text", newPostText)
      if (newPostImage) {
        formData.append("image", newPostImage)
      }

      const newPost = await postService.createPost(formData)

      setPosts((prev) => [newPost, ...prev])
      setNewPostText("")
      setNewPostImage(null)
      setImagePreview(null)
    } catch (err) {
      setError("Failed to create post. Please try again.")
      console.error("Error creating post:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) => prev.map((post) => (post._id === updatedPost._id ? updatedPost : post)))
  }

  const handlePostDelete = (postId) => {
    setPosts((prev) => prev.filter((post) => post._id !== postId))
  }

  return (
    <div className="news-feed-page">
      <div className="news-feed-header">
        <h1>News Feed</h1>
      </div>

      <div className="news-feed-content">
        <div className="post-form-container">
          {currentUser ? (
            <form className="post-form" onSubmit={handleSubmitPost}>
              <div className="form-header">
                <img
                  src={currentUser.profilePicture || "/placeholder.svg?height=40&width=40"}
                  alt={currentUser.name}
                  className="user-avatar"
                />
                <textarea
                  placeholder="Share your cooking experience..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  disabled={submitting}
                />
              </div>

              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => {
                      setNewPostImage(null)
                      setImagePreview(null)
                    }}
                  >
                    &times;
                  </button>
                </div>
              )}

              <div className="form-actions">
                <div className="form-buttons">
                  <label htmlFor="post-image" className="btn btn-icon">
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

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting || (!newPostText.trim() && !newPostImage)}
                >
                  {submitting ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          ) : (
            <div className="login-prompt">
              <p>Please log in to share your cooking experiences.</p>
              <Link to="/login" className="btn btn-primary">
                Log In
              </Link>
            </div>
          )}
        </div>

        <div className="posts-container">
          {loading && !loadingMore ? (
            <Loader />
          ) : error && posts.length === 0 ? (
            <ErrorMessage message={error} />
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <p>No posts yet. Be the first to share your cooking experience!</p>
            </div>
          ) : (
            <>
              <div className="posts-list">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onPostUpdate={handlePostUpdate}
                    onPostDelete={handlePostDelete}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="load-more">
                  <button className="btn btn-secondary" onClick={handleLoadMore} disabled={loadingMore}>
                    {loadingMore ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsFeedPage

