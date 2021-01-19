import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetRoutingModule } from './pet-routing.module';
import { PetComponent } from './pet.component';
import { CriarPetComponent } from './criar-pet/criar-pet.component';

@NgModule({
  declarations: [PetComponent, CriarPetComponent,],
  imports: [
    CommonModule,
    PetRoutingModule
  ]
})
export class PetModule { }
