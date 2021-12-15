import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Note } from '../notes/note.model';
import { NoteService } from '../notes/note.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private noteService: NoteService) { }

  storeNotes() {

  }

  fetchNotes() {
    return this.http
      .get<{ message: string, notes: any }>('http://localhost:3000/notes')
      .pipe(
        map((responseData: any) => {
          return responseData.notes.map(note => {
            return {
              id: note._id,
              title: note.title,
              content: note.content,
              context: note.context,
              tags: note.tags ? note.tags : [],
              lastUpdated: Date.parse(note.lastUpdated),
              created: Date.parse(note.created)
            };
          });
        }),
        tap(notes => {
          this.noteService.setNotes(notes);
        })
      );
  }
}
