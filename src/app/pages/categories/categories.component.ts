import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ViewCategoryDialogComponent } from "../../dialogs/view-category-dialog/view-category-dialog.component";
import { AddCategoryComponent } from "../../dialogs/add-category/add-category.component";
import { Category } from '../../models/category';
import { ExpensesServiceService } from '../../services/expenses-service.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FontAwesomeModule, ViewCategoryDialogComponent, AddCategoryComponent, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  faTrash = faTrash
  faPenTOSquare = faPenToSquare
  faEye = faEye
  openDialog = true;
  openAddCategoryDialog = false;


  categories!: Category[]

  categoryForm = new FormGroup({
    categoryName : new FormControl(''),
    categoryType : new FormControl('')
  })




  constructor(private expenseService:ExpensesServiceService){

  }



ngOnInit(){
  this.expenseService.getAllCategories().subscribe(data => {
    console.log(data);

    this.categories = data

  })
}


  viewDetailes(){
    this.openDialog = !this.openDialog;
  }
  handleEvent(event: boolean) {
    console.log(event);
    this.openDialog = !this.openDialog
  }



  openCatDialog(){
    this.openAddCategoryDialog = !this.openAddCategoryDialog
  }

  closeCatDialog(event :boolean){
    console.log(event);
    this.openAddCategoryDialog = event
  }
}

