'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  potato: 'potato',
  wheat: 'wheat',
  boar: 'boar'
});

export class Field {
  constructor (potatoCount, wheatCount, boarCount) {
    this.potatoCount = potatoCount;
    this.wheatCount = wheatCount;
    this.boarCount = boarCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect(); // 필드 x, y 위치 파악
    this.field.addEventListener('click', this.onClick);
  }

  init(potatoCount, wheatCount, boarCount) {
    // 누를 때마다 필드 초기화
    this.field.innerHTML = '';
    this._addItem('potato', potatoCount, 'img/potatoImg.png');
    this._addItem('wheat', wheatCount, 'img/wheatImg.png');
    this._addItem('boar', boarCount, 'img/boarImg.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  
  onClick = e => {
    // 필드 내에 있는 전체 아이템들을 가져온다.
    const target = e.target;
    if (target.matches('.potato')) {
      target.remove(); // 누른 아이템 필드에서 제거
      sound.playCarrot(); // 효과음
      this.onItemClick && this.onItemClick(ItemType.potato);
    } else if (target.matches('.wheat')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.wheat);
    } else if (target.matches('.boar')) {
      this.onItemClick && this.onItemClick(ItemType.boar);
    }
  }
}

function randomNumber(min, max) {
  // 랜덤 배치
  return Math.random() * (max - min) + min;
}