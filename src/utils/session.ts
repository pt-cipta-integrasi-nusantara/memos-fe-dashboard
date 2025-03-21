import dayjs from "dayjs";
import { User } from "../services/auth/types";

const STORAGE_KEY = 'session';
const USER_KEY = "user"
const IS_LOGGEDIN_KEY = "isloggedin"
const SESSION_TIMESTAMP_KEY = "last_login"

export function getSession() {
    return window.localStorage.getItem(STORAGE_KEY);
}

export function getIsLoggedin() {
  return window.localStorage.getItem(IS_LOGGEDIN_KEY);
}

export function setSession(newSession: string) {
  window.localStorage.setItem(STORAGE_KEY, newSession);
  window.localStorage.setItem(SESSION_TIMESTAMP_KEY, dayjs().format("YYYY-MM-DD HH:mm:ss"));
}

export function setIsLoggedin(isLoggedin: string) {
  window.localStorage.setItem(IS_LOGGEDIN_KEY, isLoggedin);

}

export function getUserData() {
  return window.localStorage.getItem(USER_KEY);
}

export function setUserData(userData: User | {}){
  window.localStorage.setItem(USER_KEY, JSON.stringify(userData))
}

export function flushStorage() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(IS_LOGGEDIN_KEY);
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
