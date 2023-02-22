const FollowingRepository = require ('../repository/following.repository');

class FollowingService {
  constructor () {
    this.FollowingRepository = FollowingRepository;
  }

  async createFollowing (data) {
    return this.FollowingRepository.create (data)
  }

  async findAFollowing (query) {
    return this.FollowingRepository.findOne (query)
  }

  async update (condition, update) {
    return this.FollowingRepository.update (condition, update)

  }

  async updateMany (condition, update) {
    return this.FollowingRepository.updateMany(condition, update)

  }
  async deleteAll (condition) {
    return this.FollowingRepository.deleteMany (condition)

  }

  async deleteOne (condition) {
    return this.FollowingRepository.deleteOne (condition)

  }

  async all (limit, page, data) {
    return this.FollowingRepository.all (limit, page, data)
  }

  async findById (id) {
    return this.FollowingRepository.findById (id)
  }
  async aggregate (condition, field) {
    return this.FollowingRepository.aggregate(condition, field)
 }
}

module.exports = FollowingService;
