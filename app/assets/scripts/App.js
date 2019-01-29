import MobileMenu from './modules/MobileMenu';
import StickyHeader from './modules/StickyHeader';
import RevealOnScroll from './modules/RevealOnScroll';

let mobileMenu = new MobileMenu();
new RevealOnScroll(document.getElementsByClassName('feature-item'), '85%');
new RevealOnScroll(document.getElementsByClassName('testimonial'), '95%');

let stickyHeader = new StickyHeader();
