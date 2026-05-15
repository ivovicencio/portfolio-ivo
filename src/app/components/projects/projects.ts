import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';

interface Project {
  title: string;
  category: 'frontend' | 'backend' | 'fullstack';
  description: string;
  history?: string;
  tech: string[];
  status: 'completed' | 'in-progress';
  repoFront?: string;
  repoBack?: string;
  deployUrl?: string;
}

interface ProjectData {
  key: string;
  category: 'frontend' | 'backend' | 'fullstack';
  tech: string[];
  status: 'completed' | 'in-progress';
  repoFront?: string;
  repoBack?: string;
  deployUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent {
  activeFilter: string = 'all';
  searchTerm: string = '';
  selectedProject: Project | null = null;
  isModalOpen: boolean = false;
  projects: Project[] = [];

  private projectData: ProjectData[] = [
    {
      key: 'dental',
      category: 'fullstack',
      tech: ['Angular', 'Node.js', 'MongoDB', 'Bootstrap'],
      status: 'completed',
      repoFront: 'https://github.com/GabrielIturreCs/Registrar-Turno-Sistema-Clinico',
      repoBack: 'https://github.com/GabrielIturreCs/SistemaConsultorioBackend',
      deployUrl: 'https://registrar-turno-sistema-clinico.onrender.com/',
    },
    {
      key: 'delrey',
      category: 'fullstack',
      tech: ['Angular', 'Node.js', 'PostgreSQL', 'Docker'],
      status: 'in-progress',
      repoFront: 'https://github.com/ivovicencio/Ecommerce-DelRey',
      repoBack: 'https://github.com/ivovicencio/Ecommerce-DelRey-backend',
    },
    {
      key: 'paqueteria',
      category: 'backend',
      tech: ['Java', 'Spring Boot', 'JWT'],
      status: 'completed',
      repoBack: 'https://gitlab.com/ivothaiel/poo2025-grupo15'
    },
    {
      key: 'soysi',
      category: 'fullstack',
      tech: ['Angular', 'TypeScript', 'Bootstrap', 'JAVA', 'Spring Boot', 'PostgreSQL', 'JWT'],
      status: 'in-progress',
      repoFront: 'https://github.com/ivovicencio/SoySi-Front',
      repoBack: 'https://github.com/ivovicencio/SoySi-Back',
    },
    {
      key: 'olympo',
      category: 'frontend',
      tech: ['HTML', 'CSS', 'JavaScript'],
      status: 'completed',
      repoFront: 'https://github.com/ivothaiel/OlimpoGym-TP1',
      deployUrl: 'https://ivothaiel.github.io/OlimpoGym-TP1/',
    },
    {
      key: 'EcommerceTech',
      category: 'frontend',
      tech: ['React', 'JavaScript', 'Bootstrap'],
      status: 'completed',
      repoFront: 'https://github.com/Alexander-Ajalla/PV-TP-Integrador-Grupo09'
    }
  ];

  constructor(private ts: TranslationService) {
    this.buildProjects();
    effect(() => {
      this.ts.currentLang();
      this.buildProjects();
    });
  }

  private buildProjects() {
    this.projects = this.projectData.map((p) => ({
      title: this.ts.translate(`projects.${p.key}.title`),
      category: p.category,
      description: this.ts.translate(`projects.${p.key}.desc`),
      history: this.ts.translate(`projects.${p.key}.history`),
      tech: p.tech,
      status: p.status,
      repoFront: p.repoFront,
      repoBack: p.repoBack,
      deployUrl: p.deployUrl,
    }));
  }

  get filteredProjects() {
    return this.projects.filter((p) => {
      const matchesFilter = this.activeFilter === 'all' || p.category === this.activeFilter;
      const matchesSearch =
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(this.searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  openModal(project: Project) {
    this.selectedProject = project;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }
}
