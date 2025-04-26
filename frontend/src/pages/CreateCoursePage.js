"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaPlus, FaTrash, FaSave, FaUpload, FaExclamationTriangle } from "react-icons/fa"
import useAuth from "../hooks/useAuth"
import courseService from "../services/courseService"
import Loader from "../components/common/Loader"
import "../styles/CreateCoursePage.css"

const CreateCoursePage = () => {
  const { id } = useParams() // If editing existing course
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(id ? true : false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("basic")

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    thumbnailPreview: null,
    level: "beginner",
    duration: "",
    tags: [],
    modules: [
      {
        id: Date.now().toString(),
        title: "",
        description: "",
        lessons: [
          {
            id: Date.now().toString() + "-1",
            title: "",
            content: "",
            videoUrl: "",
            resources: [],
          },
        ],
      },
    ],
  })

  useEffect(() => {
    if (id) {
      fetchCourseData()
    }
  }, [id])

  const fetchCourseData = async () => {
    try {
      setIsLoading(true)
      const data = await courseService.getCourseById(id)

      // Ensure the course belongs to the current user
      if (data.instructorId !== currentUser._id) {
        setError("You do not have permission to edit this course")
        setIsLoading(false)
        return
      }

      // Add unique IDs to modules and lessons for form handling
      const formattedData = {
        ...data,
        modules: data.modules.map((module) => ({
          ...module,
          id: module._id || Date.now().toString() + Math.random(),
          lessons: module.lessons.map((lesson) => ({
            ...lesson,
            id: lesson._id || Date.now().toString() + Math.random(),
          })),
        })),
      }

      setCourseData(formattedData)
      setError(null)
    } catch (err) {
      setError("Failed to fetch course data. Please try again later.")
      console.error("Error fetching course data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCourseData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleTagsChange = (e) => {
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    setCourseData((prev) => ({
      ...prev,
      tags,
    }))
  }

  const handleModuleChange = (moduleId, field, value) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => (module.id === moduleId ? { ...module, [field]: value } : module)),
    }))
  }

  const handleLessonChange = (moduleId, lessonId, field, value) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : module,
      ),
    }))
  }

  const addModule = () => {
    setCourseData((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          lessons: [
            {
              id: Date.now().toString() + "-1",
              title: "",
              content: "",
              videoUrl: "",
              resources: [],
            },
          ],
        },
      ],
    }))
  }

  const removeModule = (moduleId) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.filter((module) => module.id !== moduleId),
    }))
  }

  const addLesson = (moduleId) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: Date.now().toString(),
                  title: "",
                  content: "",
                  videoUrl: "",
                  resources: [],
                },
              ],
            }
          : module,
      ),
    }))
  }

  const removeLesson = (moduleId, lessonId) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : module,
      ),
    }))
  }

  const addResource = (moduleId, lessonId, resource) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      resources: [...lesson.resources, resource],
                    }
                  : lesson,
              ),
            }
          : module,
      ),
    }))
  }

  const removeResource = (moduleId, lessonId, resourceIndex) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      resources: lesson.resources.filter((_, index) => index !== resourceIndex),
                    }
                  : lesson,
              ),
            }
          : module,
      ),
    }))
  }

  const validateForm = () => {
    if (!courseData.title) {
      setError("Course title is required")
      setActiveTab("basic")
      return false
    }

    if (!courseData.description) {
      setError("Course description is required")
      setActiveTab("basic")
      return false
    }

    if (!courseData.level) {
      setError("Course level is required")
      setActiveTab("basic")
      return false
    }

    if (!courseData.duration) {
      setError("Course duration is required")
      setActiveTab("basic")
      return false
    }

    // Validate modules and lessons
    for (const module of courseData.modules) {
      if (!module.title) {
        setError(`Module title is required for all modules`)
        setActiveTab("curriculum")
        return false
      }

      for (const lesson of module.lessons) {
        if (!lesson.title) {
          setError(`Lesson title is required for all lessons in module "${module.title}"`)
          setActiveTab("curriculum")
          return false
        }
      }
    }

    return true
  }

  const handleSubmit = async (e, isDraft = true) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsSaving(true)
      setError(null)

      // Prepare form data for API
      const formData = new FormData()
      formData.append("title", courseData.title)
      formData.append("description", courseData.description)
      formData.append("level", courseData.level)
      formData.append("duration", courseData.duration)
      formData.append("tags", JSON.stringify(courseData.tags))
      formData.append("modules", JSON.stringify(courseData.modules))
      formData.append("status", isDraft ? "draft" : "submitted")

      if (courseData.thumbnail instanceof File) {
        formData.append("thumbnail", courseData.thumbnail)
      }

      let response
      if (id) {
        response = await courseService.updateCourse(id, formData)
      } else {
        response = await courseService.createCourse(formData)
      }

      navigate(`/courses/${response._id}`)
    } catch (err) {
      setError(err.message || "Failed to save course. Please try again later.")
      console.error("Error saving course:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmitForReview = async (e) => {
    handleSubmit(e, false)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="create-course-page">
      <div className="page-header">
        <h1>{id ? "Edit Course" : "Create New Course"}</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={(e) => handleSubmit(e, true)} disabled={isSaving}>
            <FaSave />
            <span>Save as Draft</span>
          </button>

          <button className="btn btn-primary" onClick={handleSubmitForReview} disabled={isSaving}>
            {isSaving ? "Saving..." : "Submit for Review"}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-container">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}

      <div className="course-form-tabs">
        <button className={`tab-button ${activeTab === "basic" ? "active" : ""}`} onClick={() => setActiveTab("basic")}>
          Basic Information
        </button>

        <button
          className={`tab-button ${activeTab === "curriculum" ? "active" : ""}`}
          onClick={() => setActiveTab("curriculum")}
        >
          Curriculum
        </button>
      </div>

      <form className="course-form">
        {activeTab === "basic" && (
          <div className="basic-info-section">
            <div className="form-group">
              <label htmlFor="title">Course Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleBasicInfoChange}
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Course Description *</label>
              <textarea
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleBasicInfoChange}
                placeholder="Enter course description"
                rows={6}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="level">Course Level *</label>
                <select id="level" name="level" value={courseData.level} onChange={handleBasicInfoChange} required>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="duration">Course Duration *</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={courseData.duration}
                  onChange={handleBasicInfoChange}
                  placeholder="e.g., 4 weeks, 10 hours"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={courseData.tags.join(", ")}
                onChange={handleTagsChange}
                placeholder="e.g., baking, desserts, italian"
              />
            </div>

            <div className="form-group">
              <label htmlFor="thumbnail">Course Thumbnail</label>
              <div className="thumbnail-upload">
                {(courseData.thumbnailPreview || courseData.thumbnail) && (
                  <div className="thumbnail-preview">
                    <img src={courseData.thumbnailPreview || courseData.thumbnail} alt="Course thumbnail preview" />
                  </div>
                )}

                <div className="upload-button-container">
                  <label htmlFor="thumbnail-upload" className="upload-button">
                    <FaUpload />
                    <span>Upload Thumbnail</span>
                  </label>
                  <input
                    type="file"
                    id="thumbnail-upload"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    style={{ display: "none" }}
                  />
                  <p className="upload-hint">Recommended size: 1280x720 pixels</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="curriculum-section">
            <div className="modules-container">
              {courseData.modules.map((module, moduleIndex) => (
                <div key={module.id} className="module-card">
                  <div className="module-header">
                    <h3>Module {moduleIndex + 1}</h3>
                    {courseData.modules.length > 1 && (
                      <button type="button" className="btn-icon btn-danger" onClick={() => removeModule(module.id)}>
                        <FaTrash />
                      </button>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor={`module-title-${module.id}`}>Module Title *</label>
                    <input
                      type="text"
                      id={`module-title-${module.id}`}
                      value={module.title}
                      onChange={(e) => handleModuleChange(module.id, "title", e.target.value)}
                      placeholder="Enter module title"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`module-description-${module.id}`}>Module Description</label>
                    <textarea
                      id={`module-description-${module.id}`}
                      value={module.description}
                      onChange={(e) => handleModuleChange(module.id, "description", e.target.value)}
                      placeholder="Enter module description"
                      rows={3}
                    />
                  </div>

                  <div className="lessons-container">
                    <h4>Lessons</h4>

                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="lesson-card">
                        <div className="lesson-header">
                          <h5>Lesson {lessonIndex + 1}</h5>
                          {module.lessons.length > 1 && (
                            <button
                              type="button"
                              className="btn-icon btn-danger"
                              onClick={() => removeLesson(module.id, lesson.id)}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor={`lesson-title-${lesson.id}`}>Lesson Title *</label>
                          <input
                            type="text"
                            id={`lesson-title-${lesson.id}`}
                            value={lesson.title}
                            onChange={(e) => handleLessonChange(module.id, lesson.id, "title", e.target.value)}
                            placeholder="Enter lesson title"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor={`lesson-content-${lesson.id}`}>Lesson Content</label>
                          <textarea
                            id={`lesson-content-${lesson.id}`}
                            value={lesson.content}
                            onChange={(e) => handleLessonChange(module.id, lesson.id, "content", e.target.value)}
                            placeholder="Enter lesson content"
                            rows={4}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor={`lesson-video-${lesson.id}`}>Video URL</label>
                          <input
                            type="url"
                            id={`lesson-video-${lesson.id}`}
                            value={lesson.videoUrl}
                            onChange={(e) => handleLessonChange(module.id, lesson.id, "videoUrl", e.target.value)}
                            placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                          />
                        </div>

                        <div className="form-group">
                          <label>Resources</label>
                          <div className="resources-list">
                            {lesson.resources.map((resource, resourceIndex) => (
                              <div key={resourceIndex} className="resource-item">
                                <span>{resource}</span>
                                <button
                                  type="button"
                                  className="btn-icon btn-danger"
                                  onClick={() => removeResource(module.id, lesson.id, resourceIndex)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            ))}

                            <div className="add-resource">
                              <input type="text" placeholder="Resource URL" id={`resource-${lesson.id}`} />
                              <button
                                type="button"
                                className="btn-icon btn-primary"
                                onClick={() => {
                                  const input = document.getElementById(`resource-${lesson.id}`)
                                  if (input.value) {
                                    addResource(module.id, lesson.id, input.value)
                                    input.value = ""
                                  }
                                }}
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => addLesson(module.id)}>
                      <FaPlus />
                      <span>Add Lesson</span>
                    </button>
                  </div>
                </div>
              ))}

              <button type="button" className="btn btn-secondary" onClick={addModule}>
                <FaPlus />
                <span>Add Module</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateCoursePage

