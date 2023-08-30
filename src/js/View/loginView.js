import View from "./view.js";

class LoginView extends View{
  _parentElement = document.querySelector('.login-form');
  _CreateAccuntLink = document.querySelector('.create-acc-link');
  _forgetPassword = document.querySelector('.forget-password-el');
  _appContainer = document.querySelector('.app-container');

  constructor(){
    super();
    this._loginSession();
    this._logoutSession();
    this._forgetPassword.addEventListener('click', this.handlerForgetPassword.bind(this));
  }

  _loginSession(){
    const data = JSON.parse(localStorage.getItem('login-session'));
    if(!data) return;
    this._currentAcount = data;
    this.container.classList.add('hidden');
    this._appContainer.classList.remove('hidden');

  }


  addHandlerLogin(handler){
    this._parentElement.addEventListener('submit', this._submitLogin.bind(this));
    handler();
  }

  _submitLogin(e){
    e.preventDefault();
    const formDatas = Object.fromEntries([...new FormData(this._parentElement)]);
    if(!formDatas.username || !formDatas.password){
      this.handlerErrorMessage('All Fields is Required!');
    }
    if(formDatas.username && formDatas.password){
      this._currentAcount = this._data.find(user => (user.username === formDatas.username 
        && user.password === formDatas.password));
        if(!this._currentAcount){
          this.handlerErrorMessage('No information found for your login details');
        }
        else{
        this.container.classList.add('hidden');
        this._appContainer.classList.remove('hidden');
        localStorage.setItem('login-session', JSON.stringify(this._currentAcount));
        this._clearField();
        }
    }
  }

  // handlerCreateAccount(e){
  //   e.preventDefault();
  //   this._hideForm();
  //   this._showForm('.signup');
  // }

  handlerForgetPassword(e){
    e.preventDefault();
    this._hideForm();
    window.location.href = `forget-password.html`;
  }

};

export default new LoginView();