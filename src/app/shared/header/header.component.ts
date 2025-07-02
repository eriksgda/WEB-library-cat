import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private translate: TranslateService) { }

  toggleLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'pt' : 'en');
  }

}
