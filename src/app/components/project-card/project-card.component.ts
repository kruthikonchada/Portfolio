import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  project = input.required<Project>();
  hovered = signal(false);

  // 3D tilt state
  private tiltX = signal(0);
  private tiltY = signal(0);
  private mouseX = signal(50);
  private mouseY = signal(50);

  // Inline style for 3D perspective tilt
  cardStyle = computed((): Record<string, string> => ({
    transform: `perspective(900px) rotateX(${this.tiltX()}deg) rotateY(${this.tiltY()}deg)`,
  }));

  // Mouse-position spotlight that follows cursor within the card
  spotlightStyle = computed(() =>
    this.hovered()
      ? `radial-gradient(220px circle at ${this.mouseX()}% ${this.mouseY()}%, rgba(6,182,212,0.10) 0%, transparent 70%)`
      : 'none'
  );

  onMouseMove(event: MouseEvent): void {
    const el  = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x    = event.clientX - rect.left;
    const y    = event.clientY - rect.top;

    // ±8° max tilt
    this.tiltY.set(((x - rect.width  / 2) / (rect.width  / 2)) * 8);
    this.tiltX.set(-((y - rect.height / 2) / (rect.height / 2)) * 8);

    // Spotlight position as percentage
    this.mouseX.set((x / rect.width)  * 100);
    this.mouseY.set((y / rect.height) * 100);
  }

  onMouseLeave(): void {
    this.hovered.set(false);
    this.tiltX.set(0);
    this.tiltY.set(0);
  }

  accentGradient = computed(() => {
    const map: Record<string, string> = {
      cyan:    'bg-gradient-to-r from-cyan-500 to-cyan-300',
      emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-300',
      indigo:  'bg-gradient-to-r from-indigo-500 to-indigo-300',
      violet:  'bg-gradient-to-r from-violet-500 to-violet-300',
      amber:   'bg-gradient-to-r from-amber-500 to-amber-300',
    };
    return map[this.project().badge.color] ?? map['cyan'];
  });

  iconBg = computed(() => {
    const map: Record<string, string> = {
      cyan:    'bg-cyan-500/15',
      emerald: 'bg-emerald-500/15',
      indigo:  'bg-indigo-500/15',
      violet:  'bg-violet-500/15',
      amber:   'bg-amber-500/15',
    };
    return map[this.project().badge.color] ?? map['cyan'];
  });

  badgeClasses = computed(() => {
    const map: Record<string, string> = {
      cyan:    'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
      emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
      indigo:  'bg-indigo-500/10 text-indigo-300 border-indigo-500/25',
      violet:  'bg-violet-500/10 text-violet-300 border-violet-500/25',
      amber:   'bg-amber-500/10 text-amber-300 border-amber-500/25',
    };
    return map[this.project().badge.color] ?? map['cyan'];
  });

  tagClass(color: string): string {
    const map: Record<string, string> = {
      cyan:    'bg-cyan-500/10 text-cyan-400',
      indigo:  'bg-indigo-500/10 text-indigo-400',
      emerald: 'bg-emerald-500/10 text-emerald-400',
      violet:  'bg-violet-500/10 text-violet-400',
      amber:   'bg-amber-500/10 text-amber-400',
    };
    return map[color] ?? map['cyan'];
  }
}