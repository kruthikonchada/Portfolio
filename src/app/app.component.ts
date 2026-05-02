import { Component, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SystemDesignComponent } from './components/system-design/system-design.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { BusinessImpactComponent } from './components/business-impact/business-impact.component';
import { FeatureSpotlightComponent } from './components/feature-spotlight/feature-spotlight.component';
import { CampaignManagementComponent } from './components/campaign-management/campaign-management.component';
import { PerformanceEngineeringComponent } from './components/performance-engineering/performance-engineering.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    HeroComponent,
    ProjectsComponent,
    BusinessImpactComponent,
    FeatureSpotlightComponent,
    CampaignManagementComponent,
    PerformanceEngineeringComponent,
    SystemDesignComponent,
    SkillsComponent,
    ExperienceComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private cursorDot:   HTMLElement | null = null;
  private cursorRing:  HTMLElement | null = null;
  private progressBar: HTMLElement | null = null;
  private revealObserver: IntersectionObserver | null = null;
  private rafId: number | null = null;

  // Lerp targets for smooth ring lag
  private targetX = 0;
  private targetY = 0;
  private ringX = 0;
  private ringY = 0;

  ngAfterViewInit(): void {
    this.cursorDot   = document.querySelector<HTMLElement>('.cursor-dot');
    this.cursorRing  = document.querySelector<HTMLElement>('.cursor-ring');
    this.progressBar = document.querySelector<HTMLElement>('.scroll-progress');

    // Only enable custom cursor on devices with a fine pointer (mouse)
    if (window.matchMedia('(pointer: fine)').matches) {
      document.body.classList.add('cursor-active');
      this.lerpRing();
    }

    this.initRevealObserver();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.targetX = e.clientX;
    this.targetY = e.clientY;

    if (this.cursorDot) {
      this.cursorDot.style.left = `${e.clientX}px`;
      this.cursorDot.style.top  = `${e.clientY}px`;
    }
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    this.cursorDot?.classList.add('clicking');
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.cursorDot?.classList.remove('clicking');
  }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(e: MouseEvent): void {
    const el = e.target as HTMLElement;
    const hoverable = el.closest('a, button, [role="button"], .glass-card-hover, .badge, label');
    if (this.cursorRing) {
      if (hoverable) this.cursorRing.classList.add('hovering');
      else           this.cursorRing.classList.remove('hovering');
    }
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    if (this.cursorDot)  this.cursorDot.style.opacity  = '0';
    if (this.cursorRing) this.cursorRing.style.opacity = '0';
  }

  @HostListener('document:mouseenter')
  onMouseEnter(): void {
    if (this.cursorDot)  this.cursorDot.style.opacity  = '1';
    if (this.cursorRing) this.cursorRing.style.opacity = '1';
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.progressBar) return;
    const scrolled = document.documentElement.scrollTop;
    const total    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.progressBar.style.width = `${(scrolled / total) * 100}%`;
  }

  private lerpRing(): void {
    const tick = () => {
      // Smooth follow with spring-like easing
      this.ringX += (this.targetX - this.ringX) * 0.14;
      this.ringY += (this.targetY - this.ringY) * 0.14;

      if (this.cursorRing) {
        this.cursorRing.style.left = `${this.ringX}px`;
        this.cursorRing.style.top  = `${this.ringY}px`;
      }
      this.rafId = requestAnimationFrame(tick);
    };
    tick();
  }

  private initRevealObserver(): void {
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.section-reveal')
      .forEach(el => this.revealObserver!.observe(el));
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    document.body.classList.remove('cursor-active');
  }
}
