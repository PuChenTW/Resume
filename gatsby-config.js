/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  pathPrefix: '/Resume',
  siteMetadata: {
    title: `Pu Chen | Software Engineer`,
    author: `Pu Chen`,
    description: `Software Engineer in Changing.AI`,
    siteUrl: `https://www.linkedin.com/in/%E7%92%9E-%E9%99%B3-ba2a8a15a/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pu Chen | Software Engineer`,
        short_name: `CV`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#38B2AC`,
        display: `standalone`,
        icon: 'src/assets/site-icon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    'gatsby-plugin-netlify-cms',
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true, // Enable tailwindcss support
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: 'AIzaSyD8r0e50YWGfn_QH17ZI6v491zYQ_0_Ago',
          authDomain: 'resume-21563.firebaseapp.com',
          projectId: 'resume-21563',
          storageBucket: 'resume-21563.appspot.com',
          messagingSenderId: '137368038192',
          appId: '1:137368038192:web:33d22946531cd7e9af76f5',
          measurementId: 'G-PT8DBMBCG8',
        }
      }
    }
  ],
};
