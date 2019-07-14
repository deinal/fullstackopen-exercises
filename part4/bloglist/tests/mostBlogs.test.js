const listHelper = require('../utils/list_helper')
const blogs = require('./bloglist')

describe('most blogs', () => {
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

    test('only one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 })
    })

    test('of many have author R.C.M and 3 blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 })
    })

    test('of empty is zero', () => {
        expect(listHelper.mostBlogs([])).toEqual({})
    })
})