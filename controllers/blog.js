const Blog = require("../models/blog");

const renderCreateBlog = (req, res) => {
    return res.render("addBlog", {
        user: req.user
    });
}

const createBlog = async (req, res) => {
    const { title, body } = req.body
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    // console.log(req.file)
    // console.log(req.body)
    console.log(blog)
    return res.redirect(`/blog/${blog._id}`)
}


const renderSingleBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    return res.render('singleBlog', {
        user: req.user,
        blog
    })
}

module.exports = { renderCreateBlog, createBlog, renderSingleBlog };