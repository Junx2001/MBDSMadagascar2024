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
import { MatSliderModule } from '@angular/material/slider';
import { RouterLink } from '@angular/router';
import {MatTable, MatTableModule} from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';



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
    MatTableModule,
    MatTable,
    RouterLink,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    MatSliderModule,
    MatPaginatorModule,],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{
  assignmentSelectionne!:Assignment;
  formVisible = false;
  assignments: Assignment[] = [];

  //Pagination
  page = 1;
  limit = 10;
  totalDocs!:number;
  totalPages!:number;
  nextPage!:number;
  prevPage!:number;
  hasNextPage!:boolean;
  hasPrevPage!:boolean;

  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];



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
  // onNouvelAssignment(newAssignment:Assignment){
  //   //this.assignments.push(newAssignment);
  //   this.assignmentService.addAssignments(newAssignment).subscribe(message =>
  //     console.log(message));
  //   this.formVisible = false;
  // }

  getAssignments(){
    this.assignmentService.getAssignmentsPagines(this.page, this.limit)
    .subscribe(data => {
      console.log("Données Arrivées");
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
    });

    console.log("Requete Envoyées");

  }

  pagePrecedente(){
    this.page = this.prevPage;
    this.getAssignments();
  }
  pageSuivante(){
    this.page = this.nextPage;
    this.getAssignments();
  }

  premierePage(){
    this.page = 1;
    this.getAssignments();
  }
  dernierePage(){
    this.page = this.totalPages;
    this.getAssignments();
  }

  handlePageEvent(event: PageEvent){
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignments();
  }


}
