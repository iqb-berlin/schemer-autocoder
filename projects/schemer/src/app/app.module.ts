import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchemerToolbarComponent } from './components/schemer-toolbar.component';
import { AppTranslateLoader } from './app-translate-loader';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SchemerStageComponent } from './components/schemer-stage/schemer-stage.component';
import { FlexModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CodingSchemeComponent } from './components/coding-scheme/coding-scheme.component';
import { NewVarSchemeComponent } from './components/new-var-scheme.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CodeDataComponent } from './components/code/code-data.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SchemeCheckerComponent } from './components/scheme-checker/scheme-checker.component';
import { ShowCodingResultsComponent } from './components/scheme-checker/show-coding-results.component';
import { createCustomElement } from '@angular/elements';
import { VeronaCommunicationDirective } from './directives/verona-communication.directive';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { RichTextEditDialogComponent } from './components/rich-text-editor/rich-text-edit-dialog.component';
import { NgxTiptapModule } from 'ngx-tiptap';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog.component';
import { MessageDialogComponent } from './components/dialogs/message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SchemerToolbarComponent,
    SchemerStageComponent,
    CodingSchemeComponent,
    NewVarSchemeComponent,
    CodeDataComponent,
    ShowCodingResultsComponent,
    SchemeCheckerComponent,
    VeronaCommunicationDirective,
    ConfirmDialogComponent,
    MessageDialogComponent,
    RichTextEditorComponent,
    RichTextEditDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useClass: AppTranslateLoader
      }
    }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexModule,
    MatTooltipModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    NgxTiptapModule
  ]
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap(): void {
    const schemer = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('app-root', schemer);
  }
}
