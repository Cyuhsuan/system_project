import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import AuthService from '@/services/AuthService';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

@Module({ namespaced: true })
class User extends VuexModule {
  public status = storedUser ? { loggedIn: true } : { loggedIn: false };
  public user = storedUser ? JSON.parse(storedUser) : null;
  public token = storedToken ? storedToken : null;

  @Mutation
  public loginSuccess(data: any): void {
    console.log('login', data)
    this.status.loggedIn = true;
    this.user = data.user;
    this.token = data.token;
  }

  @Mutation
  public loginFailure(): void {
    this.status.loggedIn = false;
    this.user = null;
  }

  @Mutation
  public logout(): void {
    this.status.loggedIn = false;
    this.user = null;
    this.token = null;
  }

  @Mutation
  public registerSuccess(): void {
    this.status.loggedIn = false;
  }

  @Mutation
  public registerFailure(): void {
    this.status.loggedIn = false;
  }

  @Mutation
  public userUpdate(data: any): void {
    this.user.name = data.name;
    this.user.email = data.email;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  @Mutation
  public photoUpdate(data: any): void {
    this.user.photo_address = data;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  @Action({ rawError: true })
  login(data: any): Promise<any> {
    return AuthService.login(data.account, data.password).then(
      user => {
        this.context.commit('loginSuccess', user.data);
        return Promise.resolve(user.data.user);
      },
      error => {
        this.context.commit('loginFailure');
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      }
    );
  }

  @Action
  signOut(): void {
    AuthService.logout();
    this.context.commit('logout');
  }

  @Action({ rawError: true })
  register(data: any): Promise<any> {
    return AuthService.register(data.account, data.email, data.password, data.c_password, data.name).then(
      response => {
        this.context.commit('registerSuccess');
        return Promise.resolve(response.data);
      },
      error => {
        this.context.commit('registerFailure');
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      }
    );
  }

  @Action
  userEditUpdate(data: any) {
    this.context.commit('userUpdate', data)
  }

  @Action
  userPhotoUpdate(data: any) {
    this.context.commit('photoUpdate', data)
  }

  get isLoggedIn(): boolean {
    return this.status.loggedIn;
  }
}

export default User;