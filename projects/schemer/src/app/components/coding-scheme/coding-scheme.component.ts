import {Component, Input, OnInit} from '@angular/core';
import {CodingScheme} from "@response-scheme";

@Component({
  selector: 'var-scheme',
  templateUrl: './coding-scheme.component.html',
  styleUrls: ['./coding-scheme.component.scss']
})
export class CodingSchemeComponent implements OnInit {
  @Input() codingScheme: CodingScheme | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
