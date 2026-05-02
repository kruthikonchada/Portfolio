import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ArchNode {
  id: string;
  label: string;
  sublabel: string;
  emoji: string;
  badge?: string;
  tags: string[];
  borderClass: string;
  selectedClass: string;
  tagClass: string;
  accentClass: string;
  note: { challenge: string; solution: string; metric: string; metricClass: string };
}

@Component({
  selector: 'app-system-design',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-design.component.html',
})
export class SystemDesignComponent {
  selectedId = signal<string | null>('angular');

  nodes: ArchNode[] = [
    {
      id: 'angular',
      label: 'Angular 19',
      sublabel: 'Signals-based Frontend',
      emoji: '⚡',
      tags: ['Signals', 'Standalone', 'OnPush'],
      borderClass:   'border-cyan-500/40 hover:border-cyan-500/70',
      selectedClass: 'border-cyan-500 shadow-lg shadow-cyan-500/20 bg-cyan-500/8',
      tagClass:      'bg-cyan-500/15 text-cyan-400',
      accentClass:   'text-cyan-400',
      note: {
        challenge: 'Real-time delivery status updates for 10,000+ recipients caused full-list re-renders on every WebSocket event, making the UI sluggish.',
        solution:   'Angular Signals for fine-grained reactivity — only the affected recipient row re-renders. Combined with trackBy and CDK virtual scrolling for large recipient lists.',
        metric: '~95% reduction in DOM updates per incoming status event',
        metricClass: 'text-cyan-400',
      },
    },
    {
      id: 'spring',
      label: 'Spring Boot',
      sublabel: 'REST API · RBAC · @Async',
      emoji: '☕',
      badge: 'EC2',
      tags: ['REST APIs', 'RBAC', '@Async', 'Rate Limit'],
      borderClass:   'border-indigo-500/40 hover:border-indigo-500/70',
      selectedClass: 'border-indigo-500 shadow-lg shadow-indigo-500/20 bg-indigo-500/8',
      tagClass:      'bg-indigo-500/15 text-indigo-400',
      accentClass:   'text-indigo-400',
      note: {
        challenge: 'Dispatching to 10,000+ recipients blocked the main thread, causing API timeouts for concurrent users during active campaigns.',
        solution:   'Offloaded dispatch to an @Async ThreadPoolTaskExecutor. A Redis atomic counter enforces the WhatsApp Business API rate limit (1,000 msg/min) without blocking incoming requests.',
        metric: 'Throughput: ~200 → 10,000+ recipients per campaign run',
        metricClass: 'text-indigo-400',
      },
    },
    {
      id: 'redis',
      label: 'Redis Cache',
      sublabel: 'In-Memory · Sub-ms Latency',
      emoji: '🔴',
      tags: ['Cache-Aside', 'TTL', 'Rate Limiting'],
      borderClass:   'border-emerald-500/40 hover:border-emerald-500/70',
      selectedClass: 'border-emerald-500 shadow-lg shadow-emerald-500/20 bg-emerald-500/8',
      tagClass:      'bg-emerald-500/15 text-emerald-400',
      accentClass:   'text-emerald-400',
      note: {
        challenge: 'N+1 query problem: each of 10,000+ recipients triggered an individual MySQL template lookup — effectively 10,000 queries per dispatch.',
        solution:   'Cache-aside pattern — check Redis first; on miss, fetch from MySQL and cache with 1-hour TTL. Invalidated on any template write to keep data consistent.',
        metric: 'Template fetch: ~20ms (DB) → <1ms (Redis) · 90% fewer DB reads',
        metricClass: 'text-emerald-400',
      },
    },
    {
      id: 'mysql',
      label: 'MySQL',
      sublabel: 'Persistent · Indexed · Optimised',
      emoji: '🗄️',
      badge: 'RDS',
      tags: ['Composite Indexes', 'Batch Insert', 'Partitioning'],
      borderClass:   'border-violet-500/40 hover:border-violet-500/70',
      selectedClass: 'border-violet-500 shadow-lg shadow-violet-500/20 bg-violet-500/8',
      tagClass:      'bg-violet-500/15 text-violet-400',
      accentClass:   'text-violet-400',
      note: {
        challenge: 'Audience segmentation queries scanned millions of recipient rows with no indexes, producing 8+ second report generation times.',
        solution:   'Composite indexes on (campaign_id, status, created_at). JDBC batch inserts replaced single-row writes. Partitioned recipients table by campaign_id to limit scan scope.',
        metric: 'Report generation: 8 s → 400 ms (95% faster)',
        metricClass: 'text-violet-400',
      },
    },
    {
      id: 's3',
      label: 'AWS S3',
      sublabel: 'Templates · Media · Static Assets',
      emoji: '🪣',
      badge: 'S3',
      tags: ['Pre-signed URLs', 'Versioning', 'Lifecycle'],
      borderClass:   'border-amber-500/40 hover:border-amber-500/70',
      selectedClass: 'border-amber-500 shadow-lg shadow-amber-500/20 bg-amber-500/8',
      tagClass:      'bg-amber-500/15 text-amber-400',
      accentClass:   'text-amber-400',
      note: {
        challenge: 'Campaign media files and WhatsApp message templates burdened EC2 I/O and increased response times for static asset delivery.',
        solution:   'All template assets stored in S3. Spring Boot generates pre-signed URLs for secure, time-limited direct client access — keeping EC2 free for business logic.',
        metric: 'EC2 I/O reduced to zero for static assets · assets served at edge',
        metricClass: 'text-amber-400',
      },
    },
  ];

  selected = computed(() => this.nodes.find(n => n.id === this.selectedId()) ?? null);
  select(id: string) { this.selectedId.set(this.selectedId() === id ? null : id); }
}
