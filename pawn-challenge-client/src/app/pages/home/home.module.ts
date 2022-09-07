import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PlayChessComponent } from './components/play-chess/play-chess.component';
import { BattleWithComputerComponent } from './components/battle-with-computer/battle-with-computer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    PlayChessComponent,
    BattleWithComputerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
