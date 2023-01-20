const Repository = require("../../../Repository");
const Follower  = require("../models/followers.model");

class FollowerRepository extends Repository {
    constructor() {
        super(Follower);
    };
}

module.exports = new FollowerRepository();