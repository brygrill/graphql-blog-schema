import path from 'path';
import NeDB from 'nedb';

const data = path.join(path.resolve('./'), 'data');
const db = new NeDB({
  filename: path.join(data, 'posts.db'),
  autoload: true,
  timestampData: true,
});

const posts = {
  find(query) {
    return new Promise((resolve, reject) => {
      db.find(query)
      .sort({ updatedAt: -1 })
      .exec((err, docs) => {
        if (err) reject(err);
        return resolve(docs);
      });
    });
  },
  findLimit(query, count) {
    return new Promise((resolve, reject) => {
      db.find(query)
        .sort({ updatedAt: -1 })
        .limit(count)
        .exec((err, docs) => {
          if (err) reject(err);
          return resolve(docs);
        });
    });
  },
  insert(insert) {
    return new Promise((resolve, reject) => {
      db.insert(insert, (err, newDoc) => {
        if (err) reject(err);
        return resolve(newDoc);
      });
    });
  },
  update(id, update) {
    return new Promise((resolve, reject) => {
      db.update(
        { _id: id },
        { $set: update },
        { returnUpdatedDocs: true },
        (err, numReplaced, affectedDocuments) => {
          if (err) reject(err);
          return resolve(affectedDocuments);
        }
      );
    });
  },
  remove(id) {
    return new Promise((resolve, reject) => {
      db.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) reject(err);
        return resolve({
          success: true,
          _id: id,
          removedCount: numRemoved,
        });
      });
    });
  },
};

export default posts;
