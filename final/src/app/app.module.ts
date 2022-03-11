import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PieComponent } from './pie/pie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WorldVizComponent } from './world-viz/world-viz.component';
import { StateLevelComponent } from './age-viz/state-level.component';
import { LollipopClubComponent } from './lollipop-club/lollipop-club.component';


import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { TopPlayersComponent } from './top-players/top-players.component';
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    
    PieComponent,
    WorldVizComponent,
    StateLevelComponent,
    TopPlayersComponent,
    // BubbleGraphComponent,
    LollipopClubComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    Ng2GoogleChartsModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
