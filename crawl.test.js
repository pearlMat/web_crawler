const {normalizeURL, getURLsFromHTML} = require('./crawl')
const {test, expect} = require('@jest/globals')

test('normalizeUrl', () => {
    const input = 'https://bookontransapp.com/login'
    const actual = normalizeURL(input)
    const expected = 'bookontransapp.com/login'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip slash', () => {
    const input = 'http://bookontransapp.com/login/'
    const actual = normalizeURL(input)
    const expected = 'bookontransapp.com/login'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip capitals', () => {
    const input = 'https://BOOK.com/login/'
    const actual = normalizeURL(input)
    const expected = 'book.com/login'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML', () => {
    const htmlBody = `<html>
    <body>
        <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
    </body>
</html>`
const baseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlBody, baseUrl)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute paths', () => {
    const htmlBody = `<html>
    <body>
        <a href="https://blog.boot.dev/courses/"><span>Go to Boot.dev</span></a>
    </body>
</html>`
const baseUrl = 'https://blog.boot.dev/courses/'
    const actual = getURLsFromHTML(htmlBody, baseUrl)
    const expected = ['https://blog.boot.dev/courses/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative paths', () => {
    const htmlBody = `<html>
    <body>
        <a href="/courses/"><span>Go to Boot.dev</span></a>
    </body>
</html>`
const baseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlBody, baseUrl)
    const expected = ['https://blog.boot.dev/courses/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative and absolute paths', () => {
    const htmlBody = `<html>
    <body>
    <a href="https://blog.boot.dev/courses/"><span>Go to Boot.dev courses</span></a>
        <a href="/blog/"><span>Go to Boot.dev blog</span></a>
    </body>
</html>`
const baseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlBody, baseUrl)
    const expected = ['https://blog.boot.dev/courses/','https://blog.boot.dev/blog/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid url', () => {
    const htmlBody = `<html>
    <body>
        <a href="invalid"><span>Go to Boot.dev</span></a>
    </body>
</html>`
const baseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlBody, baseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})
