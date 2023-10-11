import { Component, inject } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage"
import { Storage, getDownloadURL } from "@angular/fire/storage";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";


import 'firebase/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-firebase-app';
  
  public storage = getStorage();
  //const storageRef = 
  public file: any = {};
  //private storage: Storage = inject(Storage);
  constructor(){
  }

  onFileChange(event:any){
    //const storageRef = firebase.storage.ref();

    
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

    console.log("button clicked!")
    const storageRef = ref(this.storage, this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
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
      }
    )
    
    }


}
