import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { WorldVizComponent } from './world-viz/world-viz.component';
import { StateLevelComponent } from './state-level/state-level.component';
// import { BubbleGraphComponent } from './bubble-graph/bubble-graph.component';
import { LollipopClubComponent } from './lollipop-club/lollipop-club.component';
import { LineRatingComponent } from './line-rating/line-rating.component';
import { CircleNodeComponent } from './circle-node/circle-node.component';


@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    HelloWorldComponent,
    WorldVizComponent,
    StateLevelComponent,
    // BubbleGraphComponent,
    LollipopClubComponent,
    LineRatingComponent,
    CircleNodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
