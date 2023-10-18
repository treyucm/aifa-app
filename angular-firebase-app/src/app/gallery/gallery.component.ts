import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../shared/services/image.service';
import { Observable } from 'rxjs';
import { GalleryImage } from '../shared/models/galleryImage.model'; 

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {

  //images: Observable<GalleryImage[]>;

  constructor(public imageService: ImageService){}

  ngOnInit(){

    //this.images = this.imageService.getImages();
    //this.imageService.getImages();
    //console.log("gallery")
    this.imageService.listFiles();

  }
  ngOnChanges(){
    //this.images = this.imageService.getImages();
    //this.imageService.listFiles();
  }
}
