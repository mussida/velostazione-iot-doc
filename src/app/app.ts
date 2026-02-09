import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

export interface Section {
  name: string;
  route: string;
  subsections: Subsection[];
}

export interface Subsection {
  name: string;
  route: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'velostazione-iot-doc';

  sections: Section[] = [
    {
      name: '1.Introduzione',
      route: '',
      subsections: [],
    },
    {
      name: '2.Analisi del problema e requisiti',
      route: 'analisi-requisiti',
      subsections: [],
    },
    {
      name: '3.Architettura del sistema',
      route: 'architettura',
      subsections: [],
    },
    {
      name: '4.Progettazione hardware',
      route: 'progettazione-hardware',
      subsections: [],
    },
    {
      name: '5.Logica dei nodi IoT',
      route: 'firmware-nodi-iot',
      subsections: [],
    },
    {
      name: '6.Servizi sul Raspberry Pi',
      route: 'servizi-raspberry',
      subsections: [],
    },
    {
      name: '7.Backend Django e integrazione IoT',
      route: 'backend-django',
      subsections: [],
    },
    {
      name: '8.Frontend Angular e flusso utente',
      route: 'frontend-angular',
      subsections: [],
    },
    {
      name: '8.Discussione finale, analisi dei consumi e sviluppi futuri',
      route: 'analisi-consumi',
      subsections: [],
    },
    // {
    //   name: '10.Flusso di lavoro end-to-end',
    //   route: 'flusso-end-to-end',
    //   subsections: [],
    // },
    // {
    //   name: '11.Discussione e sviluppi futuri',
    //   route: 'sviluppi-futuri',
    //   subsections: [],
    // },
    {
      name: '12.Appendice',
      route: 'appendice',
      subsections: [],
    }
  ];
}
