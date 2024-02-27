import { Component , Input, OnInit} from '@angular/core';
import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [MatCardModule,
    CommonModule,
    MatCheckboxModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit{
  @Input() assignmentTransmis: Assignment|undefined;
  constructor() { }

  ngOnInit(): void {
  }

  onAssignmentRendu(){
    if(this.assignmentTransmis){
      this.assignmentTransmis.rendu = true;
    }
  }
}
