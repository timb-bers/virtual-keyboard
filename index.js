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

    this.elements.main = document.createElement('main');
    this.elements.main.classList.add('main');
    document.querySelector('.header').insertAdjacentElement('afterend', this.elements.main);

    const sectionArea = document.createElement('section');
    sectionArea.classList.add('text-area');
    document.querySelector('.main').append(sectionArea);
    const textAreaInner = document.createElement('div');
    textAreaInner.classList.add('text-area__inner');
    document.querySelector('.text-area').append(textAreaInner);
    const containerArea = document.createElement('div');
    containerArea.classList.add('container');
    document.querySelector('.text-area__inner').append(containerArea);
    const areaContent = document.createElement('div');
    areaContent.classList.add('text-area__content');
    document.querySelectorAll('.container')[1].append(areaContent);
    this.elements.area = document.createElement('textarea');
    this.elements.area.classList.add('text-area__input');
    this.elements.area.setAttribute('placeholder', 'Пожалуйста введите ваш текст...');
    this.elements.area.setAttribute('rows', '5');
    this.elements.area.setAttribute('cols', '60');
    document.querySelector('.text-area__content').append(this.elements.area);

    const keyboard = document.createElement('section');
    sectionArea.classList.add('keyboard');
    document.querySelector('.main').append(keyboard);
    const keyboardInner = document.createElement('div');
    keyboardInner.classList.add('keyboard__inner');
    document.querySelector('.keyboard').append(keyboardInner);
    const containerKeyboard = document.createElement('div');
    containerKeyboard.classList.add('container');
    document.querySelector('.keyboard__inner').append(containerKeyboard);
    this.elements.content = document.createElement('div');
    this.elements.content.classList.add('keyboard__content');
    document.querySelectorAll('.container')[2].append(this.elements.content);
    this.elements.content.append(this.createRows());

    const footer = document.createElement('footer');
    footer.classList.add('footer');
    document.querySelector('.main').insertAdjacentElement('afterend', footer);
    const footerInner = document.createElement('div');
    footerInner.classList.add('footer__inner');
    document.querySelector('.footer').append(footerInner);
    const containerFooter = document.createElement('div');
    containerFooter.classList.add('container');
    document.querySelector('.footer__inner').append(containerFooter);
    const footerContent = document.createElement('div');
    footerContent.classList.add('footer__content');
    document.querySelectorAll('.container')[3].append(footerContent);
    const footerText = document.createElement('p');
    footerText.classList.add('footer__text');
    footerText.innerText = 'Клавиатура создана в операционной системе Windows. Для переключения языка комбинация: левыe ctrl + alt';
    document.querySelector('.footer__content').append(footerText);
  }
}
const newVirtualKeyboard = new VirtualKeyboard();
window.addEventListener('DOMContentLoaded', () => {
  newVirtualKeyboard.init();
});
