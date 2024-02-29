import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { bdInitialAssignments } from './data';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private logginService:LoggingService,
    private http:HttpClient) { }

  //uri = 'http://localhost:8010/api/assignments';
  uri = 'https://m2-buffa-nodeapi.onrender.com/api/assignments';

  assignments:Assignment[] = [];

  // getAssignments():Observable<Assignment[]> {
  //   return this.http.get<Assignment[]>(this.uri);
  // }

  getAssignmentsPagines(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.uri+ "?page=" + page + "&limit=" + limit);
  }


  getAssignement(id:number):Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.uri + '/' + id);
    // .pipe(
    //   map(a => {
    //     a.nom += " recu et transformé avec un pipe ...";
    //     return a;
    //   }),
    //   tap(_ => {
    //     console.log("tap: assignment avec id = "+id+" requete GET envoyée sur MongoDB Cloud");
    //   }),
    //   catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    // )


    //const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    //return of(a);
  }

//   private handleError<T>(operation: any, result?: T) {
//     return (error: any): Observable<T> => {
//       console.log(error); // pour afficher dans la console
//       console.log(operation + ' a échoué ' + error.message);

//       return of(result as T);
//     }
//  };


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

  peuplerBD(){
    bdInitialAssignments.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignments(nouvelAssignment).subscribe(() => {
        console.log("Assignment"+ nouvelAssignment.nom +" ajouté dans la BD !");
      });
    });
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignments(nouvelAssignment))
    });

    return forkJoin(appelsVersAddAssignment);
  }

}
