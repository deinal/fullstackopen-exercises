const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain('click')
})

test('blogs has an id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)

    expect(ids[0]).toBeDefined()
})

test('a blog can be added', async () => {
    const newBlog = {
        title: "penguins",
        author: "Freeman",
        url: "hi.yahoo",
        likes: 52
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('penguins')
})

test('like missing defaults to zero', async () => {
    const newBlog = {
        title: "giraffe",
        author: "Morgan",
        url: "bing.me"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const likes = blogs.map(r => r.likes)
    expect(likes[helper.initialBlogs.length]).toBe(0)
})

test('title and url missing return bad request', async () => {
    const newBlog = {
        author: "Parker",
        likes: 31
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})