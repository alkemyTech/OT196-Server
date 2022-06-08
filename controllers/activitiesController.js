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
