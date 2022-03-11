import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { WorldVizComponent } from './world-viz/world-viz.component';
import { StateLevelComponent } from './state-level/state-level.component';
// import { BubbleGraphComponent } from './bubble-graph/bubble-graph.component';
import { LollipopClubComponent } from './lollipop-club/lollipop-club.component';
import { LineRatingComponent } from './line-rating/line-rating.component';
import { CircleNodeComponent } from './circle-node/circle-node.component';


import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { TopPlayersComponent } from './top-players/top-players.component';
import { HttpClientModule } from "@angular/common/http";
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { GoogleChartsModule } from 'angular-google-charts';



@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    HelloWorldComponent,
    WorldVizComponent,
    StateLevelComponent,
    TopPlayersComponent,
    // BubbleGraphComponent,
    LollipopClubComponent,
    LineRatingComponent,
    CircleNodeComponent
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
