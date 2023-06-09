"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("./database/models/connection");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/", (req, res) => {
  res.send("HELLO WORLD");
});
const port = process.env.PORT || 8000;
connection_1.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port sfdfdf ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
