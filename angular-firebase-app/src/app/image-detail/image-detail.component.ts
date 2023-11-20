import { Component, Inject, OnInit } from '@angular/core';
import { ImageService } from '../shared/services/image.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent {
  /*
    component called in a mat dialog
    onClick on an image in gallery-component

    uses mat dialog data

    onInit, sets a pointer to the image
  */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public imageService: ImageService){}

  public pointerImg = this.data.deletefile;

  ngOnInit(){
    console.log(this.data.deletefile);
  }
}
