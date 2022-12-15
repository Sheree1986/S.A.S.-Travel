const express = require("express");
const router = express.Router();
const { Entry } = require("../models/index");



router.use(express.json());
router.use(express.urlencoded({extended: true}))


// GET all Entries
router.get("/", async (req, res, next) => {
  try {
    const entries = await Entry.findAll();
    res.send(entries);
  } catch (error) {
    next(error);
  }
});

//GET one entry
router.get("/:id", async (req, res) => {
  try {
     const entries = await Entry.findByPk(req.params.id);
 res.send(entries);
} catch (error) {
  next(error);
}
});

router.put("/:id", async (req, res) => {
  try {
    const entries = await Entry.findByPk(req.params.id);
    await entries.update({
    authorId: req.body.authorId,
    title: req.body.title,
    content: req.body.content,
    location: req.body.location,
    image: req.body.image
  })

  res.send(entries);
} catch (error) {
  next(error);
}
});

// Create a single entry to the journal by id
router.post("/", async (req, res, next) => {
  try {
const entries = await Entry.create({
  authorId: req.body.authorId,
  title: req.body.title,
  content: req.body.content,
  location: req.body.location,
  image: req.body.image
})

res.send(entries);
} catch (error) {
next(error);
}
});

//Delete one entry
router.delete("/:id", async (req, res) => {
  try {
     const entries = await Entry.findByPk(req.params.id);
     const deleteEntry =await entries.destroy();
 res.send(deleteEntry);
} catch (error) {
  next(error);
}
});
// const entry = await Entry.create(req.body);

// await entry.setAuthor(user);



// GET /entry/search
// router.get("/search", async (req, res, next) => {
//   try {
//     const entries = await Entry.findByTag(req.query.search);
//     res.send(entries);
//   } catch (error) {
//     next(error);
//   }
// });




module.exports = router;