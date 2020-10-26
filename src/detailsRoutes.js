import { lazy } from "react";

const detailsRoutes = [
  {
    path: "/cast",
    label: "Cast",
    exact: false,
    component: lazy(() =>
      import("./views/Cast/Cast.js" /* webpackChunkName: 'cast-view'*/)
    ),
  },
  {
    path: "/reviews",
    label: "Reviews",
    exact: false,
    component: lazy(() =>
      import("./views/Reviews/Reviews.js" /* webpackChunkName: 'reviews-view'*/)
    ),
  },
];

export default detailsRoutes;
