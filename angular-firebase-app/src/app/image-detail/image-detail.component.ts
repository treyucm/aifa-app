import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef, MatDialog} from '@angular/material/dialog'
import { ImageService } from '../shared/services/image.service';
@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent {

  constructor(public imageService: ImageService){}

  


}
