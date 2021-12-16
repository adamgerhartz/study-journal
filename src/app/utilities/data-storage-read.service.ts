import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Note } from '../notes/note.model';
import { NoteService } from '../notes/note.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageReadService {

  constructor(private http: HttpClient,
    private noteService: NoteService) { }


  fetchNotes() {
    return this.http
      .get<{ message: string, notes: any }>('http://localhost:3000/notes')
      .pipe(
        map((responseData: any) => {
          return responseData.notes.map(note => {
            return {
              id: note._id,
              uri: note.uri,
              title: note.title,
              content: note.content,
              context: note.context,
              tags: note.tags ? note.tags : [],
              reference: this.noteService.generateReference(note.uri),
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
