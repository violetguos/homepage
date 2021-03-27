module.exports = {
  siteMetadata: {
    title: `Berat Bozkurt`,
    indexTitle: "Berat Bozkurt | front-end developer",
    author: {
      name: `Berat Bozkurt`,
      info:
        "I'm Berat Bozkurt. I'm 21 years old. I'm a developer. I love to write about anything. Don't forget to subscribe me and if you love the article, please like and comment, Hi youtube!",
      summary: `Freelancer, front-end developer, open source, writing, tweeting, shutterbug`,
    },
    description: `Berat Bozkurt, front-end developer, photography, blogging`,
    siteUrl: `https://beratbozkurt.net/`,
    social: {
      twitter: `https://twitter.com/beratbozkurt0`,
      vsco: "https://vsco.co/beratbozkurt0",
      github: "https://github.com/berat",
      instagram: "https://instagram.com/beratbozkurt0",
      linkedin: "https://www.linkedin.com/in/beratbozkurt/",
      superpeer: "https://superpeer.com/berat",
      flickr: "https://www.flickr.com/photos/beratbozkurt0/",
      substack: "https://beratbozkurt.substack.com/subscribe",
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },
    {
      resolve: "gatsby-source-flickr",
      options: {
        api_key: process.env.FLICKR_API_KEY,
        user_id: "beratbozkurt0"
      }
    },
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
              username: "beratbozkurt.net", // webmention.io username
              identity: {
                github: "berat",
                twitter: "beratbozkurt0", // no @
              },
              mentions: true,
              pingbacks: true,
              domain: "beratbozkurt.net",
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
          }, {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: {
                default: 'Quiet Light',
                parentSelector: { 'div#dark': 'Monokai Dimmed' }
              },
            }
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
        trackingId: `UA-163663946-1`,
        head: true,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Berat Bozkurt - front-end developer`,
        short_name: `BeratBozkurt`,
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
