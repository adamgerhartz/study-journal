import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NoteGridComponent } from './notes/note-grid/note-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteGridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
