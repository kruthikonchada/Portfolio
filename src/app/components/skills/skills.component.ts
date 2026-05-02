import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SKILLS } from '../../data/portfolio.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit {
  skills = SKILLS;
  animated = signal(false);

  private readonly barGradients = [
    'bg-gradient-to-r from-cyan-500 to-indigo-500',
    'bg-gradient-to-r from-indigo-500 to-violet-500',
    'bg-gradient-to-r from-emerald-500 to-cyan-500',
    'bg-gradient-to-r from-violet-500 to-indigo-500',
  ];

  private readonly glowDots = [
    'bg-cyan-400 shadow-[0_0_8px_2px_rgba(6,182,212,0.7)]',
    'bg-indigo-400 shadow-[0_0_8px_2px_rgba(99,102,241,0.7)]',
    'bg-emerald-400 shadow-[0_0_8px_2px_rgba(16,185,129,0.7)]',
    'bg-violet-400 shadow-[0_0_8px_2px_rgba(139,92,246,0.7)]',
  ];

  private readonly iconGlows = [
    'bg-cyan-500/15 shadow-[0_0_16px_rgba(6,182,212,0.4)]',
    'bg-indigo-500/15 shadow-[0_0_16px_rgba(99,102,241,0.4)]',
    'bg-emerald-500/15 shadow-[0_0_16px_rgba(16,185,129,0.4)]',
    'bg-violet-500/15 shadow-[0_0_16px_rgba(139,92,246,0.4)]',
  ];

  barGradient(categoryIndex: number): string {
    return this.barGradients[categoryIndex % this.barGradients.length];
  }

  glowDot(categoryIndex: number): string {
    return this.glowDots[categoryIndex % this.glowDots.length];
  }

  iconGlow(categoryIndex: number): string {
    return this.iconGlows[categoryIndex % this.iconGlows.length];
  }

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => this.animated.set(true), 150);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById('skills');
    if (el) observer.observe(el);
  }
}