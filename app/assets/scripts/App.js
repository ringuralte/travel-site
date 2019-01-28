import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';

let mobileMenu = new MobileMenu();
new RevealOnScroll(document.getElementsByClassName('feature-item'), '85%');
new RevealOnScroll(document.getElementsByClassName('testimonial'), '90%');
