import { User } from "../services/auth/types";

const STORAGE_KEY = 'session';
const USER_KEY = "user"

export function getSession() {
    return window.localStorage.getItem(STORAGE_KEY);
}

export function setSession(newSession: string) {
  window.localStorage.setItem(STORAGE_KEY, newSession);
}

export function getUserData() {
  return window.localStorage.getItem(USER_KEY);
}

export function setUserData(userData: User | {}){
  window.localStorage.setItem(USER_KEY, JSON.stringify(userData))
}

export function flushStorage() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export async function flushSession() {
  // use `fetch` instead of `http` from `utils` to prevent circular dependency
  // await window.fetch(`${API_URL}/logout`, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: `Bearer ${typeof window !== "undefined" ? getSession() : ""}`,
  //   },
  // });

  flushStorage();
}
