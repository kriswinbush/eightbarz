import { Injectable } from '@angular/core';
import { of, forkJoin, defer, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SoundSampleService {
  sampleBuffer: Map<string, AudioBuffer> = new Map();

  constructor(
    private storage: AngularFireStorage
  ) { }

  restMusic(callabData) {
    const path = callabData.beatPath;
    return this.storage.ref(path).getDownloadURL()
  }

  async loadSample(sampleData) {
      let ctx: AudioContext = new (AudioContext || window['webKitAudioContext'])();
      let beatFileName = sampleData.beatTrack;
      let req = await fetch(sampleData.dlUrl);
      let res = await req.arrayBuffer();
      let decodedSample = await ctx.decodeAudioData(res)
      return {beatFileName, decodedSample};
  }

  loadAllAudio(callabData) {
    console.log(callabData)
    return from(this.loadSample(callabData));
  }
}




