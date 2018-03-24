class JoyTest {
  constructor() {
    this.blobs = document.querySelectorAll('.blob');
    this.pressed = 'none';
    this.h1 = document.getElementById('h1');
    this.commandEl = document.getElementById('command-handler');
    this.robotUrl = 'http://192.168.4.1/?serialprint=';

    this.blobs.forEach((blob) => {
      blob.value = blob.id.toLowerCase();
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
          this.buttonCommand(index);
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
      this.sendCommand('q');
    } else if (axis && round(axis[0]) === 1) {
      console.log('Right Pressed');
      this.pressed = 'right';
      this.sendCommand('e');
    }

    // Up & Down
    else if (axis && round(axis[1]) === -1) {
      console.log('Up Pressed');
      this.pressed = 'up';
      this.sendCommand('u');
    } else if (axis && round(axis[1]) === 1) {
      console.log('Down Pressed');
      this.pressed = 'down';
      this.sendCommand('d');
    } else {
      console.log('stoppig');
      this.sendCommand('s');
      this.pressed = 'none';
    }
  }

  buttonCommand(button) {
    // let pressed = '';
    switch(button) {
      case 0:
        console.log('Button X Pressed');
        this.pressed = 'x';
        this.sendCommand('x');
        break;
      case 1:
        console.log('Button A Pressed');
        this.pressed = 'a';
        this.sendCommand('a');
        break;
      case 2:
        console.log('Button B Pressed');
        this.pressed = 'b';
        this.sendCommand('b');
        break;
      case 3:
        console.log('Button Y Pressed');
        this.pressed = 'y';
        this.sendCommand('y');
        break;
      case 4:
        console.log('Button L Pressed');
        this.pressed = 'l';
        this.sendCommand('l');
        break;
      case 5:
        console.log('Button R Pressed');
        this.pressed = 'r';
        this.sendCommand('r');
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
        console.log('Button not mapped to command: ', button);
        this.pressed = 'none';
        break;
    }
  }

  highlightBlob(blobs, pressed) {
    [...blobs].filter((blob) => {
      if (blob.value === pressed){
        blob.focus();
        this.pressed = 'none';
      }
    });
    this.pressed = 'none';
  }

  sendCommand(command) {
    this.commandEl.src = `${this.robotUrl}${command}`;
  }
}

new JoyTest();

function round(v) {
    return (v >= 0 || -1) * Math.round(Math.abs(v));
}
