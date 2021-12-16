import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  note: Note;
  isNewNote: boolean = false;
  isTitle: boolean = false;
  isReference: boolean = false;
  isContent: boolean = false;
  isContext: boolean = false;
  isTags: boolean = false;
  noteTitleForm: FormGroup;
  noteReferenceForm: FormGroup;
  noteContentForm: FormGroup;
  noteContextForm: FormGroup;
  noteTagsForm: FormGroup;


  constructor(private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig.path === "new") {
      this.note = new Note("", "", "", "", [], "", new Date(), new Date());
      this.isNewNote = true;
    } else {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.note = this.noteService.getNote(params['id']);
          }
        );
    }

    this.noteTitleForm = new FormGroup({
      'title': new FormControl(this.note.title)
    });
    this.noteReferenceForm = new FormGroup({
      'reference': new FormControl(this.note.reference)
    });
    this.noteContentForm = new FormGroup({
      'content': new FormControl(this.note.content)
    });
    this.noteContextForm = new FormGroup({
      'context': new FormControl(this.note.context)
    });
    this.noteTagsForm = new FormGroup({
      'tags': new FormControl(this.note.tags)
    });
  }

  onEdit(value: string) {
    if (value === "title") {
      this.isTitle = true;
    } else if (value === "reference") {
      this.isReference = true;
    } else if (value === "content") {
      this.isContent = true;
    } else if (value == "context") {
      this.isContext = true;
    } else if (value === "tags") {
      this.isTags = true;
    }
  }

  onSubmit(value: string) {
    if (!this.isNewNote) {
      if (value === "title") {
        if (this.noteTitleForm.value.title.length > 0) {
          this.noteService.updateNote(this.note.id, this.noteTitleForm.value);
        }
      } else if (value === "reference") {
        if (this.noteReferenceForm.value.reference.length > 0) {
          this.noteService.updateNote(this.note.id, this.noteReferenceForm.value);
        }
      } else if (value === "content") {
        if (this.noteContentForm.value.content.length > 0) {
          this.noteService.updateNote(this.note.id, this.noteContentForm.value);
        }
      } else if (value == "context") {
        if (this.noteContextForm.value.context.length > 0) {
          this.noteService.updateNote(this.note.id, this.noteContextForm.value);
        }
      } else if (value === "tags") {
        this.noteService.updateNote(this.note.id, this.noteTagsForm.value);
      }
    } else {
      if (value === "title") {
        this.note.title = this.noteTitleForm.value.title;
      } else if (value === "reference") {
        this.note.reference = this.noteReferenceForm.value.reference;
        this.note.uri = this.noteService.generateUri(this.note.reference);
      } else if (value === "content") {
        this.note.content = this.noteContentForm.value.content;
      } else if (value == "context") {
        this.note.context = this.noteContextForm.value.context;
      } else if (value === "tags") {
        this.note.tags = this.noteTagsForm.value.tags.split(",");
      }

      if (this.note.title && this.note.reference && this.note.content && this.note.context) {
        this.noteService.addNote(this.note);
      }
    }

    this.onCancel(value);
    this.router.navigate(['./'], {relativeTo: this.route});
  }

  onCancel(value: string) {
    if (value === "title") {
      this.isTitle = false;
    } else if (value === "reference") {
      this.isReference = false;
    } else if (value === "content") {
      this.isContent = false;
    } else if (value === "context") {
      this.isContext = false;
    } else if (value === "tags") {
      this.isTags = false;
    }
  }

  deleteNote() {
    this.noteService.deleteNote(this.note);
    this.returnToNotes();
  }

  returnToNotes() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
