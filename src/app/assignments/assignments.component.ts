import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';

import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';


import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';


import { OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-assignments',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RenduDirective,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    AssignmentDetailComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{
  titre = 'Ajour d\'un devoir';
  ajoutActive = false;
  nomDevoir:string = "";
  datedeRendu = undefined;

  assignmentSelectionne!:Assignment;


  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive = true;
    },2000);
  }

  onSubmit(){
    if(this.nomDevoir == '' || this.datedeRendu == undefined){
      return;
    }
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.datedeRendu = this.datedeRendu;
    newAssignment.rendu = false;

    this.assignments.push(newAssignment);
  }

  assignments:Assignment[] = [
    {
      nom : "Devoir Angular de  Michel Buffa",
      datedeRendu : new Date("2024-02-15"),
      rendu : false
    },
    {
      nom : "Devoir SQL3 de Serge Miranda",
      datedeRendu : new Date("2024-01-15"),
      rendu : true
    },
    {
      nom : "Devoir BD de Mr Gabriel Mopolo",
      datedeRendu : new Date("2024-03-01"),
      rendu : false
    }
  ]

  getColor(a:any){
    return a.rendu ? 'green' : 'red';
  }

  assignmentClique(assignment:Assignment){
    this.assignmentSelectionne = assignment;
  }
}
