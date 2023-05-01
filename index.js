import mass from './data.js';

const EN = 'en';
const RU = 'ru';

function getLanguage() {
  return localStorage.getItem('language');
}

function setLanguage(language) {
  localStorage.setItem('language', language);
}

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
      lang: [EN, RU],
      language: getLanguage() || EN,
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

  language() {
    const current = this.properties.language;
    const currentIndex = this.properties.lang.indexOf(current);
    if (currentIndex < this.properties.lang.length - 1) {
      this.properties.language = this.properties.lang[currentIndex + 1];
    } else [this.properties.language] = this.properties.lang;
    this.update();
    setLanguage(this.properties.language);
  }

  addSymbol(e) {
    for (let x = 0; x < mass.length; x++) {
      for (let y = 0; y < mass[x].length; y++) {
        if ((mass[x][y].code.toLowerCase() === e.toLowerCase())
              && (mass[x][y].controlElement !== true)) {
          const cursorPosition = this.elements.area.selectionStart;
          const textBeforeCursor = this.elements.area.value.substring(0, cursorPosition);
          const textAfterCursor = this.elements.area.value.substring(cursorPosition);
          this.elements.area.value = `${textBeforeCursor}${this.getSymbol(mass[x][y])}${textAfterCursor}`;
          this.elements.area.selectionStart = cursorPosition + 1;
          this.elements.area.selectionEnd = cursorPosition + 1;
        }
      }
    }
  }

  addChar(char, number) {
    const cursorPosition = this.elements.area.selectionStart;
    const textBeforeCursor = this.elements.area.value.substring(0, cursorPosition);
    const textAfterCursor = this.elements.area.value.substring(cursorPosition);
    this.elements.area.value = `${textBeforeCursor}${char}${textAfterCursor}`;
    this.elements.area.selectionStart = cursorPosition + number;
    this.elements.area.selectionEnd = cursorPosition + number;
  }

  backspaceRemove(value) {
    if (value) {
      const start = this.elements.area.selectionStart;
      const end = this.elements.area.selectionEnd;
      if (start !== end) {
        this.elements.area.value = `${this.elements.area.value.substring(0, start)
          + this.elements.area.value.substring(end)}`;
        this.elements.area.selectionStart = start;
        this.elements.area.selectionEnd = start;
      } else if (start !== 0) {
        this.elements.area.value = `${this.elements.area.value.substring(0, start - 1)
          + this.elements.area.value.substring(end)}`;
        this.elements.area.selectionStart = start - 1;
        this.elements.area.selectionEnd = start - 1;
      } else if (end === 0) return;
    } else {
      const start = this.elements.area.selectionStart;
      const end = this.elements.area.selectionEnd;
      this.elements.area.value = `${this.elements.area.value.substring(0, start)
        + this.elements.area.innerText
        + this.elements.area.value.substring(end)}`;
      this.elements.area.selectionStart = start + 1;
      this.elements.area.selectionEnd = start + 1;
    }
  }

  deleteChar(value) {
    if (value) {
      const start = this.elements.area.selectionStart;
      const end = this.elements.area.selectionEnd;
      if (start === end) {
        this.elements.area.value = `${this.elements.area.value.substring(0, start)
          + this.elements.area.value.substring(start + 1)}`;
        this.elements.area.selectionEnd = start;
        this.elements.area.selectionStart = start;
      } else {
        this.elements.area.value = `${this.elements.area.value.substring(0, start)
          + this.elements.area.value.substring(end)}`;
        this.elements.area.selectionEnd = start;
        this.elements.area.selectionStart = start;
      }
    }
  }

  getSymbol(key) {
    if (key.controlElement) return key.data;
    const value = `${this.properties.shift
      ? key.shift[this.properties.language]
      : key.data[this.properties.language]}`;
    const upperCase = this.properties.capsLock !== this.properties.shift;
    return upperCase ? value.toUpperCase() : value.toLowerCase();
  }

  update() {
    for (let x = 0; x < mass.length; x++) {
      for (let y = 0; y < mass[x].length; y++) {
        const itemKey = document.getElementById(`${mass[x][y].code.toLowerCase()}`);
        if (itemKey.childNodes[0]) {
          itemKey.childNodes[0].textContent = this.getSymbol(mass[x][y]);
        }
      }
    }
  }

  createRows() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < mass.length; i++) {
      const row = document.createElement('div');
      row.className = `${'keyboard__row'} ${`row${i + 1}`}`;
      for (let j = 0; j < mass[i].length; j++) {
        const itemKey = document.createElement('div');
        itemKey.classList.add('item');
        itemKey.id = (`${mass[i][j].code.toLowerCase()}`);
        itemKey.textContent = this.getSymbol(mass[i][j]);
        row.append(itemKey);
      }
      fragment.append(row);
    }
    return fragment;
  }

  clickKey() {
    document.addEventListener('mousedown', (e) => {
      this.elements.area.focus();
      this.addSymbol(e.target.id);

      if (e.target.id === 'backspace') {
        this.elements.area.focus();
        this.backspaceRemove(e);
      }

      if (e.target.id === 'delete') {
        this.elements.area.focus();
        this.deleteChar(e);
      }

      if (e.target.id === 'space') {
        this.elements.area.focus();
        this.addChar(' ', 1);
      }

      if (e.target.id === 'tab') {
        this.elements.area.focus();
        this.addChar('    ', 4);
      }

      if (e.target.id === 'capslock') {
        this.properties.capsLock = !this.properties.capsLock;
        e.target.classList.toggle('active');
        this.elements.capsLock = e.target.id;
        this.update();
      }

      if (e.target.id === 'enter') {
        this.elements.area.focus();
        this.addChar('\n', 1);
      }

      if (e.target.id === 'shiftleft' || e.target.id === 'shiftright') {
        if (!this.elements.shift) {
          this.elements.shift = e.target.id;
          e.target.classList.add('active');
          this.properties.shift = true;
          this.update();
        }
      }
    });

    document.addEventListener('mouseup', (e) => {
      if (e.target.id === 'shiftleft' || e.target.id === 'shiftright') {
        if (this.elements.shift === e.target.id) {
          this.elements.shift = null;
          e.target.classList.remove('active');
          this.properties.shift = false;
          this.update();
        }
      }
    });
  }
}
const newVirtualKeyboard = new VirtualKeyboard();
window.addEventListener('DOMContentLoaded', () => {
  newVirtualKeyboard.init();
});
