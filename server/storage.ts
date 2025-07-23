import { type User, type InsertUser, type Contact, type InsertContact, type Newsletter, type InsertNewsletter } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
}

export class MemoryStorage implements IStorage {
  private users: User[] = [];
  private contacts: Contact[] = [];
  private newsletters: Newsletter[] = [];
  private nextUserId = 1;
  private nextContactId = 1;
  private nextNewsletterId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.nextUserId++,
      username: insertUser.username,
      password: insertUser.password,
    };
    this.users.push(user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: this.nextContactId++,
      name: insertContact.name,
      email: insertContact.email,
      message: insertContact.message,
      createdAt: new Date(),
    };
    this.contacts.push(contact);
    return contact;
  }

  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const newsletter: Newsletter = {
      id: this.nextNewsletterId++,
      email: insertNewsletter.email,
      createdAt: new Date(),
    };
    this.newsletters.push(newsletter);
    return newsletter;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return this.newsletters.find(newsletter => newsletter.email === email);
  }
}

export const storage = new MemoryStorage();
