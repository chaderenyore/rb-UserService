const FollowerRepository = require ('../repository/follower.repository');

class FollowerService {
  constructor () {
    this.FollowerRepository = FollowerRepository;
  }

  async createFollwer (data) {
    return this.FollowerRepository.create (data)
  }

  async findAFollower (query) {
    return this.FollowerRepository.findOne (query)
  }

  async findAllFollowers(query) {
    return this.FollowerRepository.find (query)
  }

  async update (condition, update) {
    return this.FollowerRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.FollowerRepository.updateMany (condition, update)

  }
  async deleteAll (condition) {
    return this.FollowerRepository.deleteMany (condition)

  }

  async deleteOne (condition) {
    return this.FollowerRepository.deleteOne (condition)

  }

  async all (limit, page, data) {
    return this.FollowerRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.FollowerRepository.findById (id)
  }
  async aggregate (condition, field) {
    return this.FollowerRepository.aggregate(condition, field)
 }
}

module.exports = FollowerService;
