import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  @Output() dataEvent: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('txtTagInput') txtTagInput!: ElementRef;

  sendData() {
    const inputValue: string = this.txtTagInput.nativeElement.value;
    
    this.dataEvent.emit(inputValue);
  }
}
