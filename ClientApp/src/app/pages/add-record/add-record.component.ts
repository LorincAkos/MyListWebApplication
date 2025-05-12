import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-record',
  imports: [ReactiveFormsModule],
  templateUrl: './add-record.component.html',
  styleUrl: './add-record.component.scss'
})
export class AddRecordComponent {

  animeform = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]{3,20}$')
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 ]{3,50}$')
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.pattern('^[\\w\\s.,!?\'"-]{10,200}$')
    ])
  });

  isAnime = signal<boolean>(true);

  changeRecordType(){
    this.isAnime.set(!this.isAnime())
  }

   onAnimeSubmit() {
    if (this.animeform.valid) {
      const formData = this.animeform.value;
      console.log('Form Data:', formData);

      // You now have:
      // {
      //   name: '...',
      //   title: '...',
      //   description: '...'
      // }
    } else {
      console.warn('Form is invalid');
    }
  }
}
