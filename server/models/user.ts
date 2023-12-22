import { ObjectId } from "mongodb";

export default interface User {
  name: string;
  family: string;
  id?: ObjectId;
}
