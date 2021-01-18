import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { PetComponent } from './pet/pet.component';

@NgModule({
  declarations: [GameComponent, PetComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
