
import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit {
  private geminiService = inject(GeminiService);
  financialTip = signal('Loading financial tip...');

  ngOnInit(): void {
    this.geminiService.generateFinancialTip().then(tip => {
      this.financialTip.set(tip);
    });
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
