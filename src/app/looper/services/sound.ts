import { SoundsBuffer } from './sounds-buffer';

export class Sound {

    ctx:AudioContext;
    gainNode:GainNode;
    buffer:SoundsBuffer;
    sounds:any;
    source:any;
    analyser: any;
    public waveform: any;
    animationFrame: any;
    currentBuffer;
    metaData: any;
    frequencyData: any;
    duration: any;

    constructor(context: AudioContext, metaData) {
        this.metaData = metaData;
        this.ctx = context;
        this.buffer = new SoundsBuffer(this.ctx, metaData);
        this.buffer.loadAll()
            .then(bufferMap => {
                this.sounds = bufferMap; // observable ?
                this.initAudioSource();
            })
    }
    // not in use
    initAudioSource() { // update to instatiating a sound
        this.source = this.ctx.createBufferSource();
        this.source.buffer = this.sounds.get(this.metaData[0].beatTrack);
        this.analyser = this.ctx.createAnalyser();
        this.gainNode = this.ctx.createGain();
        this.gainNode.connect(this.analyser);
        this.waveform = new Float32Array(this.analyser.frequencyBinCount);
        this.analyser.getFloatTimeDomainData(this.waveform);
    }

    get waveformData() {
        return this.waveform;
    }

    playSoundLoop = (buffer, time) => {
        // this.currentBuffer = this.sounds.get(buffer); // soundName 
        // this.source.buffer = this.sounds.get(buffer); //this.currentBuffer
        this.initAudioSource();
        this.source.loop = true;
        this.duration = this.source.buffer.duration;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);
        this.gainNode.gain.setValueAtTime(1, this.ctx.currentTime);
        this.source.start(time);
        this.updateWaveform();
    }

    updateWaveform() {
        this.animationFrame = requestAnimationFrame(this.updateWaveform.bind(this));
        this.analyser.getFloatTimeDomainData(this.waveform);
    }
    
    loopSample = (beatData) => { // call play sound loop directly extra method only create starTime, might need this to play vocals and beat
        var startTime = this.ctx.currentTime + 0.100;
        this.playSoundLoop(beatData.beatTrack, startTime);
    }

    stopLoopPlayback = () => {
        var stopTime = this.ctx.currentTime;
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, stopTime + 1);
        this.source.stop(stopTime + 1);
        cancelAnimationFrame(this.animationFrame);
    }

}
