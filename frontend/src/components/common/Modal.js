"use client"

import { useEffect, useRef } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles/Modal.css"

const Modal = ({ isOpen, onClose, title, children, size = "medium" }) => {
  const modalRef = useRef(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Close modal on escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay">
      <div className={`modal ${size}`} ref={modalRef}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}

export default Modal

