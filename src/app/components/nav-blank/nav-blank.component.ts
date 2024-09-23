import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/service/authentication.service';

@Component({
    selector: 'app-nav-blank',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './nav-blank.component.html',
    styleUrl: './nav-blank.component.css',
})
export class NavBlankComponent {

    constructor(private _authenticationService: AuthenticationService) {}

    signOut(): void {
        this._authenticationService.signOut();
    }
}
