'use strick';

export default class PopUp {
  constructor() {
  this.popUp = document.querySelector('.pop-up');
  this.popUpText = document.querySelector('.pop-up__message');
  this.popUpRefresh = document.querySelector('.pop-up__refresh');
  this.popUpRefresh.addEventListener('click', () => {
    this.onClick && this.onClick();
    this.hide();
    })
  }

  // 팝업 클릭시 이걸 호출한다.
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.innerText = text; // 텍스트 가져오기
    this.popUp.classList.remove('pop-up--hide');
  }

  // 다시 시작할 때 팝업 없애기
  hide() {
    this.popUp.classList.add('pop-up--hide');
  }
}