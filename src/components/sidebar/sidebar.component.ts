import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Section } from '../../app/app';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
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
}
