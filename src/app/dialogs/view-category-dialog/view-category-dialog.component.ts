import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-category-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-category-dialog.component.html',
  styleUrl: './view-category-dialog.component.css'
})
export class ViewCategoryDialogComponent {
 @Input() closeDialog =  false
 @Output() pcloseDialog = new EventEmitter<boolean>();
  ngOnInit(){
    console.log(this.closeDialog);

  }


  handleDialog(){
    this.closeDialog = !this.closeDialog;
    console.log(this.closeDialog);
    this.pcloseDialog.emit(true)
  }
}
