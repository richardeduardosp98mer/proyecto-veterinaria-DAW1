import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface TabLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-gestion-tabs',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './gestion-tabs.html',
  styleUrl: './gestion-tabs.css',
})
export class GestionTabs {
  @Input() tabs: TabLink[] = [];
}
