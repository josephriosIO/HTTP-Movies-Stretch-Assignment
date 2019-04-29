import React, { Component } from "react";

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: this.props.movie
    };
  }

  handleChanges = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    this.setState(prevState => ({
      movie: {
        ...prevState.movie,
        [e.target.name]: value
      }
    }));
  };

  addMovie = e => {
    e.preventDefault();
    const { director, metascore, title, stars } = this.state.movie;

    let movie = {
      title: title,
      director: director,
      metascore: metascore,
      stars: stars.split(",")
    };

    this.props.add(movie);

    this.setState({
      movie: {
        title: "",
        director: "",
        metascore: "",
        stars: []
      }
    });
  };

  render() {
    const { director, metascore, title, stars } = this.state.movie;
    return (
      <div>
        <h1>add movie</h1>
        <form onSubmit={this.addMovie}>
          <input
            onChange={this.handleChanges}
            value={title}
            name="title"
            placeholder="enter movie title"
          />
          <div className="baseline" />
          <input
            onChange={this.handleChanges}
            value={director}
            name="director"
            placeholder="enter director"
          />
          <div className="baseline" />
          <input
            onChange={this.handleChanges}
            value={metascore}
            name="metascore"
            placeholder="enter metascore"
          />
          <div className="baseline" />
          <input
            onChange={this.handleChanges}
            value={stars}
            name="stars"
            placeholder="enter the actors"
          />
          <div className="baseline" />
          <button className="md-button form-button" type="submit">
            add movie
          </button>
        </form>
      </div>
    );
  }
}

export default AddMovie;
