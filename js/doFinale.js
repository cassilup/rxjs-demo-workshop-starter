import Rx from 'rx';

// Chrome only implementation
const doFinale = (() => {

  let app = document.querySelector('#app');
  let volumeWrapper = document.querySelector('#volumeWrapper');
  let volumeThresholdDOM = document.querySelector('#volumeThreshold');

  // Volume props
  let volumeBar = document.querySelector('#volumeBar');
  let volumeHeight = parseInt(getComputedStyle(volumeWrapper).height);
  let volumeThreshold = parseInt(getComputedStyle(volumeThresholdDOM).bottom);
  let errorThreshold = 0.1;

  let AudioContext = window.AudioContext || window.webkitAudioContext;
  let ctx = new AudioContext();
  let meter;
  let mediaStreamSource;
  let processor;
  let rafId;

  const onError = () => {
    console.log('Noooooooo!!! Give me audioooooooo!!!');
  };

  const volumeAudioProcess = (ev) => {
	  let buff = ev.inputBuffer.getChannelData(0);
	  let buffLength = buff.length;
    let sum = 0;
	  buff.forEach(el => {
      sum += el * el;
    });
    let rms =  Math.sqrt(sum / buffLength);
    let max = Math.max(rms, processor.volume * processor.averaging);
    processor.volume = max.toFixed(2);
  };

  const createAudioMeter = () => {
    processor = ctx.createScriptProcessor(512);
  	processor.volume = 0;
  	processor.averaging = 0.95;
    processor.onaudioprocess = volumeAudioProcess;
    processor.connect(ctx.destination);
    return processor;
  };

  const updateVolume = () => {
    let newHeight = (meter.volume - errorThreshold) * volumeHeight;
    volumeBar.style.height = newHeight + 'px';

    if (newHeight >= volumeThreshold) {
      app.classList.add('finale-end');
      end();
    }
  };

  const drawLoop = () => {
    updateVolume();
    rafId = window.requestAnimationFrame(drawLoop);
  };

  const start = () => {
    navigator.webkitGetUserMedia({ audio: true }, (stream) => {
      mediaStreamSource = ctx.createMediaStreamSource(stream);
      meter = createAudioMeter();
      mediaStreamSource.connect(meter);
      drawLoop();
    }, onError);
  };

  const end = () => {
    processor.disconnect();
    processor.onaudioprocess = null;

    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = undefined;
    }
  };

  return {
    start,
    end
  };

})();


export default doFinale;
