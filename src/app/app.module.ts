import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NoteGridComponent } from './notes/note-grid/note-grid.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteStartComponent } from './notes/note-start/note-start.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteGridComponent,
    NoteDetailComponent,
    NoteEditComponent,
    NoteStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
