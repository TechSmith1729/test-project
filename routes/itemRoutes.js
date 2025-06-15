const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// Add an item (only logged-in users)
router.post("/add", auth, async (req, res) => {
    try {
        const newItem = new Item({ ...req.body, userId: req.user.userId });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: "Error adding item" });
    }
});

// Get all items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Error fetching items" });
    }
});

module.exports = router;
