import { Observable } from 'rxjs';
export class SoundsBuffer {

    mapBuffer:Map<string, AudioBuffer> = new Map();
    ctx:AudioContext;
    metaData: any;

    constructor(context, metaData) {
        this.ctx = context;
        this.metaData = metaData;
        console.log(this.metaData)
    }
    getSoundsFromSource$(beatData) {
        return Observable.create( async (observer) => {
            let name = beatData.beatTrack;
            let request = await fetch(beatData.dlURl);
            let response = await request.arrayBuffer();
            let buffer = await this.ctx.decodeAudioData(response);
            observer.next(buffer);
            observer.complete();
        })
    }
    loadSound = async(beatData) => {
        // create promise to return beat and vocal.
        let name = beatData.beatTrack;
        let request = await fetch(beatData.dlURl);
        let response = await request.arrayBuffer();
        let soundBuffer = await this.ctx.decodeAudioData(response); // new (AudioContext || window['webKitAudioContext'])();
        /* this.getSoundsFromSource$(beatData)
            .subscribe(soundBuffer => {
                console.log(soundBuffer)
                this.mapBuffer.set(name, soundBuffer);    
            }) */
        this.mapBuffer.set(name, soundBuffer);
        // no need to return
        return {name,soundBuffer};
    };

    loadAll = () => {
        var sounds = this.metaData.map( data => this.loadSound(data) );
        console.log(sounds);
        return Promise.all([...sounds])
                .then(buf => {
                    console.log(buf)
                    return this.mapBuffer;
                })
    };

    getSound = (name) => {
        return this.mapBuffer.get(name);
    }
}
