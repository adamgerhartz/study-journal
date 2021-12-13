import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NotesComponent } from '../notes/notes.component';
import { NoteStartComponent } from '../notes/note-start/note-start.component';
import { NoteEditComponent } from '../notes/note-edit/note-edit.component';
import { NoteDetailComponent } from '../notes/note-detail/note-detail.component';
import { NoteResolverService } from '../notes/note-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: NotesComponent, children: [
    { path: 'new', component: NoteEditComponent },
    { path: ':id', component: NoteDetailComponent, resolve: [NoteResolverService] },
    { path: ':id/edit', component: NoteEditComponent, resolve: [NoteResolverService] }
  ] }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
