import app from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    if (window.location.hostname === "localhost") {
      app.firestore().settings({
        host: "localhost:8091",
        ssl: false,
      });
    }
    this.db = app.firestore();
  }

  motorcycles = () => this.db.collection('motorcycles');
}
 
export default Firebase;
