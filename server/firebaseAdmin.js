const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "zerox-web.firebasestorage.app"
});

const storage = admin.storage();

console.log("Firebase Admin Initialized");

module.exports = { admin, storage };
