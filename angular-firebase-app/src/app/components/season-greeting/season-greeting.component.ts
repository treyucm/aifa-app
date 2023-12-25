import { Component } from '@angular/core';

@Component({
  selector: 'app-season-greeting',
  templateUrl: './season-greeting.component.html',
  styleUrls: ['./season-greeting.component.css']
})
export class SeasonGreetingComponent {
  public userName = "Test User";
  public ReadMore = false;
  public visible = false;
  ShowGif = {
    current: false,
  }
    onclick()
  {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }
}
