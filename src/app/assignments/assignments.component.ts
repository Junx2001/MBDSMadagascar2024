import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';


import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RenduDirective,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{
  titre = 'Liste des assignements (vide pour le moment)';
  ajoutActive = false;
  nomDevoir:string = "";
  datedeRendu:Date = new Date();




  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive = true;
    },2000);
  }

  onSubmit(){
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
}
