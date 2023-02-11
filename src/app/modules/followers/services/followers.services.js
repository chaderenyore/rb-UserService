const FollowerRepository = require ('../repository/follower.repository');

class FollowerService {
  constructor () {
    this.UserRepository = UserRepository;
  }

  async createFollwer (data) {
    return this.UserRepository.create (data)
  }

  async findAFollower (query) {
    return this.UserRepository.findOne (query)
  }

  async update (condition, update) {
    return this.UserRepository.update (condition, update)

  }
  async deleteAll (condition) {
    return this.UserRepository.deleteMany (condition)

  }

  async all (limit, page, data) {
    return this.UserRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.UserRepository.findById (id)
  }
  async aggregate (condition, field) {
    return this.UserRepository.aggregate(condition, field)
 }
}

module.exports = FollowerService;
