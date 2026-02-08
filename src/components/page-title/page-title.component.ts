import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css',
})
export class PageTitleComponent {
  title = input<string>();
}
