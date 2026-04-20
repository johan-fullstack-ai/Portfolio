import './CV.css'

/* CV page embeds the existing CV site in an iframe */
function CV() {
  return (
    <section className="cvPage">
      <h1 className="cvTitle">My CV</h1>
      <div className="cvIframeWrapper">
        <iframe
          src="https://johan-fullstack-ai.github.io/Web/"
          title="Johan's CV"
          className="cvIframe"
          loading="lazy"
          sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox" // last one allows target="_blank" links in the CV to work, we don't allow scripts here
        />
      </div>
    </section>
  )
}

export default CV
