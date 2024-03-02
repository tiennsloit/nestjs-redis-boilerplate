import { Injectable } from "@nestjs/common";

@Injectable()
export class DbService {
  constructor() {}

  getUsers() {
    return [{ user: "user1" }];
  }
}
