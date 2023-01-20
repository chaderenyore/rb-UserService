const Repository = require("../../../Repository");
const User  = require("../models/user.model");

class FollowerRepository extends Repository {
    constructor() {
        super(Follower);
    };
}

module.exports = new FollowerRepository();