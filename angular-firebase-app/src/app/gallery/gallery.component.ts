import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../shared/services/image.service';
import { Observable } from 'rxjs';
import { GalleryImage } from '../shared/models/galleryImage.model'; 
import { AuthService } from '../shared/services/auth.service';
import { getStorage, ref, uploadBytesResumable, listAll, deleteObject } from "firebase/storage";
import { getDownloadURL } from "@angular/fire/storage";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  //images: Observable<GalleryImage[]>;

  constructor(public imageService: ImageService, private authService: AuthService){ }
  public generateGallery : boolean;
  private storage = getStorage();
  public imgList = [];
  private canGenerateGallery:boolean;

  galleryBuild(){
    //this.imageService.listFiles();
    console.log("initialized~!")

    //console.log(this.imageService.imgList);
    var gallery: HTMLElement = document.querySelector('#gallery');
    var getVal = function (elem : HTMLElement, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
    var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
    var resizeAll = function () {
      var altura = getVal(gallery, 'grid-auto-rows');
      var gap = getVal(gallery, 'grid-row-gap');
      gallery.querySelectorAll('.gallery-item').forEach(function (item:HTMLElement) {
        var el: HTMLElement = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
      });
    };
    gallery.querySelectorAll('img').forEach(function (item) {
      item.classList.add('byebye');
      if (item.complete) {
        console.log(item.src);
      }
      else {
        item.addEventListener('load', function () {
            var altura = getVal(gallery, 'grid-auto-rows');
            var gap = getVal(gallery, 'grid-row-gap');
            var gitem = item.parentElement.parentElement;
            gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
            item.classList.remove('byebye');
        });
      }
    });
    window.addEventListener('resize', resizeAll);
    //gallery.querySelectorAll('.gallery-item').forEach(function (item) {
     // item.addEventListener('click', function () {        
    //    item.classList.toggle('full');        
    //  });
   // });
  }
  createFlag(){
    //console.log(this.imageService.canGenerateGallery)
    if(this.imageService.canGenerateGallery == true || this.imageService.canGenerateGallery != undefined){
      console.log('resetting...');
      setTimeout(this.createFlag, 1000);
      
    }else if(this.imageService.canGenerateGallery == undefined || this.imageService.canGenerateGallery == false){
      
      console.log('resetting...');
      setTimeout(this.createFlag, 1000);
    }
  }
  listFiles(){
    const listRef = ref(this.storage,'users/' + "/" + this.authService.userData.uid);
    //this.canGenerateGallery = false;
    listAll(listRef)
  .then((res) => {

    console.log(res.items.length);
    /*res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
      //listAll(folderRef);
    });*/
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      
        getDownloadURL(itemRef).then((downloadURL) => {
          console.log('File available at ', downloadURL);
          this.imgList.push(downloadURL);
          if(res.items.length == this.imgList.length){
            this.canGenerateGallery = true;
            console.log("gallery ready!" + this.canGenerateGallery)
            this.galleryBuild();
          }
            //this.gallery.galleryBuild();
        });      
    });
    //console.log("returning..." + this.imgList[0]);
    //return this.imgList;
  })
  .catch((error) => {
    // Uh-oh, an error occurred!
  });
}
  ngOnInit(){

    //this.images = this.imageService.getImages();
    //this.imageService.getImages();
    //console.log("gallery")
    //this.imageService.listFiles();
    this.listFiles();
   
    //this.createFlag();
  }
  ngOnChanges(){
    //this.images = this.imageService.getImages();
    //this.imageService.listFiles();
    //this.galleryBuild();
  }
}
