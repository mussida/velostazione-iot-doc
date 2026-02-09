import { Routes } from '@angular/router';
import { IntroductionComponent } from './pages/introduzione/introduzione';
import { RequirementsAnalysisComponent } from './pages/requirements-analysis-component/requirements-analysis-component';
import { SystemArchitectureComponent } from './pages/system-architecture-component/system-architecture-component';
import { HardwareDesignComponent } from './pages/hardware-design-component/hardware-design-component';
import { IotFirmwareComponent } from './pages/iot-firmware-component/iot-firmware-component';
import { RaspberryServicesComponent } from './pages/raspberry-services-component/raspberry-services-component';
import { DjangoBackendComponent } from './pages/django-backend-component/django-backend-component';
import { DiscussionFutureComponent } from './pages/discussion-future-component/discussion-future-component';
import { AngularFrontendComponent } from './pages/angular-frontend-component/angular-frontend-component';
import { EndToEndWorkflowComponent } from './pages/end-to-end-workflow-component/end-to-end-workflow-component';
import { AppendixComponent } from './pages/appendix-component/appendix-component';
import { EnergyAnalysisComponent } from './pages/energy-analysis-component/energy-analysis-component';

export const routes: Routes = [
  {
    path: '',
    component: IntroductionComponent,
    pathMatch: 'full',
  },
  {
    path: 'analisi-requisiti',
    component: RequirementsAnalysisComponent,
  },
  {
    path: 'architettura',
    component: SystemArchitectureComponent,
  },
  {
    path: 'progettazione-hardware',
    component: HardwareDesignComponent,
  },
  {
    path: 'firmware-nodi-iot',
    component: IotFirmwareComponent,
  },
  {
    path: 'servizi-raspberry',
    component: RaspberryServicesComponent,
  },
  {
    path: 'backend-django',
    component: DjangoBackendComponent,
  },
  {
    path: 'frontend-angular',
    component: AngularFrontendComponent,
  },
  {
    path: 'analisi-consumi',
    component: EnergyAnalysisComponent,
  },
//   {
//     path: 'flusso-end-to-end',
//     component: EndToEndWorkflowComponent,
//   },
//   {
//     path: 'sviluppi-futuri',
//     component: DiscussionFutureComponent,
//   },
  {
    path:'appendice',
    component: AppendixComponent
  }
];
