
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ContactComponent {
  private fb = new FormBuilder();
  
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  submissionStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }
    
    this.submissionStatus.set('loading');
    
    // Simulate API call
    setTimeout(() => {
      // Simulate a successful submission
      this.submissionStatus.set('success');
      this.contactForm.reset();
      
      // Reset status after a few seconds
      setTimeout(() => this.submissionStatus.set('idle'), 5000);
    }, 1500);
  }
}
