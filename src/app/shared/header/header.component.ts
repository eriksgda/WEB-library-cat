import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LucideAngularModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  toggleLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'pt' : 'en');
  }

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  protected readonly window = window;
}
