import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Note } from '../../note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {
  @Input() note: Note;
  @Input() isGrid: boolean;
  @Output() isGridChange = new EventEmitter<boolean>();

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onToggleGrid(): void {
    this.isGrid = !this.isGrid;
    this.isGridChange.emit(this.isGrid);
  }

}
