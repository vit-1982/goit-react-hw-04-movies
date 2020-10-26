import React, { Component } from "react";
import { Link } from "react-router-dom";
import getQueryParams from "../../utils/getQueryParams";
import Notification from "../../components/Notification/Notification";
import Searchbox from "../../components/Searchbox/Searchbox";
import Spinner from "../../components/Spinner/Spinner";
import movieAPI from "../../services/movieApi";
import qetQueryParams from "../../utils/getQueryParams";

export default class MoviePage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);
    if (query) {
      this.fetchMovies(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = qetQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);
    if (prevQuery !== nextQuery) {
      this.fetchMovies(nextQuery);
    }
  }

  fetchMovies = (query) => {
    this.setState({ loading: true });
    movieAPI
      .fetchMovieWithQuery(query)
      .then((movies) => this.setState({ movies }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleChangeQuery = (query) => {
    this.props.history.push({
      // pathname: this.props.location.pathname,
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { movies, error, loading } = this.state;
    const { match } = this.props;
    return (
      <>
        <Searchbox onSubmit={this.handleChangeQuery} />
        {error && (
          <Notification message={`Oops, something went wrong: ${error}`} />
        )}
        {loading && <Spinner />}
        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `${match.url}/${movie.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
