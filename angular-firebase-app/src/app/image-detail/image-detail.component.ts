import { Component, Inject, OnInit, inject,ElementRef, ViewChild, } from '@angular/core';
import { ImageService } from '../shared/services/image.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent,} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Fruit{
  name: string;
}

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



    TODO: 11.21

      replace this entire component with vanilla js modal
      because it will be less headache to deal with the data
  */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public imageService: ImageService){
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.data.inputTags.slice())),
    )
  }

  public pointerImg = this.data.deletefile;

  ngOnInit(){
    console.log(this.data.deletefile);
  }
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (this.fruits.includes(value)) {
      console.log("caught");
    }else if(value){
      this.fruits.push(value);
      this.allFruits.push(value);
      this.data.inputTags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
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

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }


  closeDialog(){

  }

}
