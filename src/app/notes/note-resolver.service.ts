import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Note } from './note.model';
import { DataStorageService } from '../utilities/data-storage.service';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class NoteResolverService implements Resolve<Note[]> {

  constructor(private dataStorageService: DataStorageService,
    private noteService: NoteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const notes = this.noteService.getNotes();

    if (notes.length === 0) {
      return this.dataStorageService.fetchNotes();
    } else {
      return notes;
    }
  }
}
