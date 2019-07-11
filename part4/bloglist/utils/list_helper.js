const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (tot, blog) => {
        return tot + blog.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes,
}