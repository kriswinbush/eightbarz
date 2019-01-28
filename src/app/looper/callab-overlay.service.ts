import { Injectable, InjectionToken, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { LoadAudioComponent } from '../looper/load-audio/load-audio.component';
import { CallabOverlayRef } from './callab-overlay-ref';

interface CallabOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: any; // Callabo interface
}

const DEFAULT_CONFIG: CallabOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'callab-overlay-panel',
}
export const DAW_DIALOG_DATA = new InjectionToken<any>('DAW_DIALOG_DATA'); //Callab interface
@Injectable({
  providedIn: 'root'
})
export class CallabOverlayService {

  constructor(private overlay: Overlay, private injector: Injector) { }
  
  private createInjector(config: CallabOverlayConfig, dialogRef: CallabOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(CallabOverlayRef, dialogRef);
    injectionTokens.set(DAW_DIALOG_DATA, config.data)
    return new PortalInjector(this.injector, injectionTokens)
  }

  private getOverlayConfig(config: CallabOverlayConfig ): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: CallabOverlayConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  open(config: CallabOverlayConfig = {}, beat) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config, ...{ data: beat }};
    const overlayRef = this.createOverlay(dialogConfig);
    const dialogRef = new CallabOverlayRef(overlayRef);
   /*  const loadAudioPortal = new ComponentPortal(LoadAudioComponent); */
    // load sounds here then continue
    overlayRef.backdropClick().subscribe(() => dialogRef.close());
    this.attachDialogContainer(overlayRef, dialogConfig, dialogRef );
    // overlayRef.attach(loadAudioPortal);
    return dialogRef;
  }

  private attachDialogContainer(overlayRef: OverlayRef, config: CallabOverlayConfig, dialogRef: CallabOverlayRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(LoadAudioComponent, null, injector);
    const containerRef: ComponentRef<LoadAudioComponent> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }
}
