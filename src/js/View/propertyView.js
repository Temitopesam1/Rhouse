import View from "./view.js";

class PropertyView extends View{
  _parentElement = document.querySelector('.post-wrapper');
  _propertyLink;

  constructor(){
    super();
  }

  addHandlerProperty(handler){
    window.addEventListener('load', ()=>{
      handler();
      //this.handlerLink();
    });
  }

  _generateMarkup(){
    const markup = this._data.map(property => this.markupElement(property)).join('');
    return markup;
  }

  markupElement(property){
    return `
    <div class="post-container" data-propertyId="${property.id}">
    
    
        <div class="post-img">
    
        <div class="property-type">
        <small>${property.propertyType}</small>
        </div>
        <a href="landing-page.html?propertyId=${property.id}" class="property-link">
        <img src="${property.images[0]}">
        </a>
        <div class="post-img-stats">
    
        ${
            (property.postImgStat) ?
            `<div><i class="fas fa-toilet"></i> ${property.postImgStat.toilet}</div>
            <div><I class="fa fa-bed"></i> ${property.postImgStat.bed}</div>
            <div><i class="fa-solid fa-bath"></i> ${property.postImgStat.bath}</div>`
            : ''
            
        }
    
        </div>
    
        </div><!---post-img close--->
    
        <div class="post-description">
        <h3>${property.name}</h3>
        <span>${property.price}</span>
        <p><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
        <small><i class="fa-sharp fa-regular fa-clock"></i> ${property.date}</small>
        
        <a href="landing-page.html?propertyId=${property.id}" class="property-link">Learn more</a>
        
        </div>
    
        </div>
    `;
  }

  handlerLink(){
    const links = document.querySelectorAll('.post-container');
    links.forEach(link =>{
      link.addEventListener('click', (e)=>{
        e.preventDefault();
        const id = link.dataset.propertyid;
        window.location.href = `landing-page.html`;
      });
    })
  }

}
export default new PropertyView();