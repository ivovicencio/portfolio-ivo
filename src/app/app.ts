import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarHeader } from './components/layouts/navbar-header/navbar-header';
import { Footer } from './components/layouts/footer/footer';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarHeader, Footer],
  templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('portfolio');
}
