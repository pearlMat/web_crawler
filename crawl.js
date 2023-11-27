function normalizeURL(url){
  const urlObj = new URL(url)
  const domainPath = `${urlObj.hostname}${urlObj.pathname}`
  if (domainPath.length > 0 && domainPath.slice(-1) === '/'){
    return domainPath.slice(0, -1)
  }
  return domainPath
}

module.exports = {
    normalizeURL
  }