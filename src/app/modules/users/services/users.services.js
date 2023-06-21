const UserRepository = require("../repository/users.repository");

class UserService {
  constructor() {
    this.UserRepository = UserRepository;
  }

  async createUser(data) {
    return this.UserRepository.create(data);
  }

  async findAUser(query) {
    return this.UserRepository.findOne(query);
  }
  async find(query) {
    return this.UserRepository.find(query);
  }
  async update(condition, update) {
    return this.UserRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.UserRepository.updateMany(condition, update);
  }
  async deleteAll(condition) {
    return this.UserRepository.deleteMany(condition);
  }

  async all(limit, page, data) {
    return this.UserRepository.all(limit, page, data);
  }

  async fetchAllOrderBy(limit, page, data, _, sortFilter) {
    return this.UserRepository.fetchAllOrderBy(limit, page, data, _, sortFilter);
  }

  async findUserById(id) {
    return this.UserRepository.findById(id);
  }
}

module.exports = UserService;
