import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-grid',
  templateUrl: './note-grid.component.html',
  styleUrls: ['./note-grid.component.scss']
})
export class NoteGridComponent implements OnInit {
  subscription: Subscription;
  notes: Note[];
  isGrid: boolean = true;
  buttonPressed: boolean = false;

  constructor(private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.noteService.notesChanged
      .subscribe(
        (notes: Note[]) => {
          this.notes = notes;
        }
      );
    this.notes = this.noteService.getNotes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateNote(): void {
    this.buttonPressed = true;
    this.isGrid = false;
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
