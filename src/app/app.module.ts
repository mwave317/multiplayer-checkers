import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckerboardComponent } from './components/checkerboard/checkerboard.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserOptionsComponent } from './components/user-options/user-options.component';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    CheckerboardComponent,
    HeaderComponent,
    UserOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
