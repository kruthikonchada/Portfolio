import { Component, signal, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance-engineering',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance-engineering.component.html',
})
export class PerformanceEngineeringComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  animated  = signal(false);
  showCode  = signal(false);

  metrics = [
    {
      label:      'API Response Time',
      context:    'Spring Boot → Redis cache-aside pattern',
      before:     '142 ms',
      after:      '92 ms',
      tag:        '35% faster',
      beforePct:  100,
      afterPct:   65,
      barClass:   'bg-gradient-to-r from-cyan-500 to-cyan-400',
      tagClass:   'text-cyan-400 bg-cyan-500/10 border border-cyan-500/25',
      valueClass: 'text-cyan-400',
    },
    {
      label:      'Report Generation',
      context:    'MySQL composite index + query optimisation',
      before:     '8.2 s',
      after:      '4.5 s',
      tag:        '45% faster',
      beforePct:  100,
      afterPct:   55,
      barClass:   'bg-gradient-to-r from-indigo-500 to-indigo-400',
      tagClass:   'text-indigo-400 bg-indigo-500/10 border border-indigo-500/25',
      valueClass: 'text-indigo-400',
    },
    {
      label:      'DB Queries per Campaign Dispatch',
      context:    'N+1 eliminated via Redis cache hit',
      before:     '10,000+',
      after:      '~1',
      tag:        '99.99% reduction',
      beforePct:  100,
      afterPct:   2,
      barClass:   'bg-gradient-to-r from-emerald-500 to-emerald-400',
      tagClass:   'text-emerald-400 bg-emerald-500/10 border border-emerald-500/25',
      valueClass: 'text-emerald-400',
    },
  ];

  steps = [
    {
      icon: '🔍',
      title: 'Identified the N+1 Pattern',
      body: 'Spring Data JPA was executing one query to fetch 10,000+ campaign recipients, then a separate DB call per recipient to load the linked message template — 10,001 queries per dispatch.',
      color: 'text-red-400',
    },
    {
      icon: '🔴',
      title: 'Redis Cache-Aside Fix',
      body: 'Introduced a Redis cache layer: check cache first; on miss, fetch from MySQL and store with 1-hour TTL. Template lookups dropped from ~20 ms each to sub-millisecond.',
      color: 'text-emerald-400',
    },
    {
      icon: '🗄️',
      title: 'MySQL Index Strategy',
      body: 'Added composite indexes on (campaign_id, status, created_at). Migrated single-row inserts to JDBC batch writes. Audience segmentation queries: 8.2 s → 4.5 s.',
      color: 'text-indigo-400',
    },
    {
      icon: '☕',
      title: 'JPA Query Tuning',
      body: 'Replaced lazy-loaded associations with @EntityGraph to collapse N+1 SELECT chains into a single JOIN. Further reduced round-trips for nested entity graphs.',
      color: 'text-violet-400',
    },
  ];

  stack = [
    { name: 'Java 17',         cls: 'bg-amber-500/10  text-amber-400  border-amber-500/20'  },
    { name: 'Spring Boot',     cls: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { name: 'Spring Data JPA', cls: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
    { name: 'Redis',           cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { name: 'MySQL',           cls: 'bg-cyan-500/10   text-cyan-400   border-cyan-500/20'   },
    { name: 'AWS RDS',         cls: 'bg-amber-500/10  text-amber-400  border-amber-500/20'  },
  ];

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.animated()) {
          this.animated.set(true);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}
