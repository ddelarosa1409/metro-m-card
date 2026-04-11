// Mock Supabase client - replace with real client when connecting to Lovable Cloud
// This simulates auth functionality using local state

const MOCK_USERS_KEY = "metro_sdq_users";
const MOCK_SESSION_KEY = "metro_sdq_session";

interface MockUser {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  cedula: string;
}

function getUsers(): MockUser[] {
  try {
    return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: MockUser[]) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

export function getSession(): MockUser | null {
  try {
    const session = localStorage.getItem(MOCK_SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

function setSession(user: MockUser | null) {
  if (user) {
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(MOCK_SESSION_KEY);
  }
}

export async function signIn(email: string, password: string): Promise<{ user: MockUser | null; error: string | null }> {
  await new Promise((r) => setTimeout(r, 800));
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return { user: null, error: "Correo o contraseña incorrectos" };
  setSession(user);
  return { user, error: null };
}

export async function signUp(
  email: string,
  _password: string,
  nombre: string,
  apellido: string,
  cedula: string
): Promise<{ user: MockUser | null; error: string | null }> {
  await new Promise((r) => setTimeout(r, 800));
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    return { user: null, error: "Este correo ya está registrado" };
  }
  const user: MockUser = { id: crypto.randomUUID(), email, nombre, apellido, cedula };
  saveUsers([...users, user]);
  return { user, error: null };
}

export async function signOut() {
  await new Promise((r) => setTimeout(r, 300));
  setSession(null);
}

export async function resetPassword(email: string): Promise<{ error: string | null }> {
  await new Promise((r) => setTimeout(r, 800));
  return { error: null };
}
