import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';  
  
// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyA1VutLov5do0Xlt9bG1Dky6hdLhETxJIo",
    authDomain: "stock-portfolio-1.firebaseapp.com",
    databaseURL: "https://stock-portfolio-1.firebaseio.com",
    projectId: "stock-portfolio-1",
    storageBucket: "",
    messagingSenderId: "530214040473",
    appId: "1:530214040473:web:1d4a813550d2e303"
};

// Initialize Firebase
app.initializeApp(config);

export default app;