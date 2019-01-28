import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { UploadService, Beat } from '../upload.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from "rxjs/operators";

export class UploadListDataSource implements DataSource<Beat> {

    private UploadListSubject = new BehaviorSubject<Beat[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private upLoad: UploadService) {
        upLoad.beats
            .subscribe( d => console.log(d))
    }

    connect(collectionViewer: CollectionViewer): Observable<Beat[]> {
        return this.UploadListSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.UploadListSubject.complete();
        this.loadingSubject.complete();
    }

    loadBeats() {
        this.loadingSubject.next(true);
        console.log(this.upLoad.user);
        this.upLoad.beats
            .subscribe(beatsList => {
                console.log(beatsList);
                this.UploadListSubject.next(beatsList);
                this.loadingSubject.next(false);
            })
    }
}
