class PageNavigation{
  _slideIndex = 0;
  _searchBar = document.querySelector('.search-bar-toggle');
  _toggleUserProfile = document.querySelector('.user-toggle');
  _menuToggle = document.querySelector('.menu-toggle');

  constructor(){
    this._searchToggle()
    this.handlerUserProfile();
    this.handlerMenuToggle();
  }

  _searchToggle(){
    this._searchBar.addEventListener('click', () => {
    document.querySelector('.search-bar-container').classList.toggle('search-bar-container-toggle');
  })
  }

  handlerUserProfile(){
    this._toggleUserProfile.addEventListener('click', () => {
    document.querySelector('.toggle-user-profile').classList.toggle('toggled-user-profile');
  })
  }

  handlerMenuToggle(){
    this._menuToggle.addEventListener('click', () => {
      document.querySelector('header nav').classList.toggle('header-nav-toggle');
      if( document.querySelector('header nav').classList.contains('header-nav-toggle')){
          this._menuToggle.innerHTML = '<i class="fa fa-xmark"></i>';
      }else{
          this._menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
  })
  }

  autoSlideShow(){
    let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}

  }

  slideShow(){
    let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
  }

}
export const pageNavigation = new PageNavigation();