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
  tiltAngle = 75;
  isGrabbing = false;
  isMomentuming = false;
  dragStartX = 0;
  dragStartRotation = 0;
  momentumVelocity = 0;
  momentumRaf: number | null = null;

  constructor() {
    this.updateOrbitRadius();
  }

  @HostListener('window:resize')
  updateOrbitRadius() {
    const w = window.innerWidth;
    if (w <= 480) {
      this.orbitRadius = 150;
      this.tiltAngle = 55;
    } else if (w <= 767) {
      this.orbitRadius = 200;
      this.tiltAngle = 62;
    } else if (w <= 991) {
      this.orbitRadius = 260;
      this.tiltAngle = 70;
    } else {
      this.orbitRadius = 420;
      this.tiltAngle = 75;
    }
  }

  startDrag(event: MouseEvent | TouchEvent) {
    if (this.momentumRaf !== null) {
      cancelAnimationFrame(this.momentumRaf);
      this.momentumRaf = null;
    }
    this.isGrabbing = true;
    this.isMomentuming = false;
    this.momentumVelocity = 0;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    this.dragStartX = clientX;
    this.dragStartRotation = this.systemRotation;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseDrag(event: MouseEvent) {
    if (!this.isGrabbing) return;
    const prev = this.systemRotation;
    this.systemRotation = this.dragStartRotation - (event.clientX - this.dragStartX) * 0.5;
    this.momentumVelocity = this.systemRotation - prev;
  }

  @HostListener('document:mouseup')
  endMouseDrag() {
    if (!this.isGrabbing) return;
    this.isGrabbing = false;
    this.startMomentum();
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchDrag(event: TouchEvent) {
    if (!this.isGrabbing) return;
    const prev = this.systemRotation;
    this.systemRotation =
      this.dragStartRotation - (event.touches[0].clientX - this.dragStartX) * 0.5;
    this.momentumVelocity = this.systemRotation - prev;
  }

  @HostListener('document:touchend')
  endTouchDrag() {
    if (!this.isGrabbing) return;
    this.isGrabbing = false;
    this.startMomentum();
  }

  private startMomentum() {
    const absV = Math.abs(this.momentumVelocity);
    if (absV < 0.3) return;

    this.isMomentuming = true;

    const step = () => {
      this.systemRotation += this.momentumVelocity;
      this.momentumVelocity *= 0.97;
      if (Math.abs(this.momentumVelocity) > 0.05) {
        this.momentumRaf = requestAnimationFrame(step);
      } else {
        this.isMomentuming = false;
        this.momentumRaf = null;
      }
    };

    this.momentumRaf = requestAnimationFrame(step);
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
