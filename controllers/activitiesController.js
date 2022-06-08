// Add Activity's Model
const { Activity } = require("../models/index");

exports.getActivityDetails = async (req, res, next) => {
  try {
    // Get the id from the URL
    const { id } = req.params;

    // Get data from DB
    const activity = await Activity.findByPk(id, {
      attributes: ["name", "content", "image"],
    });
    res.json(activity);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
exports.createActivity = async (req, res, next) => {
  // Get the params from req.body
  const { name, content, image } = req.body;

  try {
    // Add new data to DB
    const newActivity = await Activity.create({
      name: name,
      content: content,
      image: image || "",
    });

    // Response on success request
    if (newActivity)
      return res.status(200).send({
        ok: true,
        message: "Activity created.",
        newActivity: newActivity,
      });
  } catch (e) {
    // Response with error on fail request
    return res.status(400).send({
      ok: false,
      message: e.message,
      error: e.parent?.sqlMessage || e.name,
    });
  }
};
