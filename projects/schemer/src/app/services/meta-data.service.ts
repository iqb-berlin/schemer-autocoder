import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MetaDataService {
  metadata: Record<string, string> = {};

  constructor(@Inject(DOCUMENT) private document: Document) {
    const metadata: string | null | undefined = document.getElementById('meta_data')?.textContent;
    if (metadata) {
      this.metadata = JSON.parse(metadata);
    }
  }
}
