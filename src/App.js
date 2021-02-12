import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";
//import PropTypes from "prop-types";

class App extends React.Component{
  state = {
    isLoading : true,
    movies : []
  };

  getMovies = async () => {
    const {
      data : {
         data : {movies}
        }
      } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies, isLoading : false});
  }
  componentDidMount(){
    this.getMovies();
    
  }
  renderMovies = () => {
    const movies = this.state.movies.map(movie =>{
      return (
        <Movie 
          title={movie.title_english}
          poster={movie.large_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      )
    });
    return movies;
  }
  render(){
    const {isLoading} = this.state;
    return ( 
      <div className={isLoading ? "App--loading" : "App"}>
        {isLoading ? "Loading..." : this.renderMovies()}
      </div>
    );
  }
}

export default App;
