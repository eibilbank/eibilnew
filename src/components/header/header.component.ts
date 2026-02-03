
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface NavItem {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
  products: NavItem[] = [
    { name: 'Gold Loan', slug: 'gold-loan' },
    { name: 'Online Gold Loan', slug: 'online-gold-loan' },
    { name: 'Door Step Gold Loan', slug: 'door-step-gold-loan' },
    { name: 'Loan against Property', slug: 'loan-against-property' },
    { name: 'Instant Property Loan', slug: 'instant-property-loan' },
    { name: 'Term Deposit', slug: 'term-deposit' },
    { name: 'Recurring Deposit', slug: 'recurring-deposit' },
    { name: 'Savings Deposit', slug: 'savings-deposit' },
    { name: 'Loan Against Deposit', slug: 'loan-against-deposit' },
  ];

  investors: NavItem[] = [
    { name: 'Notice to Shareholders', slug: 'notice-to-shareholders' },
    { name: 'Financial Results/Performance', slug: 'financial-results' },
    { name: 'Board Governance', slug: 'board-governance' },
    { name: 'Committees of the Board', slug: 'committees-of-the-board' },
    { name: 'Fair Practice Code', slug: 'fair-practice-code' },
    { name: 'Policies', slug: 'policies' },
    { name: 'Members / Investors', slug: 'members-investors' },
    { name: 'Annual General Meeting', slug: 'annual-general-meeting' },
    { name: 'Annual Returns', slug: 'annual-returns' },
    { name: 'Disclosure on RPT', slug: 'disclosure-on-rpt' },
    { name: 'Auction', slug: 'auction' },
    { name: 'CSR', slug: 'csr' },
    { name: 'Extract of Form 5A', slug: 'extract-of-form-5a' },
  ];

  activeDropdown = signal<string | null>(null);
  isMobileMenuOpen = signal(false);

  constructor(private router: Router) {}

  scrollTo(fragment: string): void {
    this.isMobileMenuOpen.set(false);
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    });
  }

  showDropdown(menu: string): void {
    this.activeDropdown.set(menu);
  }

  hideDropdown(): void {
    this.activeDropdown.set(null);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
