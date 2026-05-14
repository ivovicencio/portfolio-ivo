import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translate.pipe';

interface TechItem {
  name: string;
  logo: string;
  angle: number;
  level: number;
  descKey: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  systemRotation = 0;
  selectedTechIndex = -1;
  isProfileOpen = false;
  isSkillOpen = false;
  selectedTech: TechItem | null = null;
  orbitRadius = 420;

  constructor() {
    this.updateOrbitRadius();
  }

  @HostListener('window:resize')
  updateOrbitRadius() {
    const w = window.innerWidth;
    if (w <= 480) this.orbitRadius = 130;
    else if (w <= 767) this.orbitRadius = 170;
    else if (w <= 991) this.orbitRadius = 240;
    else this.orbitRadius = 420;
  }

  technologies: TechItem[] = [
    {
      name: 'Angular',
      logo: 'assets/angular-logo.png',
      angle: 0,
      level: 70,
      descKey: 'angular',
    },
    {
      name: 'React',
      logo: 'assets/react-logo.png',
      angle: 51,
      level: 40,
      descKey: 'react',
    },
    {
      name: 'Node.js',
      logo: 'assets/nodejs-logo.png',
      angle: 103,
      level: 30,
      descKey: 'nodejs',
    },
    {
      name: 'Java',
      logo: 'assets/java-logo.png',
      angle: 154,
      level: 20,
      descKey: 'java',
    },
    {
      name: 'JavaScript',
      logo: 'assets/js-logo.png',
      angle: 206,
      level: 30,
      descKey: 'javascript',
    },
    {
      name: 'Docker',
      logo: 'assets/docker-logo.png',
      angle: 257,
      level: 60,
      descKey: 'docker',
    },
    {
      name: 'Linux',
      logo: 'assets/linux-logo.png',
      angle: 309,
      level: 50,
      descKey: 'linux',
    },
  ];

  selectTech(index: number) {
    this.selectedTechIndex = index;
    this.selectedTech = this.technologies[index];
    this.isSkillOpen = true; // Abre la carta al tocar

    let targetRotation = 90 - this.selectedTech.angle;
    const currentMod = this.systemRotation % 360;
    const diff = targetRotation - currentMod;
    if (diff > 180) targetRotation -= 360;
    else if (diff < -180) targetRotation += 360;
    this.systemRotation += targetRotation - currentMod;
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
    if (this.isProfileOpen) this.isSkillOpen = false;
  }

  closeSkill() {
    this.isSkillOpen = false;
  }

  downloadCV(lang: string) {
    const fileMap: Record<string, string> = {
      es: 'CV_IVOVICENCIO_ES_2026.pdf',
      en: 'CV_IVOVICENCIO_EN_2026.pdf',
    };
    const filename = fileMap[lang] || 'CV_IVOVICENCIO.pdf';
    const link = document.createElement('a');
    link.href = `assets/${filename}`;
    link.download = filename;
    link.click();
  }
}
