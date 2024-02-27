import { Component , EventEmitter, Input, Output, OnInit} from '@angular/core';
import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';


import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [MatCardModule,
    CommonModule,
    MatCheckboxModule,
    MatButtonModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit{
  @Input() assignmentTransmis: Assignment|undefined;
  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor(private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
  }

  onAssignmentRendu(){
    if(this.assignmentTransmis){
      //this.assignmentTransmis.rendu = true;
      this.assignmentService.updateAssignment(this.assignmentTransmis).subscribe(message =>
        console.log(message));
    }
  }
  onDeleteBtnClick()
  {
    if(this.assignmentTransmis){
      this.deleteAssignment.emit(this.assignmentTransmis);
      this.assignmentTransmis = undefined;
    }
  }
}
