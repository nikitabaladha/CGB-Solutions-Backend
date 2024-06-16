const create = require("./create");
const getOneById = require("./getOneById");
const getAll = require("./getAll");
const update = require("./update");
const remove = require("./remove");
const getAllByUserId = require("./getAllByUserId");
const approveUpdate = require("./approveUpdate");
const approveDelete = require("./approveDelete");
const rejectUpdate = require("./rejectUpdate");
const rejectDelete = require("./rejectDelete");
const getAllCreateRequest = require("./getAllCreateRequest");
const approveCreate = require("./approveCreate");
const rejectCreate = require("./rejectCreate");

module.exports = {
  create,
  getOneById,
  getAll,
  update,
  remove,
  getAllByUserId,
  approveUpdate,
  rejectUpdate,
  rejectDelete,
  rejectCreate,
  approveDelete,
  approveCreate,
  getAllCreateRequest,
};
