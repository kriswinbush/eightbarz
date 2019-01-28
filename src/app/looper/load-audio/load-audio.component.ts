import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { DawControlsService } from "../services/daw-controls.service";
import { CallabOverlayRef } from '../callab-overlay-ref';
import { DAW_DIALOG_DATA } from '../callab-overlay.service';

@Component({
  selector: 'app-load-audio',
  templateUrl: './load-audio.component.html',
  styleUrls: ['./load-audio.component.scss']
})
export class LoadAudioComponent implements OnInit {
  @ViewChild('cvs') cvs: ElementRef;
  cvsCtx: CanvasRenderingContext2D;
  drawCvsReq: any;
  startTime: any;
  durationTime: any;
  sliderIncrement: any

  constructor(
    public daw:DawControlsService,
    public dialogRef: CallabOverlayRef,
    @Inject(DAW_DIALOG_DATA) public beat: any
  ) { }
  
  ngOnInit() {
    this.createContext()
      .then(() => this.drawBarsForm());
  }

  createContext() {
    return new Promise((res, rej) => {
      this.cvsCtx = this.cvs.nativeElement.getContext('2d');
      console.log(this.daw.samplePlayer.source.buffer.length);
      this.cvs.nativeElement.width = 1024; //base off of buffer length
      this.cvs.nativeElement.height = 200;
      res();
    });
  }
  
  saveVocals(beatData) {
    this.daw.saveBars(beatData);
  }

  playback(beat) {
    this.daw.startPlayback(beat) 
      .then((callaboData) => {
        this.beat = callaboData;
        this.sliderIncrement = this.cvs.nativeElement.width / this.daw.samplePlayer.duration;
        this.startTime = this.daw.ctx.currentTime;
        this.durationTime = this.startTime + this.daw.samplePlayer.duration;
        this.drawCvs();
      })
  }
  
  drawCvs() {
    this.drawCvsReq = requestAnimationFrame(this.drawCvs.bind(this));
    this.cvsCtx.clearRect( 0, 0, this.cvs.nativeElement.width, this.cvs.nativeElement.height );
    this.drawBarsForm();
    this.cvsCtx.setTransform(1, 0, 0, 1, 0, 0);
    if(this.daw.playbackType === "record") {
      this.drawWaveform();
    }
    this.cvsCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.drawTimeSlider();
  }

  drawTimeSlider() {
    if (this.daw.ctx.currentTime > this.durationTime) {
      console.log('loop playback here!')
      this.startTime = this.daw.ctx.currentTime;
      this.durationTime = this.startTime + this.daw.samplePlayer.duration;
    }
    let x = this.sliderIncrement * (this.daw.ctx.currentTime - this.startTime);
    this.cvsCtx.save();
    this.cvsCtx.fillStyle = 'rgba(0,255,0,.5)' ;
    this.cvsCtx.fillRect( 0, 0, x, this.cvs.nativeElement.height );
    this.cvsCtx.restore();
  }

  drawWaveform() {
    this.daw.vocalAnalyser.getByteFrequencyData/* getFloatFrequencyData */(this.daw.vocalDataArray);
    const waveform = this.daw.vocalDataArray;
    console.log(waveform)
    this.cvsCtx.save();
    this.cvsCtx.strokeStyle = '#fff';
    this.cvsCtx.lineWidth = 2;
    this.cvsCtx.beginPath();
    for(let i = 0; i < waveform.length; i++) {
      const x = i;
      const y = ( 0.5 + (waveform[i] / 2) ) * this.cvs.nativeElement.height;
      if(i == 0) {
          this.cvsCtx.moveTo(x, y);
      } else {
          this.cvsCtx.lineTo(x, y);
      }
    }
    this.cvsCtx.stroke();
    this.cvsCtx.restore();
  }

  drawBarsForm() {
    const floatBuffer = this.daw.samplePlayer.source.buffer.getChannelData(0);
    const drawLines = 500;
    var leftChannel = floatBuffer;   
    var lineOpacity = this.cvs.nativeElement.width / leftChannel.length;      
    this.cvsCtx.save();
    this.cvsCtx.fillStyle = 'rgba(0,0,0,.9)' ;
    this.cvsCtx.fillRect(0,0, this.cvs.nativeElement.width, this.cvs.nativeElement.height );
    this.cvsCtx.strokeStyle = 'rgba(0,255,0, 1.0)';
    this.cvsCtx.globalCompositeOperation = 'lighter';
    this.cvsCtx.translate(0, this.cvs.nativeElement.height / 2);
    // this.cvsCtx.globalAlpha = 0.06 ; // lineOpacity ;
    this.cvsCtx.lineWidth = 1;
    var totallength = leftChannel.length;
    var eachBlock = Math.floor(totallength / drawLines);
    var lineGap = ( this.cvs.nativeElement.width / drawLines );

    for (let i = 0; i < drawLines; i++) {
      let audioBuffKey = Math.floor(eachBlock * i);
      let x = i * lineGap;
      let y = leftChannel[audioBuffKey] * this.cvs.nativeElement.height / 2;
      this.cvsCtx.beginPath();
      this.cvsCtx.moveTo( x, y );
      this.cvsCtx.lineTo( x, (y*-1) );
      this.cvsCtx.stroke();
    }

    this.cvsCtx.restore();
  }

  rec(beat) {
    this.daw.startRecord(beat)
      .then(stream => {
        console.log(stream);
        this.beat = beat;
        this.sliderIncrement = this.cvs.nativeElement.width / this.daw.samplePlayer.duration;
        this.startTime = this.daw.ctx.currentTime;
        this.durationTime = this.startTime + this.daw.samplePlayer.duration;
        this.drawCvs();
      });
    
  }
  
  stopPlayback() {
    this.daw.stopPlayBack()
    cancelAnimationFrame(this.drawCvsReq);
  }
}
