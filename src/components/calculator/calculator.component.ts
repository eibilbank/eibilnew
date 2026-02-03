
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule]
})
export class CalculatorComponent {
  loanAmount = signal(500000);
  interestRate = signal(8.5);
  tenureYears = signal(10);

  minLoanAmount = 10000;
  maxLoanAmount = 5000000;
  minInterestRate = 5;
  maxInterestRate = 20;
  minTenure = 1;
  maxTenure = 30;

  monthlyEmi = computed(() => {
    const p = this.loanAmount();
    const r = this.interestRate() / 12 / 100;
    const n = this.tenureYears() * 12;

    if (p <= 0 || r <= 0 || n <= 0) {
      return 0;
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emi;
  });

  totalInterest = computed(() => {
    const p = this.loanAmount();
    const emi = this.monthlyEmi();
    const n = this.tenureYears() * 12;
    if (emi <= 0 || p <= 0) {
      return 0;
    }
    const totalPayment = emi * n;
    return totalPayment - p;
  });

  totalPayment = computed(() => {
    return this.loanAmount() + this.totalInterest();
  });

  onLoanAmountChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.loanAmount.set(Number(value));
  }
  
  onInterestRateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.interestRate.set(Number(value));
  }
  
  onTenureYearsChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.tenureYears.set(Number(value));
  }
}
