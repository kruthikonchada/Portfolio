import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERIENCE } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit {
  experience = EXPERIENCE;
  animated = signal(false);

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animated.set(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const el = document.getElementById('experience');
    if (el) observer.observe(el);
  }
}