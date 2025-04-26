import { format, formatDistanceToNow, parseISO } from "date-fns"

// Format date to display format (e.g., "Jan 1, 2023")
export const formatDate = (dateString) => {
  if (!dateString) return ""
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString
  return format(date, "MMM d, yyyy")
}

// Format date with time (e.g., "Jan 1, 2023 at 12:30 PM")
export const formatDateTime = (dateString) => {
  if (!dateString) return ""
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString
  return format(date, "MMM d, yyyy 'at' h:mm a")
}

// Format relative time (e.g., "5 minutes ago", "2 days ago")
export const formatRelativeTime = (dateString) => {
  if (!dateString) return ""
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString
  return formatDistanceToNow(date, { addSuffix: true })
}

// Format number with commas (e.g., 1,234)
export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Format currency (e.g., "$19.99")
export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

// Format percentage (e.g., "85%")
export const formatPercentage = (value) => {
  return `${Math.round(value)}%`
}

// Format file size (e.g., "1.5 MB")
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

