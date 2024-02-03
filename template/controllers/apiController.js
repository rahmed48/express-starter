const fs = require("fs");
const prisma = require("../config/Prisma");

module.exports = {
  index: async (req, res) => {
    try {
      res
        .status(200)
        .json({ code: 1, message: "Success", data: "Hello World" });
    } catch (error) {
      console.error(error);
      fs.appendFileSync("error.log", `${error}\n`);
      res.status(500).json({ code: 0, message: "Error", error });
    }
  },
};
