const Blog = require("../models/blog");
const Comment = require("../models/comment");

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
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy")
    // console.log("comments", comments)

    return res.render('singleBlog', {
        user: req.user,
        blog,
        comments
    })
}


const handleComments = async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
}

module.exports = { renderCreateBlog, createBlog, renderSingleBlog, handleComments };