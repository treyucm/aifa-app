import { Component, OnInit, OnChanges, inject, ElementRef, ViewChild, HostListener } from '@angular/core';
import { ImageService } from '../shared/services/image.service';
import { AuthService } from '../shared/services/auth.service';
import { getStorage, ref, uploadBytesResumable, listAll, deleteObject, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, set} from 'firebase/database';
import { MatDialog} from '@angular/material/dialog'
import { ImageDetailComponent } from '../image-detail/image-detail.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


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
    public imageService: ImageService, 
    private authService: AuthService,
    private dialog : MatDialog,
  ){   
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTags.slice())),) 
  }

  private database = getDatabase();
  private storage = getStorage();
  imgList = [];
  deleteFile: any = {};
  allTags: string[] = ['stuff', 'more stuff', 'other', 'test','Tagged'];

  /*
    writes data to the realtime database using "set"
    
    parameters: 
    
    fileURL?, fileName, tags[]

    other data to be used

    date created, date last modified

  */

  writeUserData(){

    const tagArray = [];

    

    console.log("tags:" + tagArray);

    set(dbRef(this.database,'users/'+this.authService.userData.uid),{
      username: 'name1',
      email: 'email1',
      profile_picture : 'imageUrl1',  
    })

    
  }
  



  /*creates storage reference based on user data
    generates url list and builds html for gallery
    TODO: build html for gallery                  */
  listFiles(){
    const listRef = ref(this.storage,'users/' + "/" + this.authService.userData.uid);
    listAll(listRef).then((res) => {
      res.items.forEach((itemRef) => {
      // All the items under listRef.
        getDownloadURL(itemRef).then((downloadURL) => {
          //console.log('File available at ', downloadURL);
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
        deletefile: this.deleteFile,
        inputTags: this.allTags,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed');
    })
  }

  /*
    code for tags
  */
    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl = new FormControl('');
    filteredFruits: Observable<string[]>;
    fruits: string[] = ['Tagged'];
    //allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  
    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  
    announcer = inject(LiveAnnouncer);
  
    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
  
      // Add our fruit
      if (this.fruits.includes(value)) {
        console.log("caught");
      }else if(value){
        this.fruits.push(value);
        //this.allFruits.push(value);
        this.allTags.push(value);
      }
  
      // Clear the input value
      event.chipInput!.clear();
  
      this.fruitCtrl.setValue(null);
    }
    addTag(){
      var value = (<HTMLInputElement>document.getElementById('nameInput')).value;
      // Add tag
      if (this.fruits.includes(value)) {
       //change placeholder text to 'tag already exists' color: red
      }else if(value){
        this.fruits.push(value);
        this.allTags.push(value);

        //then clear nameInput and set placeholder 'add a tag!'
      }
      // Clear the input value
      //event.input.clear();
      //event.value = "";
  
      //this.fruitCtrl.setValue(null);
    }
    remove(fruit: string): void {
      const index = this.fruits.indexOf(fruit);
  
      if (index >= 0) {
        this.fruits.splice(index, 1);
  
        this.announcer.announce(`Removed ${fruit}`);
      }
    }
  
    selected(event: MatAutocompleteSelectedEvent): void {
      const value = (event.option.viewValue);
      if (this.fruits.includes(value)){
        console.log("caught")
      }else{
        this.fruits.push(event.option.viewValue);
      }
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.allTags.filter(fruit => fruit.toLowerCase().includes(filterValue));
    }

addChipForm(event) { 
        event.preventDefault(); 
        const nameInput = 
            (<HTMLInputElement>document.getElementById("nameInput")); 
        const name = 
            nameInput.value.trim();
        if (name !== "") { 
           

          // Use null if profile icon is empty 
          nameInput.value = ""; 
        }
};
//when the user clicks outside the modal, close the modal
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent){
  let modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// When the user clicks on the button, open the modal
displayModal(){
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
}

  ngOnInit(){
    this.listFiles()
  }
  ngOnChanges(){}
}
