const express = require("express");
const router = express.Router();
const { Entry, User, Tag } = require("../models");




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
  const entries = await Entry.findByPk(req.params.id);
 res.json(entries);

})

// Create a single entry to the journal by id
router.post("/", async (req, res, next) => {
  try {
//     const entry = await Entry.create(req.body);
//     res.send(entry);
//   } catch (error) {
//     next(error);
//   }
// })
const [user, wasCreated] = await User.findOrCreate({
  where: {
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }
});

const entry = await Entry.create(req.body);

await entry.setAuthor(user);

if(req.body.tags) {
  const tagArray = req.body.tags.split(' ');
  const tags = [];
  for (let tagName of tagArray) {
    const [tag, wasCreated] = await Tag.findOrCreate({
      where: {
        name: tagName
      }
    });
    if (wasCreated) {
      tags.push(tag);
    }
  }
  await entry.addTags(tags);
}

res.send(page);
} catch (error) {
next(error);
}
});

// GET /entry/search
router.get("/search", async (req, res, next) => {
  try {
    const entries = await Entry.findByTag(req.query.search);
    res.send(entries);
  } catch (error) {
    next(error);
  }
});



// PUT /wiki/:slug
router.put("/:slug", async (req, res, next) => {
  try {
    const [updatedRowCount, updatedEntries] = await Entry.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    });

    const tagArray = req.body.tags.split(' ');
    const tags = await Promise.all(tagArray.map(async (tagName) => {
      const [tag, wasCreated] = await Tag.findOrCreate({
        where: {
          name: tagName
        }
      });
      return tag;
    }));

    await updatedEntries[0].setTags(tags);

    res.send(updatedEntries[0]);
  } catch (error) {
    next(error);
  }
});

// DELETE /entry/:slug
router.delete("/:slug", async (req, res, next) => {
  try {
    await Entry.destroy({
      where: {
        slug: req.params.slug
      }
    });

    const entries = await Entry.findAll();
    res.send(entries);
  } catch (error) {
    next(error);
  }
});

// GET /entry/:slug
router.get("/:slug", async (req, res, next) => {
  try {
    const entry = await Entry.findOne({
      where: {
        slug: req.params.slug
      },
      include: [
        {
          model: Tag,
          through: { attributes: [] } // exclude join table data
        },
        {
          model: User,
          as: 'author'
        }
      ],
    });
    if (entry === null) {
      res.status(404).send(notFoundPage());
    } else {
      res.send(entry);
    }
  } catch (error) {
    next(error);
  }
});

// GET /entry/:slug/similar
router.get('/:slug/similar', async (req, res, next) => {
  try {
    const entry = await Entry.findOne({
      where: {
        slug: req.params.slug
      },
      include: [{ model: Tag }]
    });
    const tagNames = entry.tags.map(tag => tag.name);
    const similars = await entry.findSimilar(tagNames);
    res.send(similars);
  } catch (error) {
    next(error);
  }
})


module.exports = router;
