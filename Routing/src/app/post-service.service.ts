import { Injectable } from '@angular/core';
import { Post } from './post';

//VERSIONE VAR E FUNZIONI
var posts: Post[] = []

export function fetchPosts() {
  fetch("http://localhost:3000/posts").then(res => res.json()).then((res: Post[]) => {
      console.log(res);
      posts = res
    })
}

export function getPosts() {
  return posts
}

export function getPostFiltered(a:boolean) {
  let arrFiltrato = posts.filter((e)=>{return (e.active == a)});
  return arrFiltrato;
}

export function attivaPost(id:number) {
  console.log("id", id);
  
  let indexPostDaAttivare = posts.findIndex((e)=>{
    console.log(e);
    return e.id == id
    // if(e.id == id) { return true; }
    // return false
  })
  if(!indexPostDaAttivare){
    throw new Error("Post non trovato")
  }
  posts[indexPostDaAttivare].active = true
  //modificare il post sul server
  fetch("http://localhost:3000/posts/"+id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(posts[indexPostDaAttivare])
  })
  // .then((res):Promise<Post>=>{
    // if(res.ok) {
  //     posts[indexPostDaAttivare].active = true
  //   }
  //   throw new Error("Modifica fallita")
  // }).catch((err)=>{
  //   console.log("Err", err.getMessage());
    
  // })
  //modifichiamo la variabile
}
export function disattivaPost(id:number) {
  let indexPostDaAttivare = posts.findIndex((e)=>{
    return e.id == id
    // if(e.id == id) { return true; }
    // return false
  })

  //QUA L'ERRORE, QUANDO ELIMINO L'ELEMENTO DI ID 1 L'INDICE NELL'ARRAY CHE TROVO SARÀ 0
  //IF(0) RETITUISCE FALSE, QUINDI IF(!0) DA TRUE E DI CONSEGUENZA GENERAVA L'ERRORE
  //IN QUESTO CASO PER CONTROLLARE SE È UNDEFINED CONVIENE CONTROLLARE ESATTAMENTE QUESTO
//  if(!indexPostDaAttivare){ <- QUESTA LA RIGA ERRATA
  if(indexPostDaAttivare==undefined){
    throw new Error("Post non trovato")
  }
  posts[indexPostDaAttivare].active = false
  //modificare il post sul server
  fetch("http://localhost:3000/posts/"+id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(posts[indexPostDaAttivare])
  })
  // .then((res):Promise<Post>=>{
    // if(res.ok) {
  //     posts[indexPostDaAttivare].active = true
  //   }
  //   throw new Error("Modifica fallita")
  // }).catch((err)=>{
  //   console.log("Err", err.getMessage());
    
  // })
  //modifichiamo la variabile
}

//VERSIONE CLASSE
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  posts:Post[] = []

  fetchPosts() {
    fetch("http://localhost:3000/posts").then(res => res.json()).then((res: Post[]) => { this.posts = res })
  }
  
  getPosts() {
    return this.posts
  }
  
  getPostFiltered(a:boolean) {
    let arrFiltrato = this.posts.filter((e)=>{return (e.active == a)});
    return arrFiltrato;
  }
}