import React, { Component } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovie from "./Movies/AddMovie";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      savedList: [],
      movie: {
        title: "",
        director: "",
        metascore: "",
        stars: []
      }
    };
  }

  componentDidMount() {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    axios
      .get(`http://localhost:5000/api/movies`)
      .then(res => this.setState({ movies: res.data }));
  }

  addToSavedList = movie => {
    console.log(this.state.savedList);
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({ savedList });
  };

  add = movie => {
    axios
      .post("http://localhost:5000/api/movies", movie)
      .then(res => this.setState({ movies: res.data }));
  };

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route
          path="/movies/:id"
          render={props => {
            return <Movie {...props} addToSavedList={this.addToSavedList} />;
          }}
        />
        <Route
          path="/movie/add"
          render={props => {
            return (
              <AddMovie add={this.add} movie={this.state.movie} {...props} />
            );
          }}
        />
      </div>
    );
  }
}
