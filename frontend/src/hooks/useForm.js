"use client"

import { useState } from "react"

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })

    if (touched[name] && validate) {
      const validationErrors = validate({ ...values, [name]: value })
      setErrors(validationErrors)
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched({
      ...touched,
      [name]: true,
    })

    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
    }
  }

  const handleSubmit = (callback) => (e) => {
    e.preventDefault()

    // Mark all fields as touched
    const touchedFields = {}
    Object.keys(values).forEach((key) => {
      touchedFields[key] = true
    })
    setTouched(touchedFields)

    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)

      // Only call callback if there are no errors
      if (Object.keys(validationErrors).length === 0) {
        callback(values)
      }
    } else {
      callback(values)
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  }
}

export default useForm

