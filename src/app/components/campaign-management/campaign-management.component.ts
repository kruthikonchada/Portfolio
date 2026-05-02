import { Component, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

type CampaignState = 'idle' | 'dispatching' | 'complete';

@Component({
  selector: 'app-campaign-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-management.component.html',
})
export class CampaignManagementComponent implements OnDestroy {
  private timers: ReturnType<typeof setTimeout>[] = [];

  state           = signal<CampaignState>('idle');
  revealedBatches = signal(0);
  revealedStats   = signal(0);
  showVerdict     = signal(false);
  showCode        = signal(false);

  readonly messagePreview = '"Hey {{name}}! 🎉 Your Diwali discount is LIVE — 40% off sitewide. Valid 24hrs only."';

  readonly progressPercent = computed(() => (this.revealedBatches() / 4) * 100);
  readonly totalSent       = computed(() => [0, 2562, 5124, 7686, 10247][this.revealedBatches()]);
  readonly deliveredCount  = computed(() => [0, 2475, 4946, 7421, 9891][this.revealedBatches()]);

  batches = [
    { label: 'Batch 1 / 4', count: '2,562', note: 'WhatsApp API connected · 100 msg/sec rate limit applied' },
    { label: 'Batch 2 / 4', count: '2,562', note: 'Redis delivery-state cache warmed · receipts streaming' },
    { label: 'Batch 3 / 4', count: '2,562', note: 'SMS fallback triggered for 41 unreachable WhatsApp numbers' },
    { label: 'Batch 4 / 4', count: '2,561', note: 'Webhook callbacks registered · all receipts active' },
  ];

  logs = [
    { time: '10:00:00', text: 'Campaign "Diwali Offer 2024" initialized — 10,247 recipients loaded from CRM export · opt-outs filtered', type: 'info'    },
    { time: '10:00:05', text: 'Batch 1/4 complete — 2,562 dispatched · 2,475 delivered · Redis cache active', type: 'success' },
    { time: '10:00:10', text: 'Batch 2/4 complete — 5,124 cumulative · SMS fallback triggered for 41 unreachable numbers',              type: 'warn'    },
    { time: '10:00:17', text: 'Batch 4/4 complete — All 10,247 dispatched · Delivery receipt webhooks active · Final report queued',    type: 'success' },
  ];

  finalStats = [
    { label: 'Delivered',    value: '9,891', pct: '96.5%', color: 'emerald' },
    { label: 'WhatsApp',     value: '8,203', pct: '80.1%', color: 'cyan'    },
    { label: 'SMS Fallback', value: '1,688', pct: '16.5%', color: 'yellow'  },
    { label: 'Failed',       value: '356',   pct: '3.5%',  color: 'red'     },
  ];

  launchCampaign() {
    if (this.state() !== 'idle') { this.reset(); return; }
    this.state.set('dispatching');
    const t = (ms: number, fn: () => void) => this.timers.push(setTimeout(fn, ms));
    t( 900, () => this.revealedBatches.set(1));
    t(1800, () => this.revealedBatches.set(2));
    t(2600, () => this.revealedBatches.set(3));
    t(3300, () => this.revealedBatches.set(4));
    t(3900, () => this.revealedStats.set(1));
    t(4300, () => this.revealedStats.set(2));
    t(4700, () => this.revealedStats.set(3));
    t(5100, () => this.revealedStats.set(4));
    t(5700, () => { this.state.set('complete'); this.showVerdict.set(true); });
  }

  reset() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.state.set('idle');
    this.revealedBatches.set(0);
    this.revealedStats.set(0);
    this.showVerdict.set(false);
  }

  ngOnDestroy() { this.timers.forEach(clearTimeout); }
}