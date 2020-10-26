import React, { Component } from "react";
import { Link } from "react-router-dom";
import movieAPI from "../../services/movieApi";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";
import routes from "../../routes";
import styles from "./HomePage.module.css";

export default class HomePage extends Component {
  state = {
    movies: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    movieAPI
      .fetchHomePage()
      .then((movies) => this.setState({ movies }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movies, error, loading } = this.state;
    return (
      <>
        {error && (
          <Notification message={`Oops, something went wrong: ${error}`} />
        )}
        {loading && <Spinner />}
        {movies.length > 0 && (
          <>
            <h2 className={styles.title}>Trending today</h2>
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <Link
                    to={{
                      pathname: `${routes[1].path}/${movie.id}`,
                      state: { from: this.props.location },
                    }}
                  >
                    {movie.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}
