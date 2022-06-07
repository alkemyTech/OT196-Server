// Add Activity's Model
const { Activity } = require("../models/index");

exports.createActivity = async (req, res, next) => {
  try {
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
        message: "Error creating contact.",
        error: e.parent?.sqlMessage || e.name,
      });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
