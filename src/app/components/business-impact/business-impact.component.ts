import { Component, signal, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ImpactCard {
  svgPath: string;
  target: number;
  suffix: string;
  isZero: boolean;
  label: string;
  sublabel: string;
  description: string;
  iconClasses: string;
  metricClasses: string;
  cardClasses: string;
  glowClasses: string;
}

@Component({
  selector: 'app-business-impact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-impact.component.html',
})
export class BusinessImpactComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  animated = signal(false);
  displayValues = signal<number[]>([0, 0, 0, 0]);

  cards: ImpactCard[] = [
    {
      svgPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      target: 60,
      suffix: '%',
      isZero: false,
      label: 'Payroll Efficiency',
      sublabel: 'Processing time reduced',
      description: 'Automated salary computation, tax deductions, and payslip generation for 200+ employees — eliminating manual HR effort.',
      iconClasses: 'bg-cyan-500/15 text-cyan-400',
      metricClasses: 'text-cyan-400',
      cardClasses: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
      glowClasses: 'bg-cyan-500/5',
    },
    {
      svgPath: 'M13 10V3L4 14h7v7l9-11h-7z',
      target: 35,
      suffix: '%',
      isZero: false,
      label: 'System Performance',
      sublabel: 'Faster API responses',
      description: 'Redis caching layer reduced response latency from ~20ms to sub-millisecond for frequently accessed enterprise datasets.',
      iconClasses: 'bg-indigo-500/15 text-indigo-400',
      metricClasses: 'text-indigo-400',
      cardClasses: 'hover:border-indigo-500/50 hover:shadow-indigo-500/10',
      glowClasses: 'bg-indigo-500/5',
    },
    {
      svgPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      target: 30,
      suffix: '%',
      isZero: false,
      label: 'Data Accuracy',
      sublabel: 'Fewer discrepancies',
      description: 'Automated validation pipelines across campaign, payroll, and inventory modules cut data errors and reconciliation overhead.',
      iconClasses: 'bg-emerald-500/15 text-emerald-400',
      metricClasses: 'text-emerald-400',
      cardClasses: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
      glowClasses: 'bg-emerald-500/5',
    },
    {
      svgPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      target: 0,
      suffix: '',
      isZero: true,
      label: 'Reliability',
      sublabel: 'Security incidents',
      description: 'Zero unauthorized data access incidents following RBAC implementation with role-scoped Redis cache and audit logging across all systems.',
      iconClasses: 'bg-violet-500/15 text-violet-400',
      metricClasses: 'text-violet-400',
      cardClasses: 'hover:border-violet-500/50 hover:shadow-violet-500/10',
      glowClasses: 'bg-violet-500/5',
    },
  ];

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.animated()) {
          this.animated.set(true);
          this.startCountUp();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private startCountUp() {
    const targets = this.cards.map(c => c.target);
    const duration = 1800;
    const steps = 72;
    const intervalMs = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      this.displayValues.set(targets.map(t => Math.round(t * eased)));
      if (step >= steps) clearInterval(timer);
    }, intervalMs);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
