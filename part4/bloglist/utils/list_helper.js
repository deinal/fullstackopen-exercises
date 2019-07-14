const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((tot, blog) => tot + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const blog = blogs.length === 0
        ? {}
        : blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return blog === {}
        ? {}
        : { title: blog.title, author: blog.author, likes: blog.likes }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {}
    const authors = blogs.reduce((list, blog) => {
        list.push(blog.author)
        return list
    }, [])

    const mode = a =>
        Object.values(
            a.reduce((count, e) => {
                if (!(e in count)) count[e] = [0, e]
                count[e][0]++
                return count
            }, {})
        ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1]

    const mostpopular = mode(authors)
    const nblogs = authors.filter(x => x === mostpopular).length
    return { author: mostpopular, blogs: nblogs }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}
    totallikes = {}
    blogs.forEach(blog => {
        if (!(blog.author in totallikes)) totallikes[blog.author] = 0
        totallikes[blog.author] = totallikes[blog.author] + blog.likes
    })
    mostpopular = Object.keys(totallikes).reduce((best, author) => {
        return totallikes[best] > totallikes[author] ? best : author
    })
    nlikes = totallikes[mostpopular]
    return { author: mostpopular, likes: nlikes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}