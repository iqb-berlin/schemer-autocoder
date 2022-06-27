import { Directive, OnDestroy, OnInit } from '@angular/core';
import { MainDataService } from '../services/main-data.service';
import { VeronaAPIService } from '../services/verona-api.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appVeronaCommunication]'
})
export class VeronaCommunicationDirective implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  constructor(private mainDataService: MainDataService,
              private veronaAPIService: VeronaAPIService) { }

  ngOnInit(): void {
    this.mainDataService.codingSchemesChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(scheme => this.veronaAPIService
        .sendVosSchemeChangedNotification( scheme));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
