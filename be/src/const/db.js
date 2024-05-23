// import serviceAccount from '../../serviceAccount.json';
import dotenv from 'dotenv';
dotenv.config();
import * as admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

import {getFirestore} from 'firebase-admin/firestore';

const db = getFirestore();

export default db;
