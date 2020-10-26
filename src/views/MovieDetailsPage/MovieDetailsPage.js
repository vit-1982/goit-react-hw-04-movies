import React, { Component, Suspense } from "react";
import { Link, Route } from "react-router-dom";
import movieAPI from "../../services/movieApi";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";
import routes from "../../routes";
import detailsRoutes from "../../detailsRoutes";
import styles from "./MovieDetailsPage.module.css";

export default class MovieDetailsPage extends Component {
  state = { movie: null, error: null, loading: false };

  componentDidMount() {
    this.setState({ loading: true });
    movieAPI
      .fetchMovieDetails(this.props.match.params.movieId)
      .then((movie) => this.setState({ movie }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  handleGoBack = () => {
    const { state } = this.props.location;
    if (state && state.from) {
      return this.props.history.push(state.from);
    }
    this.props.history.push(routes[1].path);
  };

  render() {
    const { movie, error, loading } = this.state;
    const { match, location } = this.props;
    return (
      <div>
        {error && (
          <Notification message={`Oops, something went wrong: ${error}`} />
        )}
        {loading && <Spinner />}
        {movie && (
          <>
            <button
              type="button"
              onClick={this.handleGoBack}
              className={styles.button}
            >
              <span> &#8592; </span>
              Go Back
            </button>
            <div className={(styles.box, styles.clearfix)}>
              <div className={styles.imgBox}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>

              <div className={styles.descrBox}>
                <h2 className={styles.gap}>
                  {movie.title}({movie.release_date.substr(0, 4)})
                </h2>
                <p className={styles.gap}>Vote average: {movie.vote_average}</p>
                <h3 className={styles.gap}>Overview</h3>
                <p className={styles.gap}>{movie.overview}</p>
                <h3 className={styles.gap}>Genres</h3>
                <p className={styles.gap}>
                  {movie.genres.map((genre) => genre.name).join(" ")}
                </p>
              </div>
            </div>
            <hr />
            <p className={styles.info}>Additional information</p>
            <ul className={styles.linkBox}>
              {detailsRoutes.map((route) => (
                <li key={route.label}>
                  <Link
                    to={{
                      pathname: `${match.url}${route.path}`,
                      state: { from: location.state.from },
                    }}
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
            <hr />
            <Suspense fallback={<h2>...Loading</h2>}>
              {detailsRoutes.map((route) => (
                <Route
                  key={route.path}
                  {...route}
                  path={`${match.path}${route.path}`}
                />
              ))}
            </Suspense>
          </>
        )}
      </div>
    );
  }
}
