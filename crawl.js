const { JSDOM } = require('jsdom')

async function crawlPage(url) {
  console.log(`Actively crawling ${url}`)

  try {
    const res = await fetch(url)
    if (res.status > 399){
      console.log(`error in fetch with status code ${res.status} on page: ${url}`)
      return
    }
    const contentType = res.headers.get("content-type")
    if(!contentType.includes("text/html")){
      console.log(`Non html response, content type ${contentType} on page: ${url}`)
      return
    }
    console.log(await res.text())

  } catch (e) {
    console.log(`erroe occured during fetch: ${e.message}`)
  }
}

function normalizeURL(url) {
  const urlObj = new URL(url)
  const domainPath = `${urlObj.hostname}${urlObj.pathname}`
  if (domainPath.length > 0 && domainPath.slice(-1) === '/') {
    return domainPath.slice(0, -1)
  }
  return domainPath
}

function getURLsFromHTML(body, baseUrl) {
  const urls = []
  const dom = new JSDOM(body)
  const links = dom.window.document.querySelectorAll('a')
  for (const link of links) {
    if (link.href.slice(0, 1) === '/') {
      try {
        const urlObj = new URL(`${baseUrl}${link.href}`)
        urls.push(urlObj.href)
      } catch (e) {
        console.log(`invalid url for relative path ${e.message}`)
      }
    } else {
      try {
        const urlObj = new URL(link.href)
        urls.push(urlObj.href)
      } catch (e) {
        console.log(`invalid url for absolute path ${e.message}`)
      }

    }

  }
  return urls
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}