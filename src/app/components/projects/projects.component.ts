import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { PROJECTS } from '../../data/portfolio.data';

type Filter = 'all' | 'featured';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  allProjects = PROJECTS;
  activeFilter = signal<Filter>('all');

  filters: { label: string; value: Filter }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Featured', value: 'featured' },
  ];

  filteredProjects = computed(() =>
    this.activeFilter() === 'featured'
      ? this.allProjects.filter(p => p.featured)
      : this.allProjects
  );

  fullRows = computed(() => {
    const p = this.filteredProjects();
    const rem = p.length % 3;
    return rem === 0 ? p : p.slice(0, p.length - rem);
  });

  lastRow = computed(() => {
    const p = this.filteredProjects();
    const rem = p.length % 3;
    return rem === 0 ? [] : p.slice(p.length - rem);
  });
}
