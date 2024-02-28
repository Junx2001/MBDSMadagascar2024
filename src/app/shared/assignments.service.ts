import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private logginService:LoggingService) { }

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

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignments(assignment:Assignment):Observable<string> {
    this.assignments.push(assignment);
    this.logginService.log(assignment.nom, "Ajouté");
    return of("Assignment ajouté");
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    const index = this.assignments.findIndex(a => a === assignment);

    this.assignments[index].rendu = true;
    this.logginService.log(assignment.nom, "Modifié");

    return of("Assignment rendu (Modifié)");
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    //this.assignments = this.assignments.filter(a => a !== assignment);
    this.logginService.log(assignment.nom, "Supprimé");
    return of("Assignment service : assignment supprimé !");
  }
}
