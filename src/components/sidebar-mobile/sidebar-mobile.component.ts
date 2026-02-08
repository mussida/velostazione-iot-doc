import { CommonModule } from '@angular/common';
import { Component, input, model, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Section } from '../../app/app';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.css',
  animations: [
    trigger('sidebarAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.3s ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class SidebarMobileComponent {
  isOpen = model<boolean>(false);
  sections = input<Section[]>([]);
  subsectionsOpen = new Map<string, boolean>();

  toggleSubsection(section: Section) {
    this.subsectionsOpen.set(
      section.name,
      !this.subsectionsOpen.get(section.name)
    );
  }

  isSubsectionVisible(section: Section) {
    return this.subsectionsOpen.get(section.name) || false;
  }

  closeSidebar() {
    this.isOpen.set(false);
  }
}
