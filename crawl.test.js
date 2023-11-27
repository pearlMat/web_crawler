const {normalizeURL} = require('./crawl')
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