
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-page-skeleton',
  templateUrl: './detail-page-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class DetailPageSkeletonComponent {
  isProductPage = input(true);
}
