import MobileMenu from './modules/MobileMenu';
import StickyHeader from './modules/StickyHeader';
import RevealOnScroll from './modules/RevealOnScroll';
import Modal from './modules/Modal';

let mobileMenu = new MobileMenu();
new RevealOnScroll(document.getElementsByClassName('feature-item'), '85%');
new RevealOnScroll(document.getElementsByClassName('testimonial'), '95%');

let stickyHeader = new StickyHeader();

let modal = new Modal();
