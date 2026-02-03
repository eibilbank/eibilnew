
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GeminiService, Product } from '../../services/gemini.service';
import { DetailPageSkeletonComponent } from '../../components/skeletons/detail-page-skeleton.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, DetailPageSkeletonComponent],
})
export class ProductDetailComponent {
  product = signal<Product | undefined>(undefined);
  status = signal<'loading' | 'success' | 'error'>('loading');
  activeTab = signal<'features' | 'eligibility' | 'documents' | 'process'>('features');
  
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private geminiService = inject(GeminiService);

  constructor() {
    this.route.paramMap.subscribe(async (params) => {
      this.status.set('loading');
      this.product.set(undefined);
      const slug = params.get('slug');
      
      if (slug) {
        const productName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        this.titleService.setTitle(`${productName} | Eibil Nidhi Limited`);
        
        try {
          const productData = await this.geminiService.generateProductContent(productName);
          this.product.set({
              ...productData,
              slug: slug,
              name: productName,
              imageUrl: `https://picsum.photos/1200/400?random=${Math.random()}`
          });
          this.status.set('success');
        } catch (error) {
          console.error("Error fetching product data:", error);
          this.status.set('error');
        }
      }
      window.scrollTo(0, 0);
    });
  }

  selectTab(tab: 'features' | 'eligibility' | 'documents' | 'process'): void {
    this.activeTab.set(tab);
  }
}
