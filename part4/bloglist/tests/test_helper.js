const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}