const firebase = require('firebase');
require('firebase/firestore');

export class Firebase{

    constructor(){

        this._config = {         
            apiKey: "AIzaSyCciorN7W513mBAKLR_j1vZzDNexPmQlV0",
            authDomain: "whatsapp-clone-7f818.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-7f818.firebaseio.com",
            projectId: "whatsapp-clone-7f818",
            storageBucket: "gs://whatsapp-clone-7f818.appspot.com",
            messagingSenderId: "367410496266",
            appId: "1:367410496266:web:a52fc60ea77d4be002f0f3"
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