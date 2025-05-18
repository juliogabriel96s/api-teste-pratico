export type UserType = "owner" | "customer";

export class User {
  id: string;
  name: string;
  email: string;
  type: UserType;

  constructor(id: string, name: string, email: string, type: UserType) {
    if (!["owner", "customer"].includes(type)) {
      throw new Error(`Invalid user type. Allowed values are 'owner' or 'customer'.`);
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.type = type;
  }
}