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
      savedList: [],
      movie: {
        title: "",
        director: "",
        metascore: "",
        stars: []
      }
    };
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
      .then(res => this.props.history.push("/"))
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route
          exact
          path="/"
          render={props => <MovieList {...props} movies={this.state.movies} />}
        />
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
