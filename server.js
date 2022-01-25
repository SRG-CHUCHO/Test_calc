const express = require("express");
const cors = require("cors");
const { serializeError } = require("serialize-error");
const path = require("path")
const PORT = process.env.PORT || 3002

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './build')))

app.post("/calculate", (req, res) => {
  const { calculate } = req.body;
  try {
    if (!/^(\d+\+?)+$/.test(req.body.calculate)) {
      throw new Error("string is not valid. Try again");
    }
    const sum = calculate.split("+").reduce((acc, rec) => acc + +rec, 0);
    res.json({sender:'server', message:`=${sum}`});
  } catch (err) {
    res.json({ sender:'server', message: serializeError(err).message });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} server started`);
});
