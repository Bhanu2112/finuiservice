import { Member } from "./member";

export class Group {
  id!: number;
  groupName!: string;
  amount!: number;
  groupMembers!:Member[];
  status!: string;
  userId!: number;
  payedMembers!: number;
  grpPurpose!: string;
  comments:Comment[] = []
  array: any;
}
