import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './features/home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
