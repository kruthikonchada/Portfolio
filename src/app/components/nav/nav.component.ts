import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  scrolled = signal(false);
  activeSection = signal('hero');
  mobileOpen = signal(false);

  navLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'feature-spotlight', label: 'AI Rx' },
    { id: 'campaign-management', label: 'Campaign' },
    { id: 'business-impact', label: 'Impact' },
    { id: 'performance', label: 'Performance' },
    { id: 'system-design', label: 'Architecture' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
    this.detectActiveSection();
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private detectActiveSection() {
    const sections = ['hero', 'about', 'projects', 'feature-spotlight', 'campaign-management', 'business-impact', 'performance', 'system-design', 'skills', 'experience'];
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) {
        this.activeSection.set(id);
        break;
      }
    }
  }
}
