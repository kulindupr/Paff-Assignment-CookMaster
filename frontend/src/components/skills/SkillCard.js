"use client"
import { FaTimes } from "react-icons/fa"
import "../../styles/SkillCard.css"

const SkillCard = ({ skill, onRemove, isEditable = false }) => {
  return (
    <div className="skill-card">
      <div className="skill-icon">
        {skill.icon ? (
          <img src={skill.icon || "/placeholder.svg"} alt={skill.name} />
        ) : (
          <div className="default-icon">{skill.name.charAt(0)}</div>
        )}
      </div>

      <div className="skill-content">
        <h3 className="skill-name">{skill.name}</h3>

        {skill.level && (
          <div className="skill-level">
            <div className="level-bar">
              <div className="level-progress" style={{ width: `${skill.level}%` }}></div>
            </div>
            <span className="level-text">{skill.level}%</span>
          </div>
        )}

        {skill.description && <p className="skill-description">{skill.description}</p>}
      </div>

      {isEditable && onRemove && (
        <button className="remove-skill" onClick={() => onRemove(skill._id)} aria-label="Remove skill">
          <FaTimes />
        </button>
      )}
    </div>
  )
}

export default SkillCard

