import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
   selector: 'app-settings',
   templateUrl: './settings.component.html',
   standalone: true,
   imports: [
      CommonModule,
      RouterLink,
      RouterLinkActive,
      RouterOutlet
   ],
   styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

}
