
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GeminiService, InvestorInfo } from '../../services/gemini.service';
import { DetailPageSkeletonComponent } from '../../components/skeletons/detail-page-skeleton.component';

interface NavItem {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-investor-detail',
  templateUrl: './investor-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, DetailPageSkeletonComponent],
})
export class InvestorDetailComponent {
  info = signal<InvestorInfo | undefined>(undefined);
  status = signal<'loading' | 'success' | 'error'>('loading');
  activeSlug = signal<string | null>(null);

  investorNavItems: NavItem[] = [
    { name: 'Notice to Shareholders', slug: 'notice-to-shareholders' },
    { name: 'Financial Results', slug: 'financial-results' },
    { name: 'Board Governance', slug: 'board-governance' },
    { name: 'Committees of the Board', slug: 'committees-of-the-board' },
    { name: 'Fair Practice Code', slug: 'fair-practice-code' },
    { name: 'Policies', slug: 'policies' },
    { name: 'Annual General Meeting', slug: 'annual-general-meeting' },
    { name: 'Annual Returns', slug: 'annual-returns' },
  ];

  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private geminiService = inject(GeminiService);

  constructor() {
    this.route.paramMap.subscribe(async (params) => {
      this.status.set('loading');
      this.info.set(undefined);
      const slug = params.get('slug');
      this.activeSlug.set(slug);

      if (slug) {
        const topicName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        this.titleService.setTitle(`${topicName} | Eibil Nidhi Limited`);

        try {
          const investorData = await this.geminiService.generateInvestorContent(topicName);
          this.info.set({
            ...investorData,
            slug: slug,
            name: topicName,
          });
          this.status.set('success');
        } catch (error) {
          console.error("Error fetching investor data:", error);
          this.status.set('error');
        }
      }
      window.scrollTo(0, 0);
    });
  }
}
