const approveCreate = require("./approveCreate");
const approveUpdate = require("./approveUpdate");
const approveDelete = require("./approveDelete");

const rejectCreate = require("./rejectCreate");
const rejectUpdate = require("./rejectUpdate");
const rejectDelete = require("./rejectDelete");

const getAllCreateRequest = require("./getAllCreateRequest");
const getAllUpdateRequest = require("./getAllUpdateRequest");
const getAllDeleteRequest = require("./getAllDeleteRequest");

module.exports = {
  rejectUpdate,
  rejectDelete,
  rejectCreate,

  approveCreate,
  approveDelete,
  approveUpdate,

  getAllCreateRequest,
  getAllDeleteRequest,
  getAllUpdateRequest,
};
