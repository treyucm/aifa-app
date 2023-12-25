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
  public giphySrc = "https://giphy.com/embed/R7AW255ijTdV6";
  public giphyUrl = "https://giphy.com/gifs/cat-christmas-fat-R7AW255ijTdV6";

  
  public giphySrcArr = 
  ["https://giphy.com/embed/phmwMLY1kkkMg","https://giphy.com/embed/R7AW255ijTdV6","https://giphy.com/embed/SrAO8XBZ7mPSWzpERP",
  "https://giphy.com/embed/gVsmn4qdyBn1Bra2tN","https://giphy.com/embed/MY0g7HALk3laTr5rXw","https://giphy.com/embed/V39CvtftZIveg",
  "https://giphy.com/embed/xHyPHDECU0G4UjCVqb","https://giphy.com/embed/3kzrzzQXUfI6bmUNf3","https://giphy.com/embed/l3vRkS8dP411iHQu4"] 

  public giphyUrlArr =
  ["https://giphy.com/gifs/christmas-winter-phmwMLY1kkkMg","https://giphy.com/gifs/cat-christmas-fat-R7AW255ijTdV6","https://giphy.com/gifs/tonrakht-cat-cute-beluga-SrAO8XBZ7mPSWzpERP",
"https://giphy.com/gifs/unscreen-cat-cats-kitty-gVsmn4qdyBn1Bra2tN","https://giphy.com/gifs/moodman-holidays-lit-lets-get-MY0g7HALk3laTr5rXw","https://giphy.com/gifs/christmas-santa-animation-V39CvtftZIveg",
"https://giphy.com/gifs/sylterinselliebe-navidad-merry-xmas-weihnachtskugel-xHyPHDECU0G4UjCVqb","https://giphy.com/gifs/dancing-fortnite-ginger-gunner-3kzrzzQXUfI6bmUNf3","https://giphy.com/gifs/hallmarkecards-animation-animated-l3vRkS8dP411iHQu4"]




  ShowGif = {
    current: false,
  }
    onclick()
  {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
    var randomNumber = Math.floor(Math.random() * 10);

    this.giphySrc = this.giphySrcArr[randomNumber];
    this.giphyUrl = this.giphyUrlArr[randomNumber];
    
  }
}
