import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

type AnalysisState = 'idle' | 'pending' | 'warning' | 'safe';

@Component({
  selector: 'app-feature-spotlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-spotlight.component.html',
})
export class FeatureSpotlightComponent implements OnDestroy {
  private timers: ReturnType<typeof setTimeout>[] = [];

  state            = signal<AnalysisState>('idle');
  revealedDrugs    = signal(0);
  revealedProcs    = signal(0);
  showVerdict      = signal(false);
  showCode         = signal(false);

  prescribedDrugs = [
    { name: 'Amoxicillin',  dosage: '500mg',  category: 'Antibiotic',       initials: 'Ax' },
    { name: 'Metformin',    dosage: '1000mg', category: 'Antidiabetic',      initials: 'Mf' },
    { name: 'Lisinopril',   dosage: '10mg',   category: 'Antihypertensive',  initials: 'Lp' },
  ];

  drugResults = [
    {
      drug:           'Amoxicillin 500mg',
      status:         'alert' as const,
      headline:       'CRITICAL — Penicillin Allergy Detected',
      detail:         'Amoxicillin belongs to the penicillin family. Patient EMR carries a documented HIGH-SEVERITY penicillin allergy recorded on 2021-03-14.',
      recommendation: 'Suggested alternative: Azithromycin 500mg (non-penicillin macrolide).',
    },
    {
      drug:           'Metformin 1000mg',
      status:         'safe' as const,
      headline:       'SAFE — No Contraindications Found',
      detail:         'Compatible with Type 2 Diabetes diagnosis. First-line therapy confirmed. No interactions with Lisinopril.',
      recommendation: 'Follow-up: eGFR and serum creatinine baseline before initiation.',
    },
    {
      drug:           'Lisinopril 10mg',
      status:         'safe' as const,
      headline:       'SAFE — No Contraindications Found',
      detail:         'Standard ACE inhibitor for hypertension. No conflicts with existing conditions or other prescribed medications.',
      recommendation: 'Monitor: Serum potassium and renal function every 6 months.',
    },
  ];

  procedures = [
    { name: 'HbA1c Blood Test',          reason: 'Diabetes management baseline before Metformin', priority: 'urgent'   as const },
    { name: 'eGFR / Creatinine Panel',   reason: 'Mandatory renal check per Metformin protocol',  priority: 'urgent'   as const },
    { name: 'Allergy Panel Re-evaluation', reason: 'Required before any antibiotic is prescribed', priority: 'urgent'   as const },
  ];

  runAnalysis() {
    if (this.state() !== 'idle') { this.reset(); return; }
    this.state.set('pending');
    const t = (ms: number, fn: () => void) => this.timers.push(setTimeout(fn, ms));
    t(1000, () => this.revealedDrugs.set(1));
    t(1900, () => this.revealedDrugs.set(2));
    t(2700, () => this.revealedDrugs.set(3));
    t(3300, () => this.revealedProcs.set(1));
    t(3700, () => this.revealedProcs.set(2));
    t(4100, () => this.revealedProcs.set(3));
    t(4700, () => { this.state.set('warning'); this.showVerdict.set(true); });
  }

  reset() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.state.set('idle');
    this.revealedDrugs.set(0);
    this.revealedProcs.set(0);
    this.showVerdict.set(false);
  }

  ngOnDestroy() { this.timers.forEach(clearTimeout); }
}
