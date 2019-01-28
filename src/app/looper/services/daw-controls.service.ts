import { Injectable, Inject } from '@angular/core';
import { WINDOW } from "../../core/window.service";
import { Sound } from './sound';
import { AngularFireStorage } from '@angular/fire/storage';
import { tap, switchMap } from "rxjs/operators";
import { AuthService, User } from '../../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DawControlsService {
  mediaRec:any;
  // audioChunks:any;
  audioBlob:any;
  audioUrl:any;
  samplePlayer:Sound
  vocals:HTMLAudioElement;
  ctx: AudioContext;
  beatData: any;
  playbackType: any; // record, play, playback
  vocalSource: any;
  vocalAnalyser: any;
  vocalDataArray: any;
  vocalBufferLength:any;
  user: User;
  constructor(
    @Inject(WINDOW) private window:Window,
    private storage: AngularFireStorage,
    private auth: AuthService
  ) {
    this.auth.user
      .subscribe( (user: User) => {
        this.user = user;
      })
    this.ctx = new (AudioContext || window['webKitAudioContext'])();
  }
  saveBars(beatData) {
    console.log(beatData);
    let file = new File([this.audioBlob], `${this.user.uid}_${beatData.id}`,{type: 'audio/ogg'});
    console.log(file)
  }
  loadMusic(beatData) {
    this.beatData = beatData;
    const path = this.beatData.beatPath;
    return this.storage.ref(path).getDownloadURL()
      .pipe(
        switchMap((url) =>{
          console.log("this is it");
          this.beatData.dlURl = url;
          this.samplePlayer = new Sound(this.ctx, [this.beatData]);
          console.log(this.samplePlayer);
          return [this.samplePlayer]
        })
      );
  }

  startPlayback(callaboData) {
    console.log(callaboData)
    return new Promise((resolve, reject) => {
      this.vocals = new Audio(this.audioUrl);
      this.samplePlayer.loopSample(callaboData);
      this.vocals.play();
      resolve(callaboData);
    })
  }

  startRecord(callaboData) {
    this.playbackType = "record";
    return window.navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        let chunks = [];

        this.vocalAnalyser = this.ctx.createAnalyser();
        this.vocalSource = this.ctx.createMediaStreamSource(stream);
        this.vocalSource.connect(this.vocalAnalyser);
        this.visualize(stream);

        this.mediaRec = new this.window['MediaRecorder'](stream);
        this.mediaRec.start();

        this.samplePlayer.loopSample(this.beatData);

        this.mediaRec.addEventListener('dataavailable', event => {
          chunks.push(event.data);
        });

        this.mediaRec.addEventListener('stop', () => {
            this.audioBlob = new Blob(chunks, {type: 'audio/ogg;'});
            stream.getAudioTracks().forEach(track => track.stop());
            this.audioUrl = URL.createObjectURL(this.audioBlob);
        });
        return stream;
      });
  }

  visualize(stream) {
    // this.vocalAnalyser.fftSize = 1024;
    this.vocalBufferLength = this.vocalAnalyser.frequencyBinCount;
    this.vocalDataArray = new Uint8Array /* Float64Array */(this.vocalBufferLength);
    this.vocalSource.connect(this.ctx.destination);
  }

  playBackRec() {
    this.vocals = new Audio(this.audioUrl);
    this.samplePlayer.loopSample(this.beatData);
    this.vocals.play();
  }

  stopPlayBack() {
    if (this.playbackType === "record") {
      this.playbackType = "normal";
      this.mediaRec.stop();
    } else {
      this.vocals.pause();
    }
    this.samplePlayer.stopLoopPlayback();
  }
}
