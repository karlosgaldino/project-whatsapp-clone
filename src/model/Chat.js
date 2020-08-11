import {Firebase} from '../util/Firebase';
import { Model } from "./Model";

export class Chat extends Model{

    constructor(){
        super();
    }

    get users(){
        return this._data.users;
    }

    set users(value){
        this._data.users = value;
    }
    get timeStamp(){
        return this._data.timeStamp;
    }

    set timeStamp(value){
        this._data.timeStamp = value;
    }

    static getRef(){
        return Firebase.db().collection('/chats');
    }
    static find(meEmail, contactEmail){

        return Chat.getRef('/chats')
        .where(btoa(meEmail),'==',true)
        .where(btoa(contactEmail),'==',true).get();
    }

    static create(meEmail, contactEmail){

        return new Promise((s,f)=>{

            let users = {};
            users[btoa(meEmail)] = true;
            users[btoa(contactEmail)] = true;

            Chat.getRef().add({
                users,
                timesStamp: new Date()
            }).then(doc =>{

                Chat.getRef().doc(doc.id).get().then(chat=>{

                    s(chat);
                }).catch(err=>{
                    f(err);
                })
            }).catch(err=>{
                f(err);
            });
            
        })
    }

    static createIfNotExist(meEmail, contactEmail){

        return new Promise((s,f)=>{
            
            Chat.find(meEmail, contactEmail).then(chats=>{

                if(chats.empty){
                    
                    Chat.create(meEmail, contactEmail).then(chat=>{
                        s(chat);
                    });
                }else{
                    chats.forEach(chat =>{
                        s(chat);
                    })
                }

            }).catch(err=>{
                console.error(err);
            });

        });

    }
}