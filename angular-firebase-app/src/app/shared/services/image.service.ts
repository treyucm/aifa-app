import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, listAll, deleteObject } from "firebase/storage";
import { AngularFireDatabase } from '@angular/fire/compat/database'
import 'firebase/storage';
import { AuthService } from './auth.service';
import { MatDialog} from '@angular/material/dialog'

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor( 
    private db: AngularFireDatabase, 
    private authService: AuthService, 
    public dialog: MatDialog,
  ){};
  
  public storage = getStorage();
  private file:File;
  public deleteFile: any = {};
  private canCreate: boolean;
  public canGenerateGallery: boolean;

  onFileChange(event){
    this.file = event.target.files[0];
    this.canCreate = true;
  }
  deleteData(event:any){
    if(window.confirm('Are sure you want to delete this item ?')){
      const deleteRef = ref(this.storage, this.deleteFile)
      const deleteTask = deleteObject(deleteRef)
      deleteTask.then((deletedFile) => {
        console.log(deletedFile +' deleted')
        location.reload();
      }).catch((error)=>{
        console.log("error occurred");
      })
     }
  }
  addData(){
    if(this.canCreate === true){
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
