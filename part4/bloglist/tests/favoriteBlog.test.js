const listHelper = require('../utils/list_helper')
const blogs = require('./bloglist')

describe('favorite blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog is that one', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({ title: listWithOneBlog[0].title, author: listWithOneBlog[0].author, likes: listWithOneBlog[0].likes })
    })

    test('of many is correct', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({ title: blogs[2].title, author: blogs[2].author, likes: blogs[2].likes })
    })

    test('of empty array is empty object', () => {
        expect(listHelper.favoriteBlog([])).toEqual({})
    })
})