const fs = require("fs");
const prisma = require("../config/Prisma");

module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", { title: "Express" });
    } catch (error) {
      console.error(error);
      fs.appendFileSync("error.log", `${error}\n`);
      res.status(500).json({ code: 0, message: "Error", error });
    }
  },
};
