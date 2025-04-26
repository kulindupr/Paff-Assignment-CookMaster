import { Link } from "react-router-dom"
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa"
import { formatDate } from "../../utils/formatters"
import "../../styles/CertificateCard.css"

const CertificateCard = ({ certificate }) => {
  return (
    <div className="certificate-card">
      <div className="certificate-header">
        <h3 className="certificate-title">{certificate.course.title}</h3>
        <span className="certificate-date">Issued on {formatDate(certificate.issuedAt)}</span>
      </div>

      <div className="certificate-preview">
        <img
          src={certificate.certificateUrl || "/placeholder.svg?height=200&width=300&text=Certificate"}
          alt={`${certificate.course.title} Certificate`}
        />
      </div>

      <div className="certificate-footer">
        <div className="certificate-info">
          <span className="certificate-number">#{certificate.certificateNumber}</span>
        </div>

        <div className="certificate-actions">
          <a href={certificate.certificateUrl} download className="download-button" title="Download Certificate">
            <FaDownload />
          </a>

          <Link to={`/certificates/${certificate._id}`} className="view-button" title="View Certificate">
            <FaExternalLinkAlt />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CertificateCard

