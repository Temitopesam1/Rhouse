import { pageNavigation } from "./pageNavigation.js";
import View from "./view.js";
import * as model from '../model.js';



class LadingPageView extends View{
  _id;
  _properties = model.state.properties;
  _currentProperty;
  _parentElement = document.querySelector('.property-container');

  constructor(){
    super();
    this.addHandlerProper();
    this._logoutSession();
  }

  addHandlerProper(){
    window.addEventListener('load', ()=>{
      const urlParams = new URLSearchParams(window.location.search);
      this._id = urlParams.get('propertyId');
      this._currentProperty = this._properties.find(property => property.id === this._id);
      this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
    })
  }

  _generateMarkup(){
    return `
    <h3>${this._currentProperty.name}</h3>
        <div class="post-gallery">
                  <img src="${this._currentProperty.images[0]}" style="width:100%">
                </div>
        </div>
        <div class="post-description">
            <p>${this._currentProperty.name}</p>
            <span>N${this._currentProperty.price}</span>
            <p><i class="fas fa-map-marker-alt"></i> ${this._currentProperty.location}</p>
            <small><i class="fa-sharp fa-regular fa-clock"></i> ${this._currentProperty.date}</small>
            <div class="post-description-stats">

    ${
        (this._currentProperty.postImgStat) ?
        `<div><i class="fas fa-toilet"></i> ${this._currentProperty.postImgStat.toilet}</div>
        <div><I class="fa fa-bed"></i> ${this._currentProperty.postImgStat.bed}</div>
        <div><i class="fa-solid fa-bath"></i> ${this._currentProperty.postImgStat.bath}</div>`
        : ''
        
    }

    <a href="tel:+2349032765986" class="callus">Call: +2349032765986</a>

    </div>
            </div><!-----description close---->

            <div class="full-description">
                <h3>Full Description</h3>
                <p>
                ${this._currentProperty.fullDesc}
                </p>
                <small><i class="fa-sharp fa-regular fa-clock"></i> ${this._currentProperty.date}</small>
            </div>

            <div class="map">
            <h3>Location on Map</h3>
            <iframe src="${this._currentProperty.locationOnMap}"></iframe>
            </map>
    `;
  }


}
const landingPage = new LadingPageView();