import { Component, OnInit } from '@angular/core';
import {fetchPosts} from './post-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Routing';
  ngOnInit(): void {
    //Non il modo esatto di eseguire qualcosa all'avvio ma per ora vediamo così
    fetchPosts()
  }
}
