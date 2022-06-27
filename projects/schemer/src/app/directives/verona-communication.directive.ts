import { Directive, OnDestroy, OnInit } from '@angular/core';
import { MainDataService } from '../services/main-data.service';
import { VeronaAPIService, VosStartCommand } from '../services/verona-api.service';
import { Subject, takeUntil } from 'rxjs';
import { MetaDataService } from '../services/meta-data.service';

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
    this.mainDataService.codingSchemesChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(scheme => this.veronaAPIService.sendVosSchemeChangedNotification( scheme));
  }

  private initMainDataService(message: VosStartCommand): void {
    this.mainDataService.selectedScheme$.next(null);
    this.mainDataService.setSortedVarList(message.variables);
    this.mainDataService.codingSchemes = message.codingScheme ? JSON.parse(message.codingScheme) : [];
    this.mainDataService.syncVariables();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
