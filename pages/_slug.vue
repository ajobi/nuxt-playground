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
    <div v-html="adboxHtml" />
    <div v-html="contentHtml" />
  </div>
</template>

<script>
import { parse } from 'node-html-parser'

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

    const dom = parse(data)
    const linkTags = dom.querySelectorAll('link').map(link => link.toString())
    const styleTags = dom.querySelectorAll('style').map(style => style.toString())
    const scriptTags = dom.querySelectorAll('script').map(script => script.toString())
    const adboxHtml = dom.querySelector('.adbox').toString()
    const contentHtml = dom.querySelector('main').toString()
      .replace(/href="\/\/www\.sn\.at/g, 'href="')
      .replace(/href="https:\/\/www\.sn\.at/g, 'href="')

    return {
      linkTags,
      styleTags,
      scriptTags,
      adboxHtml,
      contentHtml
    }
  },
  data () {
    return {
      linkTags: [],
      styleTags: [],
      scriptTags: [],
      adboxHtml: null,
      contentHtml: null
    }
  }
}
</script>
