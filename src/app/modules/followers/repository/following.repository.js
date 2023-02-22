const Repository = require("../../../Repository");
const Following  = require("../models/following.model");

class FollowingRepository extends Repository {
    constructor() {
        super(Following);
    };
}

module.exports = new FollowingRepository();