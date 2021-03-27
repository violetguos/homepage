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
        <SEO title={"Hakkımda"} />
        <Welcome />
        <section id="page-content">
          <p>
            Yaklaşık 12 yaşlarında yazılıma başlamama rağmen yaklaşık olarak son
            1-2 senedir çalışıyorum. Bu kadar erken başladığım için az çok neler
            var neler yok bilimiyorum ve yolumu belirlemek daha kolay oluyor.
            Tabii bazı şeyleri kestiremeseniz de yolda öğrendikleriniz var ki
            onlar en değerlileri oluyor. Neyse burası <b>"Hakkımda"</b> sayfası,
            kendimize gelelim{" "}
            <span role="img" aria-label="smile">
              😄
            </span>
          </p>
          <p>
            Lise zamanlarda küçük bir ajans, freelance gibi bir kaç yerde
            çalıştım. <i>Davetiyem.co</i> adında bir girişim kurdum ve yaklaşık
            1.5 yıl hayattaydı. Sonrasında beyaz bayrağı çekip kapattığıma dair
            bir yazı yayımladım. Benim için gerçekten güzel bir tecrübeydi.
          </p>
          <p>
            Önümüzdeki 5 ya da 10 sene içerisinde beni global bir şirket ya da
            kendi şirketimde dünyanın herhangi bir yerinde hobimi (işimi)
            yaparken göreceksiniz.
          </p>
          <p>
            Yazıyorum çünkü öğrendiklerimi, düşündüklerimi ve sevdiklerimi
            paylaşmayı seviyorum. Burada benden bir tutam kodlar, projeler,
            düşünceler ve fotoğraflar bulacaksınız.
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
