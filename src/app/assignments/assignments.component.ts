import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  titre = 'Liste des assignements (vide pour le moment)';

  assignments = [
    {
      nom : "Devoir Angular de  Michel Buffa",
      datedeRendu : "2024-02-15",
      rendu : false
    },
    {
      nom : "Devoir SQL3 de Serge Miranda",
      datedeRendu : "2024-01-15",
      rendu : true
    },
    {
      nom : "Devoir BD de Mr Gabriel Mopolo",
      datedeRendu : "2024-03-01",
      rendu : false
    }
  ]
}
