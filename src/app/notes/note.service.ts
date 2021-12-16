import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Note } from './note.model';
import { DataStorageWriteService } from '../utilities/data-storage-write.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notesChanged = new Subject<Note[]>();
  private notes: Note[] = [];

  constructor(private dataStorageWriteService: DataStorageWriteService) {}

  setNotes(notes: Note[]) {
    this.notes = notes;
    this.notesChanged.next(this.notes.slice());
  }

  getNotes() {
    return this.notes.slice();
  }

  getNote(id: string) {
    for (const note of this.notes) {
      if (note.id == id) {
        return note;
      }
    }
    return null;
  }

  addNote(note: Note) {
    this.dataStorageWriteService.storeNote(note);
    this.notes.push(note);
    this.notesChanged.next(this.notes.slice());
  }

  updateNote(id: string, update: any) {
    for (const note of this.notes) {
      if (note.id == id) {
        if (update.title) {
          note.title = update.title;
        } else if (update.reference) {
          note.reference = update.reference;
          note.uri = this.generateUri(update.reference);
        } else if (update.content) {
          note.content = update.content;
        } else if (update.context) {
          note.context = update.context;
        } else if (update.tags) {
          note.tags = update.tags.split(",");
        }

        note.lastUpdated = new Date();
        // send the note off to the database
        this.dataStorageWriteService.storeNote(note);
      }
    }
    this.notesChanged.next(this.notes.slice());
  }

  deleteNote(noteToDelete: Note) {
    const id = noteToDelete.id;
    this.dataStorageWriteService.deleteNote(id);
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i] == noteToDelete) {
        this.notes.splice(i, 1);
      }
    }
    this.notesChanged.next(this.notes.slice());
  }

  public generateUri(reference: string) {
    let book = reference.split(" ")[0];
    book = book.toLocaleLowerCase();
    let rest = reference.split(" ")[1];
    let restArray = rest.split(":");
    const chapter = restArray[0];
    const verse = restArray[1];
    let uri = "/scriptures/bofm/" + book + "/" + chapter + "?id=p" + verse + "#" + verse;
    return uri;
  }

  public generateReference(uri: string) {
    const uriArray = uri.split("/").slice(1);
    const book = this.getBook(uriArray[2]);
    const contents = uriArray[3].split("?");
    const chapter = contents[0];
    let verse = contents[1].split("=")[1];
    // handle only one verse for right now
    // TODO: Handle multiple verses sometime
    verse = verse.replace("p", "");
    verse = verse.split("#")[0];
    return book + " " + chapter + ":" + verse;
  }

  private getBook(value: string) {
    switch(value) {
      case "ether":
        return "Ether";
    }
  }
}
