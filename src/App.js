import React, { useState, useEffect,  } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/movie/:id">
            <DetailMovie />
          </Route>
        </Switch>
    </Router>
  );
}

function Home(){

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch('/api/movies');
      const payload = await response.json();
      setMovies(payload.data);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Nice Movies:</p>
        <div className="movie-grid">
          {
            movies.map(movie => {
              return <MovieCard  movie={movie}/>
            })
          }
        </div>
        
      </header>
    </div>
  );
}

function MovieCard(props){
  const movie = props.movie

  return (
    <Link to={`/movie/${movie.id}`}>
      <div>
        title: {movie.original_title}
        tagline: {movie.tagline}
        vote_average: {movie.vote_average}
      </div>
    </Link>
  )
}

function DetailMovie(){
  const [movie, setMovie] = useState({});
  const params = useParams()

  useEffect(() => {
    async function getData() {
      const response = await fetch(`/api/movies/${params.id}`);
      const payload = await response.json();
      payload.data.release_date = new Date(payload.data.release_date.split('/').reverse().join('/')).toLocaleDateString(undefined,{});
      setMovie(payload.data);
    }
    getData();
  }, []);

  return(
    <div>
      <Link to="/">back to home</Link>
      <ul>
        <li>original title: {movie.original_title}</li>
        <li>overview: {movie.overview}</li>
        <li>release date: {movie.release_date}</li>
        <li>runtime: {movie.runtime} Minutes</li>
        <li>status: {movie.status}</li>
        <li>tagline: {movie.tagline}</li>
        <li>title: {movie.title}</li>
        <li>vote average: {movie.vote_average}</li>
        <li>vote count: {movie.vote_count}</li>
      </ul>
    </div>
  )

}

export default App;
