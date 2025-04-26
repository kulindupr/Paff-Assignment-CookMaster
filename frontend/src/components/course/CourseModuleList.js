"use client"

import { useState } from "react"
import { FaChevronDown, FaChevronUp, FaPlay, FaFile, FaLock } from "react-icons/fa"
import "../../styles/CourseModuleList.css"

const CourseModuleList = ({ modules, isEnrolled = false }) => {
  const [expandedModules, setExpandedModules] = useState([])

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => {
      if (prev.includes(moduleId)) {
        return prev.filter((id) => id !== moduleId)
      } else {
        return [...prev, moduleId]
      }
    })
  }

  const getTotalDuration = () => {
    let totalMinutes = 0

    modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        // Assuming lesson duration is stored in minutes
        if (lesson.duration) {
          totalMinutes += Number.parseInt(lesson.duration, 10) || 0
        }
      })
    })

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`
  }

  return (
    <div className="course-module-list">
      <div className="module-list-header">
        <div className="module-stats">
          <span>{modules.length} modules</span>
          <span>•</span>
          <span>{modules.reduce((total, module) => total + module.lessons.length, 0)} lessons</span>
          <span>•</span>
          <span>{getTotalDuration()} total length</span>
        </div>
      </div>

      <div className="modules">
        {modules.map((module, moduleIndex) => (
          <div key={module.id || moduleIndex} className="module-item">
            <div className="module-header" onClick={() => toggleModule(module.id || moduleIndex)}>
              <div className="module-title">
                <span className="module-number">Module {moduleIndex + 1}:</span>
                <h4>{module.title}</h4>
              </div>
              <div className="module-info">
                <span>{module.lessons.length} lessons</span>
                {expandedModules.includes(module.id || moduleIndex) ? (
                  <FaChevronUp className="toggle-icon" />
                ) : (
                  <FaChevronDown className="toggle-icon" />
                )}
              </div>
            </div>

            {expandedModules.includes(module.id || moduleIndex) && (
              <div className="module-lessons">
                {module.description && <div className="module-description">{module.description}</div>}

                <ul className="lesson-list">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lesson.id || lessonIndex} className="lesson-item">
                      <div className="lesson-info">
                        <div className="lesson-icon">{lesson.videoUrl ? <FaPlay /> : <FaFile />}</div>
                        <div className="lesson-title">
                          <span className="lesson-number">
                            {moduleIndex + 1}.{lessonIndex + 1}
                          </span>
                          <span>{lesson.title}</span>
                        </div>
                      </div>
                      <div className="lesson-actions">
                        {lesson.duration && <span className="lesson-duration">{lesson.duration}</span>}
                        {!isEnrolled && <FaLock className="lock-icon" />}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseModuleList

