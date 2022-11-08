import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { VariableInfo, CodingSchemeDto } from '@response-scheme';

@Injectable({
  providedIn: 'root'
})
export class VeronaAPIService {
  sessionID: string = '';
  private _vosStartCommand = new Subject<VosStartCommand>();

  private isStandalone = (): boolean => window === window.parent;

  constructor() {
    fromEvent(window, 'message')
      .subscribe((event: Event): void => {
        this.handleMessage((event as MessageEvent).data);
      });
  }

  private handleMessage(messageData: VosStartCommand): void {
    if (messageData.type === 'vosStartCommand') {
      this.sessionID = messageData.sessionId;
      this._vosStartCommand.next(messageData as VosStartCommand);
    } else if (['webpackOk', 'webpackClose'].indexOf(messageData.type) < 0) {
      console.warn('schemer: got message of unknown type', messageData);
    }
  }

  private send(message: Record<string, string> | VosSchemeChangedData): void {
    // prevent posts in local (dev) mode
    if (!this.isStandalone()) {
      window.parent.postMessage(message, '*');
    } else {
      console.log('schemer: send ', message);
    }
  }

  sendVosReadyNotification(metaData: Record<string, string>): void {
    this.send({
      type: 'vosReadyNotification',
      ...metaData
    });
  }

  sendVosSchemeChangedNotification(scheme: CodingSchemeDto, derivedVariables: VariableInfo[]): void {
    this.send(<VosSchemeChangedData>{
      type: 'vosSchemeChangedNotification',
      sessionId: this.sessionID,
      timeStamp: String(Date.now()),
      codingScheme: JSON.stringify(scheme),
      codingSchemeType: 'iqb@1.1',
      variables: derivedVariables
    });
  }

  get vosStartCommand(): Observable<VosStartCommand> {
    return this._vosStartCommand.asObservable();
  }
}

export interface VosStartCommand {
  type: 'vosStartCommand'
  sessionId: string,
  codingScheme?: string,
  codingSchemeType?: string,
  variables: VariableInfo[]
}

export interface VosSchemeChangedData {
  type: 'vosSchemeChangedNotification'
  sessionId: string,
  timeStamp: string,
  codingScheme: string,
  codingSchemeType: 'iqb@1.1',
  variables: VariableInfo[]
}
