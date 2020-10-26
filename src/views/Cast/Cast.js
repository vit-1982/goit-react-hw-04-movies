import React, { Component } from "react";
import movieAPI from "../../services/movieApi";
import styles from "./Cast.module.css";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

export default class Cast extends Component {
  state = {
    cast: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    movieAPI
      .fetchMovieCast(this.props.match.params.movieId)
      .then((data) => data.cast)
      .then((cast) => this.setState({ cast }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { cast, error, loading } = this.state;

    return (
      <>
        {error && (
          <Notification message={`Oops, something went wrong: ${error}`} />
        )}
        {loading && <Spinner />}
        {cast.length > 0 ? (
          <ul>
            {cast.map((castItem) => (
              <li key={castItem.id} className={styles.castItem}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${castItem.profile_path}`}
                    alt="IMG"
                    className={styles.img}
                  />
                </div>
                {castItem.name}
                <p>Character: {castItem.character}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.note}>There is no cats for this movie</p>
        )}
      </>
    );
  }
}
