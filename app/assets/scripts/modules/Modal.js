class Modal {
  constructor() {
    this.openModalButton = document.getElementsByClassName('open-modal');
    this.modal = document.getElementsByClassName('modal');
    this.closeModalButton = document.getElementsByClassName('modal__close');
    this.events();
  }

  events() {
    // click the open modal button

    this.openModalButton[0].addEventListener('click', function(){
      return openModal.bind(this); 
    });

    // clicking the x close the modal button
    this.closeModalButton[0].addEventListener('click', function() {
      return this.closeModal;
    })

  }

  openModal() {
    this.modal[0].classList.add('modal--is-visible'); 
    return false;

  }

  closeModal() {
    this.modal[0].classList.remove('modal--is-visible');

  }

}

export default Modal;
