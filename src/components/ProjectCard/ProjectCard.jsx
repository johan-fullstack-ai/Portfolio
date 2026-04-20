import { useState } from 'react'
import ReactPlayer from 'react-player'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './ProjectCard.css'

/**
 * Renders a single project card with image, description, tech tags, and action buttons.
 * Supports three demo types: "video" (embedded player), "external" (link), and "iframe" (link).
 */
function ProjectCard({ title, image, description, tech, demo, github }) {
  const [showVideo, setShowVideo] = useState(false)

  /* Render the appropriate demo button based on demo.type */
  function renderDemoButton() {
    if (!demo) return null

    switch (demo.type) {
      case 'video':
        return (
          <button
            className="cardBtnFilled"
            onClick={() => setShowVideo(!showVideo)}
            aria-expanded={showVideo}
          >
            <FaExternalLinkAlt aria-hidden="true" />
            {showVideo ? 'Hide Presentation' : 'View Presentation'}
          </button>
        )
      case 'external':
      case 'iframe':
        return (
          <a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cardBtnFilled"
          >
            <FaExternalLinkAlt aria-hidden="true" />
            View Demo
          </a>
        )
      default:
        return null
    }
  }

  return (
    <article className="projectCard">
      <h3 className="cardTitle">{title}</h3>

      {/* Project screenshot */}
      <div className="cardImageWrapper">
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          loading="lazy"
          className="cardImage"
        />
      </div>

      <p className="cardDescription">{description}</p>

      {/* Tech stack tags */}
      <div className="cardTech">
        <span className="techLabel">Tech:</span>
        {tech.map((item) => (
          <span key={item} className="techTag">{item}</span>
        ))}
      </div>
      {console.log('demo.url:', demo?.url)}
      
      {/* Embedded video player for video-type demos */}
      {demo?.type === 'video' && showVideo && (
        <div className="cardVideoWrapper">
          <ReactPlayer
            src={demo.url}
            controls
            width="100%"
            height="100%"
            className="cardVideo"
          />
        </div>
      )}

    {/* {demo?.type === 'video' && showVideo && (
    <div className="cardVideoWrapper">
        <video controls width="100%" height="100%" src={demo.url}>
        Your browser does not support the video tag.
        </video>
    </div>
    )} */}

      {/* Action buttons */}
      <div className="cardActions">
        {renderDemoButton()}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="cardBtnOutline"
          >
            <FaGithub aria-hidden="true" />
            GitHub Repository
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
