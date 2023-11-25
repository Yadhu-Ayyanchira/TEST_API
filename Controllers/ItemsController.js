import Item from "../Models/ItemModel.js";

//<----------------ADD AN ITEM-------------------->

const addItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.headers;
    if (!name) {
      return res.status(400).json({ status: false, message: "Please enter all fields" });
    }
    const newItem = new Item({
      user: id,
      name,
      description,
    });
    const item = await newItem.save();
    if (item) {
      return res.status(201).json({item, status: true, message: "Item added successfully"});
    } else {
      return res.status(400).json({ status: false, message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

//<----------------GET ALL ITEMS SEARCH/PAGINATION-------------------->

const getAllItems = async (req, res) => {
  try {
    const { search, page } = req.query;
    let query = {};
    if (search) {
      query.$or = [{ name: { $regex: new RegExp(search, "i") } }];
    }
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const items = await Item.find(query).skip(skip).limit(pageSize);
    return res
      .status(200)
      .json({ items, status: true, message: "All items...!" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

//<----------------GET ONE ITEM USING ID-------------------->

const getOneItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (item) {
      return res
        .status(200)
        .json({ item, status: true, message: "Item found" });
    } else {
      return res.status(404).json({ status: false, message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

//<----------------EDIT AN ITEM USING ID-------------------->

const editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const item = await Item.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (item) {
      return res.status(204).json({ status: true, message: "" });
    } else {
      return res.status(400).json({ status: false, message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

//<----------------DELETE AN ITEM USING ID-------------------->

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (item) {
      return res.status(204).json({ status: true, message: "" });
    } else {
      return res.status(404).json({ status: false, message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default {
  addItem,
  getAllItems,
  getOneItem,
  editItem,
  deleteItem,
};
