'use strict';

const Bb = require('bluebird');
const mongoose = require('mongoose');

const GridStore = Bb.promisifyAll(mongoose.mongo.GridFSBucket);

class GridFsBucketStorage {

  initialize(options) {
    this.db = options.dataSource.ModelClass.db.db;
  }

  async getStream(fileMeta) {
    const store = new GridStore(this.db);
    Bb.promisifyAll(store);

    const stream = await store.openDownloadStreamByName(fileMeta.filename);

    return {
      contentType: fileMeta.contentType,
      stream,
    };
  }
}

module.exports = GridFsBucketStorage;
