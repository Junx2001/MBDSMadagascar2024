import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {  MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AssignmentsComponent } from './assignments/assignments.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatDividerModule,MatSlideToggleModule,
    AssignmentsComponent,
    RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';

  constructor(private authService: AuthService,
    private router:Router,
    private assignmentsService:AssignmentsService) { }

  login(){
    if(!this.authService.loggedIn){
      this.authService.logIn();
    }
    else{
      this.authService.logOut();
      this.router.navigate(["/home"]);
    }
  }

  genererBd()
  {
    //this.assignmentsService.peuplerBD();

    this.assignmentsService.peuplerBDavecForkJoin()
     .subscribe(() => {
       console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES,ON RE-AFFICHE LA LISTE");

	    window.location.reload();
     })


  }
}
