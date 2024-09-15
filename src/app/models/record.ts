import { Account } from "./account"
import { Category } from "./category"

export class Record {
  id:number = 0
  amount: number = 0
  recordType: string = ''
  reason: string = ''
  category:Category = new Category()
  account: Account = new Account()
  userId :number =0
  date : Date = new Date()
}
