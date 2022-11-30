import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { attivaPost, PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-inactive-posts',
  templateUrl: './inactive-posts.component.html',
  styleUrls: ['./inactive-posts.component.scss']
})
export class InactivePostsComponent implements OnInit {

  posts:Post[]=[]

  constructor(private postSrv:PostServiceService) { }

  ngOnInit(): void {
    this.posts = this.postSrv.getPostFiltered(false)
  }


  attiva(id:number) {
    attivaPost(id)
    this.posts = this.posts.filter((e)=>{
      return !(e.id == id)
      // if(e.id == id) { return false }
      // return true
    })
  }
}
