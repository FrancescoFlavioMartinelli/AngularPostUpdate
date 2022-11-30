import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { getPostFiltered, disattivaPost, PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-active-posts',
  templateUrl: './active-posts.component.html',
  styleUrls: ['./active-posts.component.scss']
})
export class ActivePostsComponent implements OnInit {

  posts:Post[] = []

  constructor() { }

  ngOnInit(): void {
    this.posts = getPostFiltered(true);
  }

  disattiva(id:number) {
    console.log(id);
    
    disattivaPost(id)
    this.posts = this.posts.filter((e)=>{
      return !(e.id == id)
      // if(e.id == id) { return false }
      // return true
    })
  }


}
