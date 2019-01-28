import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { BeatsContainerComponent } from '../beats/beats-container/beats-container.component';
import { BarsContainerComponent } from '../bars/bars-container/bars-container.component';
import { CallabContainerComponent } from '../callab/callab-container/callab-container.component';

const routes: Routes = [
  {path:'', component: ContainerComponent, children: [
    { path: 'bars', component: BarsContainerComponent },
    { path: 'beats', component: BeatsContainerComponent },
    { path: 'callaboz', component: CallabContainerComponent },
    { path:"loops", loadChildren: '../looper/looper.module#LooperModule' },
    { path:'', redirectTo:'beats', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }