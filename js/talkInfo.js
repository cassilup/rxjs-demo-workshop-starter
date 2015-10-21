import Rx from 'rx';


const talkInfo = {
  name: 'Vlad Zelinschi',
  nickname: 'Reign',
  occupation: 'Check Facebook, scroll Twitter, watch Youtube videos all day long.',
  realOccupation: 'See above, you douchebag!',
  whatMyBossThinksIDo: 'UI Tech Lead @ 3Pillar Global',
  talkTitle: 'Client-side reactive programming using RxJS',
  isTheSpeakerReady: '...definately NO!'
};


(() => {

  let talkInfoInput = document.querySelector('.talk-info');
  let talkInfoStream = Rx.Observable.fromEvent(talkInfoInput, 'keyup');

  talkInfoStream
    .map(e => e.target.value)
    .distinctUntilChanged()
    .subscribe(val => {
      if (talkInfo[val]) {
        console.log(talkInfo[val]);
      }
    });

})();
