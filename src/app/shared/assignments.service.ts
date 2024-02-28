import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private logginService:LoggingService,
    private http:HttpClient) { }

  uri = 'http://localhost:8010/api/assignments';

  assignments:Assignment[] = [];

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignement(id:number):Observable<Assignment | undefined> {
    const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    return of(a);
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
