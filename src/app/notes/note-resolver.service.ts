import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Note } from './note.model';
import { DataStorageReadService } from '../utilities/data-storage-read.service';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class NoteResolverService implements Resolve<Note[]> {

  constructor(private dataStorageReadService: DataStorageReadService,
    private noteService: NoteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("CALLED");
    const notes = this.noteService.getNotes();

    if (notes.length === 0) {
      return this.dataStorageReadService.fetchNotes();
    } else {
      return notes;
    }
  }
}
