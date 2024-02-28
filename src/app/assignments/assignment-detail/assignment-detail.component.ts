import { Component , Input, OnInit} from '@angular/core';
import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';


import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [MatCardModule,
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit{
  /*@Input()*/ assignmentTransmis: Assignment|undefined;

  constructor(private assignmentService:AssignmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // Pour récuperer les queryParams
    console.log(this.route.snapshot.queryParams);

    // Pour récuperer les fragments
    console.log(this.route.snapshot.fragment);
    this.getAssignment();
  }

  onAssignmentRendu(){
    if(this.assignmentTransmis){
      //this.assignmentTransmis.rendu = true;
      this.assignmentService.updateAssignment(this.assignmentTransmis).subscribe(message =>{
        console.log(message);
        this.router.navigate(['/home']);

      });

    }
  }
  onDeleteBtnClick()
  {
    // if(this.assignmentTransmis){
    //   this.deleteAssignment.emit(this.assignmentTransmis);
    //   this.assignmentTransmis = undefined;
    // }
    if(this.assignmentTransmis){
      this.assignmentService.deleteAssignment(this.assignmentTransmis).subscribe(message =>{
        console.log(message);
         // this.assignmentTransmis = undefined;
         this.router.navigate(['/home']);
      });

    }
  }

  getAssignment(){
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignement(id)
    .subscribe(a => this.assignmentTransmis = a);
  }
}
