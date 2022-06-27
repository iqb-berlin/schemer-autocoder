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
      .subscribe((message: VosStartCommand) => this.setVariables(message));
    this.mainDataService.codingSchemesChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(scheme => this.veronaAPIService
        .sendVosSchemeChangedNotification( scheme));

  }

  private setVariables(message: VosStartCommand): void {
    this.mainDataService.selectedScheme$.next(null);
    this.mainDataService.varList = message.variables;
    this.mainDataService.codingSchemes = [];
    this.mainDataService.varList.sort(function (a, b) {
      const idA = a.id.toUpperCase();
      const idB = b.id.toUpperCase();
      if (idA < idB) return -1;
      if (idA > idB) return 1;
      return 0;
    });
    this.mainDataService.syncVariables();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}