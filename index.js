const { MongoClient } = require('mongodb-legacy');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbName = 'nucampsite';

MongoClient.connect(url, {}).then(client => {
  console.log('Connected correctly to server');

  const db = client.db(dbName);

  db.dropCollection('campsites')
    .then(result => {
      console.log('Dropped Collection:', result)
    })
    .catch(err => console.log('No collection to drop.'))

  dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
    .then(result => {
      console.log('Insert Document:', result.ops);

      return dboper.findDocuments(db, 'campsites')
    })
    .then(result => {
      console.log('Updated Document Count:', result.result.nModified);

      return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
      console.log('Found Documents:', docs);

      return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
        'campsites');
    })
    .then(result => {
      console.log('Deleted Document Count:', result.deletedCount);

      return client.close();
    })
    .catch(err => {
      console.log(err);
      client.close();
    });
})
  .catch(err => console.log(err));

// , (err, client) => {
// assert.strictEqual(err, undefined);

// console.log('Connected correctly to server');

// const db = client.db(dbName);

// db.dropCollection('campsites', (err, result) => {
//   assert.strictEqual(err, undefined);
//   console.log('Dropped Collection:', result);

//   dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" },
//     'campsites', result => {
//       console.log('Insert Document:', result.ops);

//       dboper.findDocuments(db, 'campsites', docs => {
//         console.log('Found Documents:', docs);

//         dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
//           { description: "Updated Test Description" }, 'campsites',
//           result => {
//             console.log('Updated Document Count:', result.modifiedCount);

//             dboper.findDocuments(db, 'campsites', docs => {
//               console.log('Found Documents:', docs);

//               dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
//                 'campsites', result => {
//                   console.log('Deleted Document Count:', result.deletedCount);

//                   client.close();
//                 }
//               );
//             });
//           }
//         );
//       });
//     });
// });
// });