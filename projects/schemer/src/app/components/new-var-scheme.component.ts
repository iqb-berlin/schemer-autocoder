import { MAT_DIALOG_DATA } from '@angular/material/dialog';import { Component, Inject } from '@angular/core';import { FormGroup, FormBuilder, Validators } from '@angular/forms';export type NewVarSchemeData = {  title: string,  key: string,  label: string};@Component({  template: `    <div fxLayout="column" style="height: 100%">      <h1 mat-dialog-title>{{data.title}}</h1>      <mat-dialog-content>        <form [formGroup]="newVarSchemeForm" fxLayout="column">          <mat-form-field>            <input matInput formControlName="key" placeholder="Kurzname" [value]="data.key" >            <mat-error *ngIf="newVarSchemeForm.get('key')?.invalid">              Zu kurz oder schon vorhanden            </mat-error>          </mat-form-field>          <mat-form-field>            <input matInput formControlName="label" placeholder="Name" [value]="data.label">          </mat-form-field>        </form>      </mat-dialog-content>      <mat-dialog-actions>        <button mat-raised-button color="primary" type="submit"                [mat-dialog-close]="newVarSchemeForm" [disabled]="newVarSchemeForm.invalid">          {{'dialog-save' | translate}}        </button>        <button mat-raised-button [mat-dialog-close]="false">{{'dialog-cancel' | translate}}</button>      </mat-dialog-actions>    </div>  `})export class NewVarSchemeComponent {  newVarSchemeForm: FormGroup;  constructor(private fb: FormBuilder,              @Inject(MAT_DIALOG_DATA) public data: NewVarSchemeData) {    this.newVarSchemeForm = this.fb.group({      key: this.fb.control('', [Validators.required, Validators.pattern('[a-zA-Z-0-9_]+'),        Validators.minLength(3)]),      label: this.fb.control('')    });  }}