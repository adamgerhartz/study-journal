import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NoteGridComponent } from './notes/note-grid/note-grid.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteItemComponent } from './notes/note-grid/note-item/note-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteGridComponent,
    NoteDetailComponent,
    NoteEditComponent,
    NoteItemComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
