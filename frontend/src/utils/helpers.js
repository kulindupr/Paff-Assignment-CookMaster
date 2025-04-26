// Generate a random string (useful for IDs)
export const generateRandomString = (length = 8) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
  
  // Debounce function to limit how often a function can be called
  export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  // Throttle function to limit how often a function can be called
  export const throttle = (func, limit) => {
    let inThrottle
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => {
          inThrottle = false
        }, limit)
      }
    }
  }
  
  // Deep clone an object
  export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
  }
  
  // Check if an object is empty
  export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }
  
  // Get query params from URL
  export const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search)
    const paramsObj = {}
    for (const [key, value] of params.entries()) {
      paramsObj[key] = value
    }
    return paramsObj
  }
  
  // Create URL with query params
  export const createUrlWithParams = (baseUrl, params) => {
    const url = new URL(baseUrl, window.location.origin)
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
        url.searchParams.append(key, params[key])
      }
    })
    return url.toString()
  }
  
  // Scroll to element by ID
  export const scrollToElement = (elementId, offset = 0) => {
    const element = document.getElementById(elementId)
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + offset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }
  
  // Get file extension
  export const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
  }
  
  // Check if file is an image
  export const isImageFile = (file) => {
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    return file && acceptedImageTypes.includes(file.type)
  }
  
  // Convert base64 to blob
  export const base64ToBlob = (base64, mimeType) => {
    const byteString = atob(base64.split(",")[1])
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
  
    return new Blob([ab], { type: mimeType })
  }
  
  