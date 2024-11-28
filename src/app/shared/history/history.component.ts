import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  @Input()
  history!: string[];

  @Output() dataEvent: EventEmitter<string> = new EventEmitter<string>();

  sendData(search: string) {
    this.dataEvent.emit(search);
  }
}
