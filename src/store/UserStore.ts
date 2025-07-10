import { makeAutoObservable } from 'mobx';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

class UserStore {
  currentUser: User | null = null;
  users: User[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) this.users = JSON.parse(savedUsers);

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) this.currentUser = JSON.parse(savedUser);
  }

  register(username: string, email: string, password: string) {
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
    };

    this.users.push(newUser);
    this.currentUser = newUser;

    this.saveToLocalStorage();
  }

  login(email: string, password: string) {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      this.currentUser = user;
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  private saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }
}

export default new UserStore();
