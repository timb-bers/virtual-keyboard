class VirtualKeyboard {
  constructor() {
    this.elements = {
      main: null,
      area: null,
      content: null,
      capsLock: null,
      shift: null,
    };
    this.properties = {
      capsLock: false,
      shift: false,
    };
  }

  init() {
    const header = document.createElement('header');
    header.classList.add('header');
    document.body.prepend(header);
    const headerInner = document.createElement('div');
    headerInner.classList.add('header__inner');
    document.querySelector('.header').append(headerInner);
    const containerHeader = document.createElement('div');
    containerHeader.classList.add('container');
    document.querySelector('.header__inner').append(containerHeader);

    const title = document.createElement('h1');
    title.innerText = 'RSS Виртуальная клавиатура!';
    title.className = 'header__title title';
    document.querySelectorAll('.container')[0].append(title);
    const mainInner = document.createElement('div');
    mainInner.classList.add('header__inner');
    document.querySelector('.header').append(headerInner);
  }
}
const newVirtualKeyboard = new VirtualKeyboard();
window.addEventListener('DOMContentLoaded', () => {
  newVirtualKeyboard.init();
});
