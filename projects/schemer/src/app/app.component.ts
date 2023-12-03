import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VeronaAPIService, VosStartCommand} from "./verona-api.service";
import {Subject, takeUntil} from "rxjs";
import {CodingScheme, VariableInfo} from "@iqb/responses";
import {SchemerComponent} from "@iqb/ngx-coding-components";

@Component({
  selector: 'app-root',
  template: `
    <mat-drawer-container class="coder-body">
      <mat-drawer #drawer mode="side" *ngIf="isStandalone">
        <schema-checker [codingScheme]="codings"></schema-checker>
      </mat-drawer>
      <mat-drawer-content class="drawer-content">
        <div>
          <button mat-icon-button (click)="drawer.toggle()" [matTooltip]="drawer.opened ? 'Check ausblenden' : 'Check einblenden'">
            <mat-icon>{{drawer.opened ? 'chevron_left' : 'chevron_right'}}</mat-icon>
          </button>
        </div>
        <iqb-schemer class="drawer-schemer"
                     [varList]="varList"
                     [codingScheme]="codings"
        ></iqb-schemer>
      </mat-drawer-content>
    </mat-drawer-container>
    <schemer-load-save *ngIf="isStandalone" [varList]="varList" [codingScheme]="codings" [style.height.px]="0"></schemer-load-save>
    `,
  styles: [
    `
        .coder-body {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          bottom: 0;
          padding: 0;
          margin: 0;
          flex-direction: row;
          justify-content: space-between;
          align-items: stretch;
        }
      `,
    `
        .drawer-button {
          flex: 0 0 40px;
        }
      `,
    `
        .drawer-content {
          padding: 0;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: stretch;
          overflow: unset;
        }
      `
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(SchemerComponent) schemerElement: SchemerComponent | undefined;
  private ngUnsubscribe = new Subject<void>();
  isStandalone: boolean = window === window.parent;
  varList: VariableInfo[] = [];
  codings: CodingScheme | null = null;
  title = 'schemer';
  constructor(
    private veronaAPIService: VeronaAPIService
  ) { }

  ngOnInit(): void {
    this.veronaAPIService.sendVosReadyNotification(this.veronaAPIService.metadata);
    this.veronaAPIService.vosStartCommand
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((message: VosStartCommand) => {
        this.varList = message.variables;
        if (message.codingScheme) {
            const codingScheme = JSON.parse(message.codingScheme);
            this.codings = new CodingScheme(codingScheme.variableCodings);
        }
      });
    if (this.schemerElement) {
      this.schemerElement.codingSchemeChanged
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          () => this.veronaAPIService.sendVosSchemeChangedNotification(this.codings)
        )
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
