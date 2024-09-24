import { Component } from '@angular/core';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-blank-layout',
    standalone: true,
    imports: [
        NavBlankComponent,
        RouterOutlet,
        FooterComponent,
        CommonModule
    ],
    templateUrl: './blank-layout.component.html',
    styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {


    goToUp() {
        window.scrollTo({
            behavior: 'smooth',
            top: 0,

        })
    }

}
