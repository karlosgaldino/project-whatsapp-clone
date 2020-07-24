import {Firebase} from '../util/Firebase';
import { Model } from './Model';

export class User extends Model{

    constructor(id){

        super();

        if(id){
            this.getById(id);
        }
    }

    get name(){
        return this._data.name;
    }

    set name(value){
        this._data.name = value;
    }

    get email(){
        return this._data.email;
    }

    set email(value){
        this._data.email = value;
    }

    get photo(){
        return this._data.photo;
    }

    set photo(value){
        this._data.photo = value;
    }

    static getContactRef(id){
        User.getRef().doc(id).collection('contacts');
    }

    static getRef(){
        return Firebase.db().collection('/users');
    }

    static findbyEmail(email){
        return User.getRef().doc(email);
    }

    getById(id){

        return new Promise((s,f)=>{

          User.getRef().doc(id).onSnapshot(doc=>{

              this.fromJSON(doc.data());
              s(doc);

          })

            
        });
    }

    save(){
        return User.findbyEmail(this.email).set(this.toJSON());
    }

    addContact(contact){
        return User.getContactRef(this.email).doc(btoa(contact.email)).set(contact.toJSON());
    }

    getContacts(){

        return new Promise((s,f)=>{

            User.getRef().doc(this.email).collection('contacts').onSnapshot(docs => {

                let contacts = [];

                docs.forEach(doc=>{
                    let data = doc.data();
                    data.id = doc.id
                    contacts.push(data);
                });

                this.trigger('contactschange', docs);
                s(contacts);
            });
        });
    }

  
}