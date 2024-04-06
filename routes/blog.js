const { Router } = require("express")
const blogController = require("../controllers/blog")
const router = Router()
const multer = require("multer")
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage })

router.route("/create-new-blog")
    .get(blogController.renderCreateBlog)
    .post(upload.single("coverImage"), blogController.createBlog)


// router.post("/", upload.single("coverImage"),)

module.exports = router