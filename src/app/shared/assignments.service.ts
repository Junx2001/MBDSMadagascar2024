import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs';}
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
    return this.http.get<Assignment>(this.uri + '/' + id)
    .pipe(
      map(a => {
      a.nom += "MODIFIE PAR LE PIPE";
      return a;

    }));

    //const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    //return of(a);
  }

  addAssignments(assignment:Assignment):Observable<any> {
    // this.assignments.push(assignment);
    this.logginService.log(assignment.nom, "Ajouté");
    // return of("Assignment ajouté");
    return this.http.post(this.uri, assignment);

  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // const index = this.assignments.findIndex(a => a === assignment);

    // this.assignments[index].rendu = true;
    this.logginService.log(assignment.nom, "Modifié");

    // return of("Assignment rendu (Modifié)");
    return this.http.put(this.uri, assignment);

  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    // let pos = this.assignments.indexOf(assignment);
    // this.assignments.splice(pos, 1);

    this.logginService.log(assignment.nom, "Supprimé");
    //return of("Assignment service : assignment supprimé !");
    return this.http.delete(this.uri + '/' + assignment._id);
  }
}
