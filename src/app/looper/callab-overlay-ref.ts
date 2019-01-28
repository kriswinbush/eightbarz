import { OverlayRef } from '@angular/cdk/overlay';

export class CallabOverlayRef {
    constructor(private overlayRef: OverlayRef) {}

    close(): void {
        this.overlayRef.dispose();
    }
}
