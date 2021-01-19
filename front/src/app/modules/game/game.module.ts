import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { PetComponent } from './pet/pet.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [GameComponent, PetComponent, MenuComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
