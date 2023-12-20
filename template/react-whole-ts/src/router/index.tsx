import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import Article from "@page/Article";

const Layout = React.lazy(() => import("@page/Layout"));
const Board = React.lazy(() => import("@page/Board"));
const Article = React.lazy(() => import("@page/Article"));
const NotFound = React.lazy(() => import("@page/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Board />,
        index: true, // index 设置为 true 变成默认的二级路由
      },
      {
        path: "article",
        element: <Article />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
