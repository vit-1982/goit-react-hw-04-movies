import { lazy } from "react";

const routes = [
  {
    path: "/",
    label: "Home",
    exact: true,
    component: lazy(() =>
      import(
        "./views/HomePage/HomePage.js" /* webpackChunkName: 'homePage-view'*/
      )
    ),
  },
  {
    path: "/movies",
    label: "Movies",
    exact: true,
    component: lazy(() =>
      import(
        "./views/MoviesPage/MoviesPage.js" /* webpackChunkName: 'movies-view'*/
      )
    ),
  },
  {
    path: "/movies/:movieId",
    label: "MovieDetails",
    exact: false,
    component: lazy(() =>
      import(
        "./views/MovieDetailsPage/MovieDetailsPage.js" /* webpackChunkName: 'movieDetails-view'*/
      )
    ),
  },
];

export default routes;
