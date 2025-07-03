import { Component } from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [
    LucideAngularModule,
    TranslatePipe
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  protected readonly window = window;
}
