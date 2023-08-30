import * as model from '../model.js';
import View from "./view.js";

class SignupView extends View{
  _parentElement = document.querySelector('.signup-form');
  _checkMatch = document.querySelector('.confirm-password-el');
  password = document.querySelector('.password-el-signup');
  _CreateAccuntLink = document.querySelector('.login-link');

  constructor(){
    super();
    this._handlerCheckMatch();
    this._CreateAccuntLink.addEventListener('click', this.handlerCreateAccount.bind(this));
    this.addHandlerRegister();
  }

  addHandlerRegister(){
    this._parentElement.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formDatas = Object.fromEntries([...new FormData(this._parentElement)]);
    if(!formDatas.username || !formDatas.email || 
      !formDatas.password || !formDatas.cPassword){
      this.handlerErrorMessage('All Fields is Required!');
    }
    if(formDatas.username && formDatas.email && 
      formDatas.password && formDatas.cPassword){
        if(formDatas.password === formDatas.cPassword){
          this._data = formDatas;
          this._clearField();
          model.newUser(this._data);
          this._parentElement.closest('.signup').innerHTML = `
          <p class="success-msg">Registration SuccessFul, verification link has been sent to your email...</p>
          `;
        }
      }
    });

  }

  _handlerCheckMatch(){
    this._checkMatch.addEventListener('keyup', (e)=>{
    if(e.key === 'Tab') return
    if(this._checkMatch.value !== this.password.value){
      this._passwordStatus('Not matched!', '#ff0000');
    }
    if(this._checkMatch.value === this.password.value){
      this._passwordStatus('Matched!', '#00ff00');
    }
  });
  }

  _passwordStatus(text, color){
    document.querySelector('.check-matched').textContent = '';
    document.querySelector('.check-matched').textContent = text;
    document.querySelector('.check-matched').style.color = color;
  }

  handlerCreateAccount(e){
    e.preventDefault();
    this._hideForm();
    this._showForm('.login');
  }
}

const signup = new SignupView();