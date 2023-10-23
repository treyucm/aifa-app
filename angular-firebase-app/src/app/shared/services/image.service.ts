import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, listAll, deleteObject } from "firebase/storage";
import { getDownloadURL } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { FirebaseApp, FirebaseError } from '@angular/fire/app';
import 'firebase/storage';
import { GalleryImage } from '../models/galleryImage.model';
import { AuthService } from './auth.service';
import { LOCATION_INITIALIZED } from '@angular/common';

//import * as firebase from 'firebase/';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private uid: string;

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
  public deleteFile: any = {};
  private fileExists: boolean;
  private canCreate: boolean;
  //private storageRef = ref(this.storage,'users/' + "/" + this.authService.userData.uid + "/"+this.file.name);
  //private deleteRef = ref(this.storage,'users/' + "/" + this.authService.userData.uid + "/"+this.deleteFile.name)
  //private listRef = ref(this.storage,'users/' + "/" + this.authService.userData.uid);

  imageDetails() {
    //console.log(this.storage);
    //return this.db.list('uploads').valueChanges();
    //let dialogRef = dialog.
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
  async onFileChange(event:any){
    this.file = event.target.files[0]
    //console.log(this.file);
    await this.getImageUrl();
    if(this.fileExists == false){
      this.canCreate = true;
    }else if(this.fileExists == true){
      this.canCreate = false;
      //console.log(this.canCreate)
    }
  }
  async getImageUrl() {
    try{
      const storageRef = ref(this.storage,'users/' + "/" + this.authService.userData.uid + "/"+this.file.name);
      const checkURL = await getDownloadURL(storageRef);
      this.fileExists = true;
      return checkURL;
    }catch(e){
      (e as FirebaseError).code == 'object-not-found'
        ? console.log('$category has no image for $imageId')
        : console.log('Error fetching image: $e');
        return this.fileExists = false;
    }
  }
  ngOnInit(){
    console.log("reinitializing...?")
  }

  deleteData(event:any){
    this.deleteFile = event.target.src;
    var deleteRef = ref(this.storage, this.deleteFile)
    console.log("deleting " + this.deleteFile)
    
    const deleteTask = deleteObject(deleteRef)
    deleteTask.then((deletedFile) => {
      console.log(deletedFile +' deleted')
      location.reload();
    }).catch((error)=>{
      console.log("error occurred");
    })
  }


  addData(){
    if(this.canCreate === true){
      console.log(this.canCreate + "uploading...")
      const storageRef = ref(this.storage,'users/' + "/" + this.authService.userData.uid + "/"+this.file.name);
      const uploadTask = uploadBytesResumable(storageRef, this.file);

      uploadTask.then((snapshot) => {
        location.reload();
      })

      /*uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      () => {
        console.log("upload success..")
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          location.reload();
        });
      });*/
    }else if(this.canCreate === false){
      console.log("Could not upload...");
    }else{
      console.log("data uninitialized")
    }
  }
}
