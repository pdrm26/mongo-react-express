import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public name: string,
    public family: string,
    public id?: ObjectId
  ) {}
}
