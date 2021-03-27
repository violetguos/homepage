import React from "react"
import projects from '../../../content/projects.js'

const ProjectList = () => {
  return (
    <div className="index-blog">
      <ol>
        {projects.map((item, index) => (
          <li className="general-list" key={index}>
            <a href={item.url} rel="noreferrer" target="_blank">
              <header>
                <h2>
                  <span itemProp="headline">{item.name}</span>
                </h2>
                <b>
                  {item.icon}
                </b>
              </header>
              <ul>
                {item.keywords.map((tag, key) => <li key={key}>{tag}</li>)}
              </ul>
              <p>
                {item.description}
              </p>
              </a>
          </li>
        )
        )}
      </ol>
    </div>
  )
}

export default ProjectList
