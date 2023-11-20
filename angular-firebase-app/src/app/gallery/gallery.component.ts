import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../shared/services/image.service';
import { AuthService } from '../shared/services/auth.service';
import { getStorage, ref, uploadBytesResumable, listAll, deleteObject, getDownloadURL } from "firebase/storage";
import { MatDialog} from '@angular/material/dialog'
import { ImageDetailComponent } from '../image-detail/image-detail.component';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  
})
export class GalleryComponent {

  /*
  Displays images from firebase storage

  methods:             uses:                 globals: 
  onInit():             
    listFiles()         getDownloadURL        imgList[]; array for URLs  

  imageDetails()        MatDialog             deleteFile{}; URL of a clicked image
  
  to add:
  deleteData()        
  addData()

  */
  constructor(
    imageService: ImageService, 
    private authService: AuthService,
    private dialog : MatDialog,
  ){ }

  private databaseConfig ={
    databaseURL: 'https://fir-app-demo-acd72-default-rtdb.firebaseio.com',
  };
  private storage = getStorage();
  imgList = [];
  deleteFile: any = {};

  //writeUserData(){
    //  set(ref_database(this.database,'users/XLTngMhS5zQnPw3F2LOTkxf6w5n2'),{
    //    username: 'trey',
    //    email: 'testing',
    //    profilePicture: 'url'
    //  })
  // }
  
  /*creates storage reference based on user data
    generates url list and builds html for gallery
    TODO: build html for gallery                  */
  listFiles(){
    const listRef = ref(this.storage,'users/' + "/" + this.authService.userData.uid);
    listAll(listRef).then((res) => {
      res.items.forEach((itemRef) => {
      // All the items under listRef.
        getDownloadURL(itemRef).then((downloadURL) => {
          console.log('File available at ', downloadURL);
          this.imgList.push(downloadURL);
        });      
      });
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  }
  /*
    opens image detail component in matDialog
    sends matDialogData

    todo
    receive back changed matDialogData
    update database and storage
    needs encapsulation?
  */
  imageDetails(event) {
    this.deleteFile = event.target.src;
    const imageSize = event.target.imageHeight;
    const testWidth = event.target.imageWidth;
    let dialogRef = this.dialog.open(ImageDetailComponent, {
      height: imageSize,
      width: testWidth,
      maxHeight: '90vh',
      maxWidth: '90vw',
      hasBackdrop: true,
      backdropClass: 'image-details',
      data:{
        deletefile: this.deleteFile
      }
    }).beforeClosed()
  }
  ngOnInit(){
    this.listFiles()
  }
  ngOnChanges(){}
}
