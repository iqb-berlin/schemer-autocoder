import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { VariableCodingData, VariableInfo } from '@response-scheme';
import { MainDataService } from '../services/main-data.service';
import { VeronaAPIService, VosStartCommand } from '../services/verona-api.service';
import { MetaDataService } from '../services/meta-data.service';
import { Coding } from '../classes/coding.class';

@Directive({
  selector: '[appVeronaCommunication]'
})
export class VeronaCommunicationDirective implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  constructor(private veronaAPIService: VeronaAPIService,
              private metaDataService: MetaDataService,
              private mainDataService: MainDataService) {
  }

  ngOnInit(): void {
    this.veronaAPIService.sendVosReadyNotification(this.metaDataService.metadata);
    this.veronaAPIService.vosStartCommand
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((message: VosStartCommand) => this.initMainDataService(message));
    this.mainDataService.codingSchemeChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(scheme => this.veronaAPIService.sendVosSchemeChangedNotification({
        variableCodings: scheme
      }, scheme.filter(c => c.sourceType !== 'BASE').map(c => <VariableInfo>{
        id: c.id,
        type: 'string',
        format: '',
        multiple: false,
        nullable: false,
        values: []
      })));
  }

  private initMainDataService(message: VosStartCommand): void {
    this.mainDataService.selectedCoding$.next(null);
    this.mainDataService.codings = [];
    this.mainDataService.invalidDataFormat = '';
    this.mainDataService.setSortedVarList(message.variables || []);
    if (message.codingScheme) {
      if (!message.codingSchemeType || message.codingSchemeType === 'iqb@1.1') {
        const codingScheme = JSON.parse(message.codingScheme);
        this.mainDataService.codings = codingScheme.variableCodings.map((c: Partial<VariableCodingData>) => new Coding(c));
      } else {
        this.mainDataService.invalidDataFormat = message.codingSchemeType;
      }
    }
    this.mainDataService.syncVariables();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
