
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { InvestorDetailComponent } from './pages/investor-detail/investor-detail.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, title: 'Home | Eibil Nidhi Limited' },
  {
    path: 'products/:slug',
    component: ProductDetailComponent,
  },
  {
    path: 'investor/:slug',
    component: InvestorDetailComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
