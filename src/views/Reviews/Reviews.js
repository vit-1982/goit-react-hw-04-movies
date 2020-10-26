import React, { Component } from "react";
import movieAPI from "../../services/movieApi";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Reviews.module.css";

export default class Reviews extends Component {
  state = {
    reviews: [],
    error: null,
    loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    movieAPI
      .fetchMovieReviews(this.props.match.params.movieId)
      .then((data) => data.results)
      .then((reviews) => this.setState({ reviews }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { reviews, error, loading } = this.state;
    return (
      <>
        {error && (
          <Notification message={`Oops, something went wrong: ${error}`} />
        )}
        {loading && <Spinner />}
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className={styles.reviews}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.note}>
            We don't have any reviews for this movie
          </p>
        )}
      </>
    );
  }
}
