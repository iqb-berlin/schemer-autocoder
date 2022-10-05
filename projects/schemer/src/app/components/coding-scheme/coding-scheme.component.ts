import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CodeData, ValueTransformation } from '@response-scheme';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { RichTextEditDialogComponent } from '../rich-text-editor/rich-text-edit-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { Coding } from '../../classes/coding.class';

@Component({
  selector: 'var-scheme',
  templateUrl: './coding-scheme.component.html',
  styleUrls: ['./coding-scheme.component.scss']
})
export class CodingSchemeComponent implements OnInit {
  @Output() codingSchemeChanged = new EventEmitter<Coding | null>();
  @Input() codingScheme: Coding | null = null;
  @Input() allVariables: string[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private editTextDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getNewSources(usedVars: string[]) {
    const returnSources: string[] = [];
    this.allVariables.forEach(v => {
      if (this.codingScheme && usedVars.indexOf(v) < 0 && v !== this.codingScheme.id) returnSources.push(v);
    });
    returnSources.sort();
    return returnSources;
  }

  deleteDeriveSource(source: string) {
    if (this.codingScheme) {
      const sourcePos = this.codingScheme.deriveSources.indexOf(source);
      if (sourcePos >= 0) this.codingScheme.deriveSources.splice(sourcePos, 1);
      this.setCodingSchemeChanged();
    }
  }

  addDeriveSource(v: string) {
    if (this.codingScheme) {
      this.codingScheme.deriveSources.push(v);
      this.codingScheme.deriveSources.sort();
      this.setCodingSchemeChanged();
    }
  }

  alterValueTransformation(transId: ValueTransformation, checked: boolean) {
    if (this.codingScheme) {
      const transPos = this.codingScheme.valueTransformations.indexOf(transId);
      if (checked && transPos < 0) {
        this.codingScheme.valueTransformations.push(transId);
      } else if (!checked && transPos >= 0) {
        this.codingScheme.valueTransformations.splice(transPos, 1);
      }
      this.setCodingSchemeChanged();
    }
  }

  getSanitizedText(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  editTextDialog_manualInstruction(): void {
    if (this.codingScheme) {
      const dialogRef = this.editTextDialog.open(RichTextEditDialogComponent, {
        width: '860px',
        data: {
          title: this.translateService.instant('manual-instruction.prompt-general'),
          content: this.codingScheme.manualInstruction || '',
          defaultFontSize: 20,
          editorHeightPx: 550
        },
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (typeof dialogResult !== 'undefined') {
          if (dialogResult !== false && this.codingScheme) {
            this.codingScheme.manualInstruction = dialogResult;
            this.setCodingSchemeChanged();
          }
        }
      });
    }
  }

  addCode() {
    if (this.codingScheme) {
      this.codingScheme.codes.push({
        id: 1,
        label: '',
        score: 0,
        rules: [],
        manualInstruction: ''
      });
      this.setCodingSchemeChanged();
    }
  }

  setCodingSchemeChanged(): void {
    if (this.codingScheme) {
      this.codingSchemeChanged.emit(this.codingScheme);
    }
  }

  deleteCode(codeToDeleteId: number) {
    if (this.codingScheme) {
      let codePos = -1;
      this.codingScheme.codes.forEach((c: CodeData, i: number) => {
        if (c.id === codeToDeleteId) codePos = i;
      });
      if (codePos >= 0) this.codingScheme.codes.splice(codePos, 1);
      this.setCodingSchemeChanged();
    }
  }
}
