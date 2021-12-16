import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesComponent } from '../notes/notes.component';
import { NoteEditComponent } from '../notes/note-edit/note-edit.component';
import { NoteDetailComponent } from '../notes/note-detail/note-detail.component';
import { NoteResolverService } from '../notes/note-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: NotesComponent, children: [
    { path: '', component: NotesComponent, resolve: [NoteResolverService] },
    { path: 'new', component: NoteDetailComponent },
    { path: ':id', component: NoteDetailComponent, resolve: [NoteResolverService] },
    { path: ':id/edit', component: NoteDetailComponent, resolve: [NoteResolverService] }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
