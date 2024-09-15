import { BudgetManager } from "./budget-manager";

export class Budget {
  id!: number;
  categoryName!: string;
  budgetAmount!: number;
  catId!: number;
  spent!: number;
  createdAt!: Date;
  updateAt!: Date;
  budgetManager!:BudgetManager
}
