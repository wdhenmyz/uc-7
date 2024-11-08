// firebaseconfig.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Configuração do Firebase
let firebaseConfig = {
  apiKey: "AIzaSyAsE3X_v1rUuI6NeU52Tu2bobelxUgMwfw",
  authDomain: "vaga-rapida.firebaseapp.com",
  databaseURL: "https://vaga-rapida-default-rtdb.firebaseio.com",
  projectId: "vaga-rapida",
  storageBucket: "vaga-rapida.firebaseapp.com",
  messagingSenderId: "269873137285",
  appId: "1:269873137285:web:38eedc600ea60520a28bec",
  measurementId: "G-3BTRXPQY8B"
};

// Inicializa o Firebase se ainda não estiver inicializado
if (!firebase.apps.length) {
  console.log(`Conectando ao Firebase: ${firebase.apps.length}`);
  firebase.initializeApp(firebaseConfig);
  console.log(`Conectado ao Firebase: ${firebase.apps.length}`);
}

export default firebase;
