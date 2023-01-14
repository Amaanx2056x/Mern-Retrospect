let { validationResult } = require("express-validator");
let checkReq = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw errors.array();
  }
};

let entityExistence = async (req, res, Entity, param, send = false) => {
  let extEnt = await Entity.findOne({ [param]: req.body[param] });
  if (extEnt) {
    if (send) {
      return extEnt;
    }
    throw new Error("The Entry Already Exist");
  }
};

let errorHandler = (err, res) => {
  if (err.message) {
    return res.status(400).send({ error: [{ msg: err.message }] });
  } else {
    return res.status(400).send({ error: err });
  }
};

module.exports = { checkReq, entityExistence, errorHandler };
