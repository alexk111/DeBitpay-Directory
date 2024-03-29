const pluginRss = require('@11ty/eleventy-plugin-rss')

function sortByTitle (a, b) {
  const aTitle = a.data.title.toLowerCase()
  const bTitle = b.data.title.toLowerCase()
  if (aTitle < bTitle) return -1
  else if (aTitle > bTitle) return 1
  else return 0
}

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy('src/images')

  eleventyConfig.addCollection('places', collection =>
    collection.getFilteredByGlob('./src/places/*.md').sort(sortByTitle)
  )

  eleventyConfig.addCollection('alternatives', collection =>
    collection.getFilteredByGlob('./src/alternatives/*.md').sort(sortByTitle)
  )

  eleventyConfig.addFilter('altFor', (arr, altFor) =>
    arr.filter(item => {
      return (item.data.altFor && item.data.altFor.includes(altFor))
    })
  )

  eleventyConfig.addFilter('uncapitalize', str =>
    str.charAt(0).toLowerCase() + str.slice(1)
  )

  eleventyConfig.addFilter('openSentence', str =>
    str.charAt(str.length - 1) === '.' ? str.slice(0, str.length - 1) : str
  )

  eleventyConfig.addPlugin(pluginRss)

  /* Markdown Plugins */
  let markdownIt = require('markdown-it')
  let markdownItAnchor = require('markdown-it-anchor')
  let options = {
    html: true,
    breaks: true,
    linkify: true
  }
  let opts = {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: ' '
  }

  eleventyConfig.setLibrary(
    'md',
    markdownIt(options).use(markdownItAnchor, opts)
  )

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    htmlTemplateEngine: 'njk'
  }
}
