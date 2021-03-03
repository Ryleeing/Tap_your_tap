// 去除敲击序列中的暂停区间
// function normalizeSequence(sequence) {
//   let curStartTime = 0;
//   let havePassedTime = 0;
//   let targetSeq = [];
//   for (let item of sequence) {
//     switch (item.type) {
//       case 'start':
//       case 'restart': {
//         curStartTime = item.time;
//         break;
//       }
//       case 'pause':
//       case 'stop': {
//         havePassedTime += item.time - curStartTime;
//         break;
//       }
//       case 'music': {
//         targetSeq.push({
//           time: havePassedTime + (item.time - curStartTime),
//           audio: item.audio,
//           animation: item.animation,
//         });
//         break;
//       }
//     }
//   }
//   return {
//     duration: havePassedTime,
//     sequence: targetSeq,
//   };
// }

const audio00 = './assets/audio/沙锤.mp3';
const audio01 = './assets/audio/脚鼓.mp3';
const audio02 = './assets/audio/饶钹.mp3';
const audio10 = './assets/audio/踏钹.mp3';
const audio11 = './assets/audio/军鼓.mp3';
const audio12 = './assets/audio/掌声.mp3';
const bgMusic = './assets/audio/bgmusic.mp3';

const musicFragments = [
  [audio00, audio01, audio02],
  [audio10, audio11, audio12],
];

function getCurBgColor(bgChangeCnt) {
  const colors = ['#efcb7b','#0d1831', '#ff9b83', '#61bfad'];
  bgChangeCnt /= 5;
  return colors[bgChangeCnt % 4];
}

const elmOverlay = document.querySelector('.shape-overlays');
const overlay = new ShapeOverlays(elmOverlay);

let bgChangeCnt = 0;

function changeBackground() {
  if (overlay.isAnimating) {
    return false;
  }
  bgChangeCnt += 1;
  if (bgChangeCnt % 10 === 0) {
    document.documentElement.style.setProperty('--color-bg', getCurBgColor(bgChangeCnt));
  } else if (bgChangeCnt % 5 === 0) {
    document.documentElement.style.setProperty('--path-fill-4', getCurBgColor(bgChangeCnt));
  }
  if (bgChangeCnt % 5 === 0) {
    overlay.toggle();
  }
}

let bgMusicObj = null;
let isRecording = false;
let recordingSequence = [];

function setRecordingTrue() {
  isRecording = true;
  document.querySelector('#recording').style.display = 'flex';
  document.querySelector('#notrecording').style.display = 'none';
}

function setRecordingFalse() {
  isRecording = false;
  document.querySelector('#recording').style.display = 'none';
  document.querySelector('#notrecording').style.display = 'flex';
}

function startRecording() {
  bgChangeCnt = 0;
  setRecordingTrue();
  if (recordingSequence.length === 0) {
    bgMusicObj = new Audio(bgMusic);
    recordingSequence.push({
      type: 'start',
      time: Date.now(),
    });
  } else {
    recordingSequence.push({
      type: 'restart',
      time: Date.now(),
    });
  }
  bgMusicObj.play();
}

function pauseRecording() {
  bgMusicObj.pause();
  setRecordingFalse();
  recordingSequence.push({
    type: 'pause',
    time: Date.now(),
  });
}
function stopRecording() {
  bgMusicObj.pause();
  bgMusicObj = null;
  setRecordingFalse();
  recordingSequence.push({
    type: 'stop',
    time: Date.now(),
  });
  // replay();
  recordingSequence = [];
}
function stroke(row, col) {
  new Audio(musicFragments[row][col]).play();
  changeBackground();
  if (isRecording) {
    recordingSequence.push({
      type: 'music',
      time: Date.now(),
      audio: musicFragments[row][col],
      animation: animations[3 * row + col],
    });
  }
}
// function replay() {
//   const { duration, sequence } = normalizeSequence(recordingSequence);
//   const replayBgMusicObj = new Audio(bgMusic);
//   bgChangeCnt = 0;
//   replayBgMusicObj.play();
//   setTimeout(() => {
//     replayBgMusicObj.pause();
//   }, duration);
//   for (let item of sequence) {
//     setTimeout(() => {
//       changeBackground();
//       new Audio(item.audio).play();
//       item.animation();
//     }, item.time);
//   }
// }

document.querySelector('#rect11').onclick = function () {
  stroke(0, 0);
  animations[0]();
};
document.querySelector('#rect12').onclick = function () {
  stroke(0, 1);
  animations[1]();
};
document.querySelector('#rect13').onclick = function () {
  stroke(0, 2);
  animations[2]();
};
document.querySelector('#rect21').onclick = function () {
  stroke(1, 0);
  animations[3]();
};
document.querySelector('#rect22').onclick = function () {
  stroke(1, 1);
  animations[4]();
};
document.querySelector('#rect23').onclick = function () {
  stroke(1, 2);
  animations[5]();
};

document.querySelector('#pauseIcon').onclick = pauseRecording;
document.querySelector('#stopIcon').onclick = stopRecording;
document.querySelector('#startIcon').onclick = startRecording;

//添加键盘敲击事件
document.onkeydown = function (evt) {
  const keyCode = evt.keyCode;
  if (keyCode < 65 || keyCode > 90) {
    return;
  }
  if (keyCode === 81) {
    keydown(0, 0, 0);
  } else if (keyCode === 87) {
    keydown(0, 1, 1);
  } else if (keyCode === 69) {
    keydown(0, 2, 2);
  } else if (keyCode === 65) {
    keydown(1, 0, 3);
  } else if (keyCode === 83) {
    keydown(1, 1, 4);
  } else if (keyCode === 68) {
    keydown(1, 2, 5);
  } else {
    switch (keyCode % 6) {
      case 0:
        keydown(0, 0, 0);
        break;
      case 1:
        keydown(0, 1, 1);
        break;
      case 2:
        keydown(0, 2, 2);
        break;
      case 3:
        keydown(1, 0, 3);
        break;
      case 4:
        keydown(1, 1, 4);
        break;
      case 5:
        keydown(1, 2, 5);
        break;
      default:
        break;
    }
  }
};
function keydown(i, j, k) {
  stroke(i, j);
  animations[k]();
}
