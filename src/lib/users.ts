import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

const usersFilePath = path.join(process.cwd(), "data", "users.json");
const saltRounds = 10;

export async function getUsers(): Promise<UserRecord[]> {
  try {
    const raw = await fs.readFile(usersFilePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveUsers(users: UserRecord[]): Promise<void> {
  await fs.mkdir(path.dirname(usersFilePath), { recursive: true });
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const users = await getUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<UserRecord> {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const user: UserRecord = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    passwordHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };

  const users = await getUsers();
  users.push(user);
  await saveUsers(users);

  return user;
}
