import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { createCustomElement } from '@angular/elements';
import { NgxTiptapModule } from 'ngx-tiptap';
import { CodingComponentsModule } from '@iqb/coding-components';
import { CodeDataComponent } from './components/code/code-data.component';
import { SchemeCheckerComponent } from './components/scheme-checker/scheme-checker.component';
import { ShowCodingResultsComponent } from './components/scheme-checker/show-coding-results.component';
import { VeronaCommunicationDirective } from './directives/verona-communication.directive';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { RichTextEditDialogComponent } from './components/rich-text-editor/rich-text-edit-dialog.component';
import { CodingSchemeComponent } from './components/coding-scheme/coding-scheme.component';
import { SchemerStageComponent } from './components/schemer-stage/schemer-stage.component';
import { AppTranslateLoader } from './app-translate-loader';
import { SchemerToolbarComponent } from './components/schemer-toolbar.component';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog.component';
import { MessageDialogComponent } from './components/dialogs/message-dialog.component';
import { SimpleInputDialogComponent } from './components/dialogs/simple-input-dialog.component';
import { SelectVariableDialogComponent } from './components/dialogs/select-variable-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SchemerToolbarComponent,
    SchemerStageComponent,
    CodingSchemeComponent,
    CodeDataComponent,
    ShowCodingResultsComponent,
    SchemeCheckerComponent,
    VeronaCommunicationDirective,
    ConfirmDialogComponent,
    MessageDialogComponent,
    SimpleInputDialogComponent,
    SelectVariableDialogComponent,
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
    NgxTiptapModule,
    CodingComponentsModule
  ]
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap(): void {
    const schemer = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('app-root', schemer);
  }
}
