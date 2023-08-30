export default class View{
  _data;
  _currentAcount;
  _errorMessage = document.querySelector('.error-msg-container');
  container = document.querySelector('.signup-login-container');
  _btnLogout = document.querySelector('.user-toggle');
  _intervalId;

  render(data){
    if(!data) return;
    this._data = data;
    const markup = this._generateMarkup();
    if(!markup) return;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear(){
    this._parentElement.innerHTML = '';
  }

  _hideForm(){
    this.container.querySelectorAll('.form-container').forEach(elementt => elementt.classList.add('hidden'))
  }

  _showForm(elem){
    this.container.querySelector(elem).classList.remove('hidden');
  }

  _errorMessageTimeout(){
    clearTimeout(this._intervalId);
    this._intervalId = setTimeout(()=>{
      this._errorMessage.classList.add('hidden');
    }, 2000);
  }

  handlerErrorMessage(content){
    this._errorMessage.textContent = content;
    this._errorMessage.classList.remove('hidden');
    this._errorMessageTimeout();
  }

  _clearField(){
    document.querySelectorAll('input').forEach(input => input.value = '');
  }

  _logoutSession(){
    this._btnLogout.addEventListener('click', (e)=>{
      const btn = e.target.classList.contains('btn-logout');
      if(!btn) return;
      localStorage.removeItem('login-session');
      window.location.href = 'index.html';
    })
  }

}