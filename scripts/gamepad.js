class JoyTest {
  constructor() {
    // this.blobsContainer = document.querySelectorAll('.blobs');
    this.blobs = document.querySelectorAll('.blob');
    this.pressed = '';

    this.blobs.forEach((blob) => {
      blob.value = blob.innerHTML.toLowerCase();
    });

    window.addEventListener('gamepadconnected', (e) => {
      this.stateCheck();
    });
  }

  stateCheck() {
    window.requestAnimationFrame(() => {
      this.gamepads = navigator.getGamepads();
      window.gamepad = this.gamepad;
      this.gamepad = this.gamepads[0];
      window.gamepad = this.gamepad;
      this.padStatus();
      this.stateCheck();
      this.highlightBlob(this.blobs, this.pressed);
    });
  }

  padStatus() {
    this.gamepad.buttons.forEach((button, index) => {
      if (this.blobs[index]){
        this.blobs[index].classList.remove('pressed');
        if (button.pressed) {
          this.sendCommand(index);
        }
      }
    });

    this.directionCommand(this.gamepad.axes);
  }

  directionCommand(axis) {
    // Left & Right
    if (axis && round(axis[0]) === -1) {
      console.log('Left Pressed');
      this.pressed = 'left';
    } else if (axis && round(axis[0]) === 1) {
      console.log('Right Pressed');
      this.pressed = 'right';
    }

    // Up & Down
    if (axis && round(axis[1]) === -1) {
      console.log('Up Pressed');
      this.pressed = 'up';
      fetch('http://192.168.4.1?serialprint=f').then(response => {
      	console.log('fetch response: ', response);
      });
    } else if (axis && round(axis[1]) === 1) {
      console.log('Down Pressed');
      this.pressed = 'down';
    }
  }

  sendCommand(button) {
    // let pressed = '';
    switch(button) {
      case 0:
        console.log('Button X Pressed');
        this.pressed = 'x';
        break;
      case 1:
        console.log('Button A Pressed');
        this.pressed = 'a';
        break;
      case 2:
        console.log('Button B Pressed');
        this.pressed = 'b';
        break;
      case 3:
        console.log('Button Y Pressed');
        this.pressed = 'y';
        break;
      case 4:
        console.log('Button L Pressed');
        this.pressed = 'l';
        break;
      case 5:
        console.log('Button R Pressed');
        this.pressed = 'r';
        break;
      case 8:
        console.log('Button Select Pressed');
        this.pressed = 'select';
        break;
      case 9:
        console.log('Button Start Pressed');
        this.pressed = 'start';
        break;
      default:
        console.log('Button not mapped to command');
        break;
    }
  }

  highlightBlob(blobs, pressed) {
    [...blobs].filter((blob) => {
      blob.classList.remove('pressed');
      if (blob.value === pressed){
        blob.classList.add('pressed');
      }
    });
    this.pressed = '';
  }
}

new JoyTest();

function round(v) {
    return (v >= 0 || -1) * Math.round(Math.abs(v));
}
