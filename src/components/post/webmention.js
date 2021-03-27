import React from "react"

const Webmention = ({ mentions }) => {
  const { nodes } = mentions
  const replyCount = nodes.filter(
    m => m.wmProperty === "in-reply-to" || m.wmProperty === "mention-of"
  )
  if (nodes.length === 0) {
    return null
  }

  return (
    <div style={{ display: "block" }}>
      {replyCount.map(m => {
        if (m.wmProperty === "mention-of") {
          return (
            <div className="mention mention-web">
              <small className="mentionAction">{m.wmReceived}</small>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="url"
              >
                {m.url.replace(/https?:\/\//, "")}
              </a>
            </div>
          )
        } else
          return (
            <div
              key={m.wmId}
              className={`mention ${
                m.url.includes("beratbozkurt0") ? "mention-own" : ""
              }`}
            >
              <div className="profilePhotoHolder">
                <img
                  src={m.author.photo}
                  alt={m.author.name}
                  className="profilePhoto"
                />
              </div>
              <div className="content">
                <strong className="author">{m.author.name}</strong>{" "}
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  <small className="mentionAction">{m.wmReceived}</small>
                </a>
                <div className="mentionText">
                  {m.content?.text ? (
                    m.content.text
                  ) : (
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="url"
                    >
                      {m.url.replace(/https?:\/\//, "")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
      })}
    </div>
  )
}

export default Webmention
