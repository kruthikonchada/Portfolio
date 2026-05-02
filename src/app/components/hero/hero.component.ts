import { Component, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { METRICS } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  metrics = METRICS;
  displayValues = signal<number[]>(METRICS.map(() => 0));
  typewriterDisplay = signal('');

  techTags = ['Java', 'Spring Boot', 'Angular 19', 'Redis', 'MySQL', 'AWS'];

  private roles = [
    'Full Stack Java Developer',
    'Spring Boot Architect',
    'Angular 19 Specialist',
    'AI Integration Engineer',
  ];
  private roleIndex = 0;
  private typeTimers: ReturnType<typeof setTimeout>[] = [];
  private destroyed = false;

  ngAfterViewInit(): void {
    setTimeout(() => this.runCountUp(), 700);
    this.runTypewriter();
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private runTypewriter(): void {
    const typeText = (text: string, done: () => void) => {
      let i = 0;
      const tick = () => {
        if (this.destroyed) return;
        if (i <= text.length) {
          this.typewriterDisplay.set(text.slice(0, i));
          i++;
          const t = setTimeout(tick, 55 + Math.random() * 35);
          this.typeTimers.push(t);
        } else {
          const t = setTimeout(done, 2200);
          this.typeTimers.push(t);
        }
      };
      tick();
    };

    const eraseText = (done: () => void) => {
      const current = this.typewriterDisplay();
      let i = current.length;
      const tick = () => {
        if (this.destroyed) return;
        if (i >= 0) {
          this.typewriterDisplay.set(current.slice(0, i));
          i--;
          const t = setTimeout(tick, 28);
          this.typeTimers.push(t);
        } else {
          const t = setTimeout(done, 350);
          this.typeTimers.push(t);
        }
      };
      tick();
    };

    const loop = () => {
      if (this.destroyed) return;
      typeText(this.roles[this.roleIndex], () => {
        eraseText(() => {
          this.roleIndex = (this.roleIndex + 1) % this.roles.length;
          loop();
        });
      });
    };

    const t = setTimeout(loop, 600);
    this.typeTimers.push(t);
  }

  private runCountUp(): void {
    this.metrics.forEach((metric, i) => {
      const duration = 1800;
      const steps    = 60;
      let step       = 0;

      const timer = setInterval(() => {
        step++;
        // Cubic ease-out: fast start, slow finish
        const progress = 1 - Math.pow(1 - step / steps, 3);
        const current  = Math.round(progress * metric.value);
        this.displayValues.update(vals => {
          const next = [...vals];
          next[i] = current;
          return next;
        });
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.typeTimers.forEach(t => clearTimeout(t));
  }
}