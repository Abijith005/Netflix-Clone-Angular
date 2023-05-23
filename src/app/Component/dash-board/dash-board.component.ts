import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  latestMovies: any;

  actionMovies: any=[];

  comedyMovies: any=[];

  horrorMovies: any=[];

  romanceMovies: any=[];

  trendingMovies: any=[];

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {

    this.getLatestMovies();
    this.getActionMovies();
    this.getComedyMovies();
    this.getHorrorMovies();
    this.getRomanceMovies();
    this.getTrendingMovies();

  }

  getLatestMovies() {
    this.dataService.getLatestMovies().subscribe(res => {
      let index=Math.floor(Math.random()*res.results!?.length??1)
      this.latestMovies =this.changeData(res.results![index])
      
    }, err => {
      console.log('not able to get latest movie. ' + err);

    })
  }

  changeData(res:any):any{
if (!res.backdrop_path) {
  res.backdrop_path='https://image.tmdb.org/t/p/original' + res.poster_path + '?api_key=' + environment.api_key
}
else{
  res.backdrop_path='https://image.tmdb.org/t/p/original' + res.backdrop_path + '?api_key=' + environment.api_key
}

return res
  }

  modifyData(movie: Movie): Movie {
    if (movie.results) {
      movie.results.forEach(element => {
        element.backdrop_path = 'https://image.tmdb.org/t/p/original' + element.backdrop_path + '?api_key=' + environment.api_key
        if (!element.title) {
          element.title = element?.name
        }
      });
    }
    return movie
  }

  getActionMovies() {
    this.dataService.getActionMovies().subscribe(res => {
      this.actionMovies = this.modifyData(res)

    }, err => {
      console.log('not able to get popular movie. ' + err);

    })
  }

  getComedyMovies() {
    this.dataService.getComedyMovies().subscribe(res => {
      this.comedyMovies = this.modifyData(res)
    }, err => {
      console.log('not able to get nowPlayingMovies. ' + err);

    })
  }

  getHorrorMovies() {
    this.dataService.getHorrorMovies().subscribe(res => {
      this.horrorMovies = this.modifyData(res)
    }, err => {
      console.log('not able to get topRatedMovies. ' + err);

    })
  }

  getRomanceMovies() {
    this.dataService.getRomanceMovies().subscribe(res => {
      this.romanceMovies = this.modifyData(res)
    }, err => {
      console.log('not able to get upcoming movies. ' + err);

    })
  }

  getTrendingMovies() {
    this.dataService.getTrendingMovies().subscribe(res => {
      this.trendingMovies = this.modifyData(res)
    }, err => {
      console.log('not able to get trending movies. ' + err);

    })
  }

  // Inside your component class
playVideo(videoId: string) {
  console.log(`https://www.youtube.com/embed/${videoId}`);
  

  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '315';
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.frameBorder = '0';
  iframe.allowFullscreen = true;

  const videoContainer = document.getElementById('videoContainer');
  videoContainer!.innerHTML= '';
  videoContainer!.appendChild(iframe);

  const targetDiv=document.getElementById('videoContainer')
  targetDiv?.scrollIntoView({behavior:'smooth'})
}


}