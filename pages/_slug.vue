<template>
  <div class="container mx-auto">
    <div id="links">
      <div v-for="(item, index) in linkTags" :key="index " v-html="item" />
    </div>
    <div id="styles">
      <div v-for="(item, index) in styleTags" :key="index " v-html="item" />
    </div>
    <div id="scripts">
      <div v-for="(item, index) in scriptTags" :key="index " v-html="item" />
    </div>
    <div v-html="contentHtml" />
  </div>
</template>

<script>

export default {
  async asyncData ({ route }) {
    const baseUrl = 'http://www.sn.at'
    const response = await fetch(`${baseUrl}${route.fullPath}`, {
      headers: {
        accept: 'text/html'
      },
      method: 'GET'
    })
    const data = await response.text()

    const DomParser = require('dom-parser')
    const parser = new DomParser()
    const dom = parser.parseFromString(data)

    const linkTags = dom.getElementsByTagName('link').map(link => link.outerHTML)
    const styleTags = dom.getElementsByTagName('style').map(style => style.outerHTML)
    const scriptTags = dom.getElementsByTagName('script').map(script => script.outerHTML)
    // const contentHtml = dom.getElementsByTagName('main')[0].outerHTML.replace(/require\(/g, 'console.log(')
    const contentHtml = dom.getElementsByTagName('main')[0].outerHTML

    return {
      linkTags,
      styleTags,
      scriptTags,
      contentHtml
    }
  },
  data () {
    return {
      linkTags: [],
      styleTags: [],
      scriptTags: [],
      contentHtml: null
    }
  }
}
</script>
