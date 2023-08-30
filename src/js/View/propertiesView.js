import { pageNavigation } from './pageNavigation.js';
import * as model from '../model.js';
import View from './view.js';

class PropertiesView extends View{
  _properties = model.state.properties;
  _parentElement = document.querySelector('.post-wrapper');
  _filterContainer = document.querySelector('.btn-filter');
  _btnLogout = document.querySelector('.user-toggle');

  
constructor(){
  super();
  this.addHandlerProperties();
  this.handlerChange();
  
  this._logoutSession();
}

handlerChange(){
  const selectOption = [...new Set(this._properties.map(option => option.type))]
  .map(option => `<option value="${option}">${option}</option>`).join('');
  this._filterContainer.insertAdjacentHTML('beforeend', selectOption);

  this._filterContainer.addEventListener('change', ()=>{
    const optionValue = this._filterContainer.value;
    if(!optionValue) return;
    this.addHandlerProperties(optionValue);
  })
}

addHandlerProperties(type = false){
  const properties = type ? this._properties.filter(property => property.type === type) : this._properties;
  if(!properties) return;
  const markup = properties.map(property => this._generateMarkup(property)).join('');
  this._parentElement.innerHTML = '';
  this._parentElement.insertAdjacentHTML('afterbegin', markup);
}

_generateMarkup(property){
  return `
  <div class="post-container">
  <div class="post-image">
  <a href="landing-page.html?propertyId=${property.id}">
  <img src="${property.images[0]}">
  </a>
  </div>
  <div class="post-description">
    <div>
      <h3>${property.name}</h3>
      <span>N${property.price}</span>
      <p><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
      <small><i class="fa-sharp fa-regular fa-clock"></i> ${property.date}</small>
      <a href="landing-page.html?propertyId=${property.id}">Learn more</a>
      </div>
  </div>
  </div>
  `;
}

}
const propertiesView = new PropertiesView();