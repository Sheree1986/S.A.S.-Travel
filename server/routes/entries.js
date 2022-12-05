const express = require("express");
const entriesRouter = express.Router();
const { Entry } = require("../models");


entriesRouter.use(express.json());
entriesRouter.use(express.urlencoded({extended: true}))

// GET all Entries
entriesRouter.get("/", async (req, res, next) => {
  try {
    const entries = await Entry.findAll();
    res.send(entries);
  } catch (error) {
    next(error);
  }
});

//GET one entry
entriesRouter.get("/:id", async (req, res) => {
  const entries = await Entry.findByPk(req.params.id);
 res.json(entries);

})

// Create a single entry to the inventory by id
entriesRouter.post("/", async (req, res, next) => {
  try {
    const entry = await Entry.create(req.body);
    res.send(entry);
  } catch (error) {
    next(error);
  }
})



// Update a single entry to the inventory by id
entriesRouter.put("/:id", async (req, res, next) => {
  try {
    await Entry.update(req.body, {
      where: { id: req.params.id },
    });
    let putEntries = await Entry.findAll();
    res.json(putEntries);
  } catch (error) {
    next(error);
  }
});




// Delete a single entry to the inventory by id
entriesRouter.delete("/:id", async (req, res, next) => {
  try {
    await Entry.destroy({
      where : {id : req.params.id}
    });
    const entry = await Entry.findAll()
    res.send(entry);
  } catch (error) {
    next(error);
  } 
})

module.exports = entriesRouter;
