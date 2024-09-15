import { Budget } from './budget';
import { BudgetManagerIds } from './budget-manager-ids';

export class BudgetManager {
  ids!:BudgetManagerIds
  budgets!: Budget[];
}
