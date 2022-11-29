import { Injectable } from '@angular/core';
import { Post } from './post';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostServiceService {

//   constructor() { }


//   getPosts(){
//     let f = fetch("http://localhost:3000/posts")
//     let r = f.then((res):Promise<Post[]>=>{
//       if(res.ok){
//         return res.json()
//       }
//       throw new Error("Lettura fallita")
//     })

//     r.then((res)=>{
//       this.posts=res
//     })

//     r.catch((err)=>{
//       console.log("Errore", err.getMessage());
//     })
//   }
// }

//Funzione per leggere tutti i dati
export function getPosts(){
  let f = fetch("http://localhost:3000/posts")
  let r = f.then((res):Promise<Post[]>=>{
    //È importante controllare che la lettura vada a buon fine
    if(res.ok){
      return res.json()
    }
    //genero un errore in caso di response non ok
    //il comando throw manda l'errrore al .catch() della Promise r (mentre il return va al .then())
    throw new Error("Lettura fallita")
  })

  //Questo è come vorremmo usare il res intenrno all'esecuzione asincrona di r ma non abbiamo accesso a this.posts che è invece la proprietà di un component
  // r.then((res)=>{
  //   this.posts=res
  // })
  //Quindi il .then() qua sopra vogliamo impostarlo sempre a r ma all'interno di un a classe che abbia this.posts (active-post-component)


  //aggiungo alla Promise r un catch per catturare l'eventuale errore generato precedentemente
  r.catch((err)=>{
    console.log("Errore", err.getMessage());
  })

  //resituisco r così da poter mettere il then dove uso questa funzione per manipolare il risultato che arriverà dall'esecuzione della funzione in r
  return r;
}

export function getPostFiltered(a:boolean){
  //a partire dalla funzione getPosts() aggiungo un ulteriore then in coda che filtra gli elementi in base alla proprietà .active e il parametro a
  let t = getPosts().then((res)=>{
    //.filter metodo degli array. richiede una funzione come parametro e restituisce un nuovo array "filtrato"
    //la funzione parametro ha un parametro che è l'elemento che volgiamo decidere se mantenere o meno nel nuovo array
    //la funzoine parametro ha un return boolean, se è vero l'elemento sarà tenuto altrimenti no
    let arrFiltrato = res.filter((e)=>{return (e.active == a)})
    return arrFiltrato
  })
  //anche questa funzione restituisce la Promise così possiammo mettere un then in coda ovunque vogliamo usare getPostFiltered() e decidere come usare i dati (ovvero i post filtrati)
  return t
}
