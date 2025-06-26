import React from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import Welcome from "../components/index/welcome.js"
import SEO from "../components/seo.js"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <section id="page">
      <Layout location={location} title={siteTitle}>
        <SEO title={"About"} />
        <Welcome />
        <section id="page-content">
          <p>
            Welcome!
            <span role="img" aria-label="smile">
              😄
            </span>
          </p>
          <p>
            I am a software engineer with 5 years of full stack development
            experience, and 2 years of applied machine learning experience. My
            past work spans multiple domains.
          </p>
          <ul>
            <li>
              Machine learning: Tackled data including audio, images, time
              series, health care data, natural languages, chemical molecules
            </li>
            <li>
              Full stack development: identity management (SSO, OAuth), APIs for
              delivery and fulfillment platforms.
            </li>
            <li>Privacy: data governance, advertising signals</li>
          </ul>
          <p>In terms of tech stack, I have worked with the following</p>
          <ul>
            <li>
              Programming: Python, SQL, Bash, React, Go, GraphQL, JavaScript,
              TypeScript, Git
            </li>
            <li>
              Data: Airflow, Snowflake, BigQuery, Looker, LookML, PyTorch,
              Tensorflow
            </li>
            <li>
              Tools: Terraform, Protobuf, gRPC, Open API, AWS, Bazel, Docker,
              Jenkins, Jira, CI/CD, Google Cloud
            </li>
            <li>Monitoring: Datadog, Prometheus, Grafana, Sentry</li>
          </ul>
          <p>
            It's a pleasure meeting you. If you'd like to learn more about my
            work, please checkout my{" "}
            <a href="https://www.youtube.com/@codebuzz-v1d" target="_blank">
              Youtube channel
            </a>{" "}
            where I explain my projects in depth.
          </p>
          <p>
            This website is based on a template designed by{" "}
            <a href="https://github.com/berat/homepage" target="_blank">
              Berat Bozkurt
            </a>
            .
          </p>
        </section>
      </Layout>
    </section>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
