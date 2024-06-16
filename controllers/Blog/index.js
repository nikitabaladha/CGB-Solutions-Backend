const create = require("./create");
const update = require("./update");
const remove = require("./remove");

const getOneById = require("./getOneById");
const getAll = require("./getAll");

const getAllByUserId = require("./getAllByUserId");

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
  create,
  update,
  remove,

  getOneById,
  getAll,
  getAllByUserId,

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
