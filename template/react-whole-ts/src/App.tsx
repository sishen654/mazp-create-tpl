import { Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./router";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={Router} />
      </Suspense>
    </div>
  );
}

export default App;
