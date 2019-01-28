import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadAudioComponent } from "./load-audio/load-audio.component";

const routes: Routes = [
    {path:'', component: LoadAudioComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LooperRoutingModule {}