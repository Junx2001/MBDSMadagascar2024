import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';

import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';


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
import { AssignmentsService } from '../shared/assignments.service';

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
    AssignmentDetailComponent,
    AddAssignmentComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{
  assignmentSelectionne!:Assignment;
  formVisible = false;
  assignments: Assignment[] = [];

  constructor(private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
    this.getAssignments();
  }

  getColor(a:any){
    return a.rendu ? 'green' : 'red';
  }

  assignmentClique(assignment:Assignment){
    this.assignmentSelectionne = assignment;
  }
  onAddAssignementBtnClick(){
    this.formVisible = true;
  }
  onNouvelAssignment(newAssignment:Assignment){
    //this.assignments.push(newAssignment);
    this.assignmentService.addAssignments(newAssignment).subscribe(message =>
      console.log(message));
    this.formVisible = false;
  }
  onDeleteAssignment(assignmentToDelete:Assignment){
    // this.assignments = this.assignments.filter(a => a !== assignmentToDelete);
    this.assignmentService.deleteAssignment(assignmentToDelete).subscribe(message =>
      console.log(message));

  }

  getAssignments(){
    this.assignmentService.getAssignments()
    .subscribe(assignments => this.assignments = assignments);
  }

}
