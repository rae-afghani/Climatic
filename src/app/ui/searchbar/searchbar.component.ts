import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [MatIconButton, MatIcon],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  @Output() searchClicked: EventEmitter<string> = new EventEmitter<string>();

  search(searchTerm: string){
    if(!searchTerm) return;
    this.searchClicked.emit(searchTerm);
  }
}
