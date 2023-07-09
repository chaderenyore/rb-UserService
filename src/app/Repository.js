const { getPaginatedRecords } = require("../_helpers/paginate");

class Repository {
  constructor(Model) {
    this.Model = Model;
  }

  getModel() {
    return this.Model;
  }

  create(obj) {
    return this.Model.create(obj);
  }

  findById(id) {
    return this.Model.findById(id);
  }

  findOne(condition = {}) {
    return this.Model.findOne(condition);
  }
  find(condition = {}) {
    return this.Model.find(condition);
  }
  async fetchAllOrderBy(
    specifiedLimit = 10,
    page,
    data = {},
    sortFilter
  ) {
    const limit = Math.min(specifiedLimit, 100); // restrict limit to 100
    const offset = 0 + (Math.abs(page || 1) - 1) * limit;

    const modelData = await this.Model.find({ ...data }).countDocuments();

    const result = await this.Model.find({ ...data })
      .select("")
      .skip(offset)
      .limit(limit)
      .sort(sortFilter);

    return {
      data: result,
      pagination: {
        pageSize: limit, //number of content yousee per page
        totalCount: modelData, //Total number of records
        pageCount: Math.ceil(modelData / limit), //How many pages will be available
        currentPage: +page, //if you're on page 1 or 18...
        hasNext: page * limit < modelData,
      },
    };
  }
  all(limit, page, data, selectedFields) {
    return getPaginatedRecords(this.Model, {
      limit: limit,
      page: page,
      data,
      selectedFields,
    });
  }

  count (condition = {}) {
    return this.Model.count(condition);
  }

  delete(condition) {
    return this.Model.deleteMany(condition);
  }

  deleteOne(condition) {
    return this.Model.deleteOne(condition);
  }
  aggregate(condition, field) {
    return this.Model.aggregate([
      {
        $match: condition,
      },
      { $group: { _id: null, field: { $sum: +field } } },
    ]);
  }
  update(condition, update) {
    return this.Model.findOneAndUpdate(condition, update, {
      new: true,
      lean: true,
    });
  }

  updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = Repository;
