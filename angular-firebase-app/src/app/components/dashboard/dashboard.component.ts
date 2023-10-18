import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {AppComponent} from '../../app.component'
import { ImageService } from 'src/app/shared/services/image.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public imageService: ImageService ) {}
  ngOnInit(): void {
    console.log("dashbort");
    //this.imageService.listFiles();
  }
}