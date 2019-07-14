const listHelper = require('../utils/list_helper')
const blogs = require('./bloglist')

describe('most likes', () => {
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

    test('when list has only one it has most likes', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 5 })
    })

    test('of many is ok', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
    })

    test('of empty array result in empty', () => {
        expect(listHelper.mostLikes([])).toEqual({})
    })
})