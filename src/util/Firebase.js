const firebase = require('firebase');
require('firebase/firestore');

export class Firebase{

    constructor(){

        this._config = {         
            apiKey: "AIzaSyDEGw4F0LcEp4xGe4wh48AL0G1Vfckgjbo",
            authDomain: "whatsapp-clone-ea4a7.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-ea4a7.firebaseio.com", 
            projectId: "whatsapp-clone-ea4a7",
            storageBucket: "whatsapp-clone-ea4a7.appspot.com",
            messagingSenderId: "797217415257",
            appId: "1:797217415257:web:eb003199e7da7ceb379148"
        }

        this.init();
    }

    init(){

        if(!window._initializedFirebase){

            firebase.initializeApp(this._config);
            firebase.firestore().settings({});
            window._initializedFirebase = true;
        }
    }

    static db(){

        return firebase.firestore();
    }

    static hd(){

        return firebase.storage();
    }

    initAuth(){
        
        return new Promise((s,f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result=>{
                let token = result.credential.accessToken;
                let user = result.user;
                s({user, token});
            }).catch(err=>{
                f(err);
            })
        })
    }

}