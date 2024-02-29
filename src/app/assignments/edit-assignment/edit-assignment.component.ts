import { AssignmentsService } from './../../shared/assignments.service';
import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
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
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css'
})
export class EditAssignmentComponent implements OnInit{
  assignment: Assignment|undefined;

  // Pour les champs de formulaire
  nomAssignment: string = '';
  dateDeRendu?:Date = undefined;


  constructor(private assignmentsService:AssignmentsService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignement(id)
    .subscribe( (assignment) => {
      this.assignment = assignment;

      if(assignment !== undefined){
        this.nomAssignment = assignment.nom; // Add null check here
        this.dateDeRendu = assignment.dateDeRendu; // Add null check here
      }
    });


    }


  onSaveAssignment(){
    if (!this.assignment) return;
    if (!this.nomAssignment || this.dateDeRendu === undefined) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }

  }

