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

afterAll(() => {
    mongoose.connection.close()
})