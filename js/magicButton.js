import Rx from 'rx';
import doFinale from './doFinale';


(() => {

  let active = false;
  let app = document.querySelector('#app');

  let magicBtn = document.querySelector('#magicButton');
  let magicBtnStream = Rx.Observable.fromEvent(magicBtn, 'click');

  magicBtnStream
    .subscribe(() => {
      active = true;
      doFinale.start();
      app.classList.add('finale-start');
    });

  let finaleCloseIcon = document.querySelector('#finaleCloseIcon');
  let finaleCloseIconStream = Rx.Observable.fromEvent(finaleCloseIcon, 'click');

  finaleCloseIconStream
    .subscribe(() => {
      active = false;
      doFinale.end();
      app.classList.remove('finale-start');
    });

})();
