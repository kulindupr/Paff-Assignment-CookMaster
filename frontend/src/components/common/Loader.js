import "../../styles/Loader.css"

const Loader = ({ size = "medium", fullPage = false }) => {
  const loaderClasses = `loader ${size} ${fullPage ? "full-page" : ""}`

  return (
    <div className={loaderClasses}>
      <div className="spinner"></div>
      {fullPage && <p>Loading...</p>}
    </div>
  )
}

export default Loader

