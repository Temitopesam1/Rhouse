import View from './view.js'
import * as model from '../model.js';

class ForgetPassword extends View{
_email = 'tysoab@gmail.com';
_parentElement = document.querySelector('.forgetPassword-form');
_currentAccount;

constructor(){
  super();
  this.addHandlerChangePassword();
}

addHandlerChangePassword(){
this._parentElement.addEventListener('submit', (e)=>{
  e.preventDefault();
  this._currentAccount = model.state.users.find(user => user.email === this._email);
  const formDatas = Object.fromEntries([... new FormData(this._parentElement)]);
  if(!formDatas.password  || !formDatas.cPassword) this.handlerErrorMessage('All fields is required!');
  if(formDatas.password !== formDatas.cPassword) this.handlerErrorMessage('Password not match!');
  if(formDatas.password === formDatas.cPassword 
    && formDatas.password !== '' 
    && formDatas.cPassword !== ''){
    this._currentAccount.password = formDatas.password;
    const data = {
      email: this._email,
      password: formDatas.password
    }
    model.setUserPassword(data);
    this._clearField();
    this._parentElement.closest('.forgetPassword').innerHTML = 
    `<p class="success-msg">Password changed! you will be redirected to login page...</p>`;
    this._redirectTimeout();
  }
});
}

_redirectTimeout(){
  clearTimeout(this._intervalId);
  this._intervalId = setTimeout(()=>{
    window.location.href = `index.html`;
  }, 2500);
}

};

const newPassword = new ForgetPassword();