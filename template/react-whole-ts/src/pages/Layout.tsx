import React, { memo } from "react";
import { Outlet } from "react-router-dom";

const Layout = memo(() => {
  return (
    <div>
      <h1>{import.meta.env.VITE_ENV}</h1>
      Layout
      <Outlet />
    </div>
  );
});

export default Layout;
