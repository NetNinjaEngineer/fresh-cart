import { Component } from '@angular/core';
import { NavAuthComponent } from '../../components/nav-auth/nav-auth.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [
        NavAuthComponent,
        RouterOutlet,
        FooterComponent,
        CommonModule
    ],
    templateUrl: './auth-layout.component.html',
    styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
