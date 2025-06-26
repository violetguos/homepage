require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `Violet Guo`,
    indexTitle: "software engineer | web | machine learning",
    author: {
      name: `Violet Guo`,
      info: "machine learning, swe",
      summary: `machine learning, swe`,
    },
    description: `Violet Guo`,
    siteUrl: `https://violetguos.github.io`,
    social: {
      youtube: "https://www.youtube.com/@codebuzz-v1d",
      github: "https://github.com/violetguos",
      linkedin: "https://www.linkedin.com/in/yvioletguo/",
      // substack: "",
      // twitter: ``,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },
    // {
    //   resolve: "gatsby-source-flickr",
    //   options: {
    //     api_key: process.env.FLICKR_API_KEY,
    //     user_id: "realvioletg",
    //   },
    // },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /icons/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
          // ...
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-plugin-webmention`,
            options: {
              username: "violetguos.github.io", // webmention.io username
              identity: {
                github: "violetguos",
                twitter: "yvioletguo", // no @
              },
              mentions: true,
              pingbacks: true,
              domain: "violetguos.github.io",
              token: process.env.WEBMENTIONS_TOKEN,
            },
          },
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: "embedVideo-container",
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: {
                default: "Quiet Light",
                parentSelector: { "div#dark": "Monokai Dimmed" },
              },
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 980,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-KG3PXM2G9B`,
        head: true,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Violet Guo - software engineer`,
        short_name: `VioletGuo`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#e4561b`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
