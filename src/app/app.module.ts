import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NoteGridComponent } from './notes/note-grid/note-grid.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteItemComponent } from './notes/note-grid/note-item/note-item.component';
import { TruncatePipe } from './utilities/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteGridComponent,
    NoteDetailComponent,
    NoteEditComponent,
    NoteItemComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
