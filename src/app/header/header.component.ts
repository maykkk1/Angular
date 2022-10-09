import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onSectionSelected = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  collapsed = true;

  selectSection(section: string) {
    this.onSectionSelected.emit(section)
  }

}
