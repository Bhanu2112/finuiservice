import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-view-account-detailes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-account-detailes.component.html',
  styleUrl: './view-account-detailes.component.css'
})
export class ViewAccountDetailesComponent {

  @Output() closeActDialog = new EventEmitter<boolean>();

  closeViewActDialog(){
    this.closeActDialog.emit(false)
  }
}
