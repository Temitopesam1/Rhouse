import { pageNavigation } from './View/pageNavigation.js';
import * as model from './model.js';
import PropertyView from './View/propertyView.js';
import LoginView from "./View/loginView.js";

const controlProperty = function(){
  PropertyView.render(model.state.properties);
}

const controlLogin = function(){
  LoginView.render(model.state.users);
}

const init = function(){
  pageNavigation.autoSlideShow();
  PropertyView.addHandlerProperty(controlProperty);
  LoginView.addHandlerLogin(controlLogin);
}
init();