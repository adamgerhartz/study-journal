import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Note } from '../notes/note.model';
@Injectable({
  providedIn: 'root'
})
export class DataStorageWriteService {

  constructor(private http: HttpClient) {}

  storeNote(note: Note) {
    console.log(note.tags.length)
    console.log(note.tags)
    const noteUpdated = {
      uri: note.uri,
      title: note.title,
      content: note.content,
      context: note.context,
      tags: note.tags,
      created: note.created,
      lastUpdated: note.lastUpdated
    }

    if (note.id) {
      noteUpdated["_id"] = note.id;
    }

    const headers = new HttpHeaders({'Content-Type':'application/json'});

    if (note.id) {
      this.http
        .put(
          "http://localhost:3000/notes/" + note.id,
          noteUpdated,
          { headers: headers })
        .subscribe(response => {
          console.log(response);
        })
    } else {
      this.http
        .post(
          "http://localhost:3000/notes/",
          note,
          { headers: headers })
        .subscribe(response => {
          console.log(response);
        })
    }
  }

  deleteNote(id: string) {
    this.http
      .delete(
        "http://localhost:3000/notes/" + id
      )
      .subscribe(response => {
        console.log(response);
      })
  }
}
