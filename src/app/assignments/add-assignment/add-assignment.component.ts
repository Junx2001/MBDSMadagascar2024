import { Component, /*EventEmitter, Output,*/ OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatButtonModule

  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent implements OnInit {
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();

  constructor(private assignmentService:AssignmentsService,
    private router: Router) { }

  titre = 'Ajout d\'un devoir';
  ajoutActive = false;
  nomDevoir:string = "";
  dateDeRendu = undefined;

  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive = true;
    },2000);
  }

  onSubmit(){
    if(this.nomDevoir == '' || this.dateDeRendu == undefined){
      return;
    }
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 10000) + 1;
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    //this.assignments.push(newAssignment);
    //.nouvelAssignment.emit(newAssignment);
    this.assignmentService.addAssignments(newAssignment).subscribe(message =>{
      console.log(message);
      this.router.navigate(['/home']);
    });



  }



}
