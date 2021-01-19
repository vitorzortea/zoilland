import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriarPetComponent } from './criar-pet/criar-pet.component';
import { PetComponent } from './pet.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'novo-pet'
  },
  {
    path: '',
    component: PetComponent,
    children: [
      {
        path: 'novo-pet',
        component: CriarPetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetRoutingModule { }
