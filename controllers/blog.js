const Blog = require("../models/blog");

const renderCreateBlog = (req, res) => {
    return res.render("addBlog", {
        user: req.user
    });
}

const createBlog =  async (req, res) => {
    // const { title, body } = req.body
    // await Blog.create({
    //     title,
    //     body
    // })
    console.log(req.file)
    console.log(req.body)
    return res.redirect("/")
}

module.exports = { renderCreateBlog, createBlog };