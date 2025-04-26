// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Password validation - at least 6 chars, 1 uppercase, 1 lowercase, 1 number
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/

export const validateEmail = (email) => {
  if (!email) return "Email is required"
  if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address"
  return ""
}

export const validatePassword = (password) => {
  if (!password) return "Password is required"
  if (!PASSWORD_REGEX.test(password)) {
    return "Password must be at least 6 characters and include uppercase, lowercase, and a number"
  }
  return ""
}

export const validateName = (name) => {
  if (!name) return "Name is required"
  if (name.length < 2) return "Name must be at least 2 characters"
  return ""
}

export const validateRequired = (value, fieldName) => {
  if (!value) return `${fieldName} is required`
  return ""
}

export const validateLength = (value, fieldName, min, max) => {
  if (!value) return ""
  if (value.length < min) return `${fieldName} must be at least ${min} characters`
  if (max && value.length > max) return `${fieldName} must be less than ${max} characters`
  return ""
}

export const validateMatch = (value1, value2, fieldName) => {
  if (value1 !== value2) return `${fieldName} do not match`
  return ""
}

// Form validators
export const loginValidator = (values) => {
  const errors = {}

  const emailError = validateEmail(values.email)
  if (emailError) errors.email = emailError

  const passwordError = validateRequired(values.password, "Password")
  if (passwordError) errors.password = passwordError

  return errors
}

export const registerValidator = (values) => {
  const errors = {}

  const nameError = validateName(values.name)
  if (nameError) errors.name = nameError

  const emailError = validateEmail(values.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(values.password)
  if (passwordError) errors.password = passwordError

  const confirmPasswordError = validateMatch(values.password, values.confirmPassword, "Passwords")
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError

  return errors
}

export const profileValidator = (values) => {
  const errors = {}

  const nameError = validateName(values.name)
  if (nameError) errors.name = nameError

  const emailError = validateEmail(values.email)
  if (emailError) errors.email = emailError

  const bioError = validateLength(values.bio, "Bio", 0, 500)
  if (bioError) errors.bio = bioError

  return errors
}

export const courseValidator = (values) => {
  const errors = {}

  const titleError = validateRequired(values.title, "Title")
  if (titleError) errors.title = titleError

  const descriptionError = validateRequired(values.description, "Description")
  if (descriptionError) errors.description = descriptionError

  const levelError = validateRequired(values.level, "Level")
  if (levelError) errors.level = levelError

  const durationError = validateRequired(values.duration, "Duration")
  if (durationError) errors.duration = durationError

  return errors
}

export const reviewValidator = (values) => {
  const errors = {}

  if (!values.rating) errors.rating = "Rating is required"

  const commentError = validateLength(values.comment, "Comment", 10, 1000)
  if (commentError) errors.comment = commentError

  return errors
}

export const postValidator = (values) => {
  const errors = {}

  if (!values.text && !values.image) {
    errors.text = "Post must contain text or an image"
  }

  return errors
}

