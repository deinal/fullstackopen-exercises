const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Heathers blog",
        author: "Heather",
        url: "www.clouds.com",
        likes: 12
    },
    {
        title: "click",
        author: "Ray",
        url: "googol.go",
        likes: 23
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}