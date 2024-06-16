const create = require("./create");
const update = require("./update");
const remove = require("./remove");

const getOneById = require("./getOneById");
const getAll = require("./getAll");
const getAllByUserId = require("./getAllByUserId");

module.exports = {
  create,
  update,
  remove,

  getOneById,
  getAll,
  getAllByUserId,
};
