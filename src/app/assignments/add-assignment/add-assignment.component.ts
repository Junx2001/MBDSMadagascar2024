import { Component, EventEmitter, Output, OnInit } from '@angular/core';
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
  @Output() nouvelAssignment = new EventEmitter<Assignment>();

  titre = 'Ajout d\'un devoir';
  ajoutActive = false;
  nomDevoir:string = "";
  datedeRendu = undefined;

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

    //this.assignments.push(newAssignment);
    this.nouvelAssignment.emit(newAssignment);
  }

  returnToList(){

  }


}
