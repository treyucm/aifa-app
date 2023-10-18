import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, listAll } from "firebase/storage";
import { getDownloadURL } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { FirebaseApp } from '@angular/fire/app';
import 'firebase/storage';
import { GalleryImage } from '../models/galleryImage.model';
import { AuthService } from './auth.service';
//import * as firebase from 'firebase/';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public uid: string;

  constructor( private afAuth: AngularFireAuth, private db: AngularFireDatabase, private authService: AuthService ) {
    this.afAuth.authState.subscribe(auth => {
      if(auth !== undefined && auth !== null ){
        this.uid = auth.uid;
      }
    });
  }
  
  public imgList: any = [];
  public storage = getStorage();
  public file: any = {};


  getImages() {
    //console.log(this.storage);
    //return this.db.list('uploads').valueChanges();
    console.log("simple test getImages");
  }


  listFiles(){
      const listRef = ref(this.storage,'users/' + "/" + this.authService.userData.uid);
      listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        listAll(folderRef);
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
          getDownloadURL(itemRef).then((downloadURL) => {
            console.log('File available at ', downloadURL);
            this.imgList.push(downloadURL);
          });      
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
   // })
    /*
    console.log(this.uid);
    const listRef = ref(this.storage,'users/' + "/" + this.uid);
    console.log('listfiles test2')
    console.log(listRef)
    listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        listAll(folderRef);
        console.log("quick test... 1 " + folderRef);
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        //if(){
          console.log("quick test... + " + itemRef);
          getDownloadURL(itemRef).then((downloadURL) => {
            console.log('File available at ', downloadURL);
            //const img = document.getElementById('test');
            //img.setAttribute('src', downloadURL);
            this.imgList.push(downloadURL);
            //console.log(this.imgList);
          });  
        //}      
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
    */
  }

  onFileChange(event:any){
    this.file = event.target.files[0]
    console.log(this.file);
    /*if(file){
      console.log(file);
      const path = 'yt/${file.name}'
      const uploadTask = await this.storage.upload(path,file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);
    }*/
  }
  addData(){
    const storageRef = ref(this.storage, 'users/' + this.uid + "/"+this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
   // for(var i = 0; i < this.imgList.length; i++){
     //   if (){

     //   }
    //}
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      
      });
    })
    
  }



}
