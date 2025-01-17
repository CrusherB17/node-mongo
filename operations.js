const assert = require('assert').strict;

exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.insertOne(document);
  coll.insertOne(document, (err, result) => {
    assert.strictEqual(err, undefined);
    callback(result);
  });
};

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};