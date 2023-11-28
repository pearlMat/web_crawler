const {sortPages} = require('./report')
const {test, expect} = require('@jest/globals')

test('sortPages', () => {
    const input = {
        
       
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
       
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages many pages', () => {
    const input = {
        
       
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path3': 4,
        'https://wagslane.dev/path2': 9,
        'https://wagslane.dev/path4': 7,
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path2', 9],
        ['https://wagslane.dev/path4', 7],
        ['https://wagslane.dev/path3', 4],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})