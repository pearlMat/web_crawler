const { JSDOM } = require('jsdom')

async function crawlPage(baseUrl, currentUrl, pages) {
  
  const baseUrlObj = new URL(baseUrl)
  const currentUrlObj = new URL(currentUrl)

 if(baseUrlObj.hostname !== currentUrlObj.hostname){
  return pages
 }

 const normalUrl = normalizeURL(currentUrl)

 if(pages[normalUrl] > 0){
  pages[normalUrl] ++
  return pages
 }

 pages[normalUrl] = 1

 console.log(`Actively crawling ${url}`)



  try {
    const res = await fetch(url)
    if (res.status > 399){
      console.log(`error in fetch with status code ${res.status} on page: ${url}`)
      return pages
    }
    const contentType = res.headers.get("content-type")
    if(!contentType.includes("text/html")){
      console.log(`Non html response, content type ${contentType} on page: ${url}`)
      return pages
    }
    const htmlBody = await res.text()
    const nextUrls = getURLsFromHTML(htmlBody, baseUrl)
    for(n of nextUrls){
      pages = await crawlPage(baseUrl, n, pages)
    }

  } catch (e) {
    console.log(`erroe occured during fetch: ${e.message}`)
  }
  return pages
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