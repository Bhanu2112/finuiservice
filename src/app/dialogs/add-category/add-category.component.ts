import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, RequiredValidator } from '@angular/forms';
import { Category } from '../../models/category';
import { ExpensesServiceService } from '../../services/expenses-service.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
    @Output() closeCatDialog = new EventEmitter<boolean>();




    categoryForm!:FormGroup
    cat = new Category();
    // new FormGroup({
    //   categoryName : new FormControl(''),
    //   categoryType : new FormControl(null)
    // })

    constructor(private fb:FormBuilder, private expenseService:ExpensesServiceService){
        this.categoryForm = this.fb.group({
          categoryName : [''],
          categoryType : ['bhanu']
        })
    }


    ngOnInit(){

    }

    handleCatDialog(){

      this.closeCatDialog.emit(false);

    }

    onFormSubmit(){
      console.warn(this.categoryForm.value.categoryName)
      this.cat.categoryName = this.categoryForm.value.categoryName;
      this.cat.categoryType = this.categoryForm.value.categoryType;

      console.log(this.cat);

      this.expenseService.addCategory(this.cat).subscribe(data =>{
        console.log(data);
        window.location.reload()
      })

    }

}
