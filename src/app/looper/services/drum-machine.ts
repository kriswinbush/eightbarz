import { SoundsBuffer } from './sounds-buffer';
export class drumMachine {
    ctx:AudioContext;
    buffer:SoundsBuffer;
    SOUND_URLS:Array<string> = ['/assets/samples/hiphoploop.ogg','/assets/samples/clap.ogg','/assets/samples/kick.ogg','/assets/samples/hh.ogg'];
    sounds:any;
    oscillator:OscillatorNode;
    constructor(context) {
        this.ctx = context;
        this.buffer = new SoundsBuffer(this.ctx,this.SOUND_URLS);
        this.buffer.loadAll().then(buffer => this.sounds = buffer)
    }
    playSound = (buffer,time) => {
        let source = this.ctx.createBufferSource();
        source.buffer = this.sounds.get(buffer);
        source.connect(this.ctx.destination);
        source.start(time);
    }

    loop = () => {
        var startTime = this.ctx.currentTime + 0.100;
        var tempo = 80; // BPM (beats per minute)
        var eighthNoteTime = (60 / tempo) / 2;

        // Play 2 bars of the following: /measure
        for (var bar = 0; bar < 8; bar++) {
            var time = startTime + bar * 8 * eighthNoteTime;
            // Play the bass (kick) drum on beats 1, 5
            this.playSound('kick.ogg', time);
            this.playSound('kick.ogg', time + 4 * eighthNoteTime);

            // Play the snare drum on beats 3, 7
            this.playSound('clap.ogg', time + 2 * eighthNoteTime);
            this.playSound('clap.ogg', time + 6 * eighthNoteTime);

            // Play the hi-hat every eighthh note.
            for (var i = 0; i < 8; ++i) {
                this.playSound('hh.ogg', time + i * eighthNoteTime);
            }
        }
        
    }

    stopRecord = () => {
        var stopTime = this.ctx.currentTime + 0.100;
        //this.gainNode.gain.exponentialRampToValueAtTime(0.001, stopTime + 1);
        //this.source.stop(stopTime + 1);
    }
}


     /* init = () => {
        this.oscillator = this.ctx.createOscillator();
        this.gainNode = this.ctx.createGain();
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);
        this.oscillator.type = 'sine';
    }

    play = (value, time) => {
        this.init();
        this.oscillator.frequency.value = value;
        this.gainNode.gain.setValueAtTime(1, this.ctx.currentTime);
        this.oscillator.start(time);
        this.stop(time);
    } */