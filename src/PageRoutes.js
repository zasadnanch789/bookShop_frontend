import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./components/user/signin/SignIn";
import Signup from "./components/user/signup/SignUp";
import Signout from "./components/user/signout/SignOut";
import Menu from "./components/core/Menu";
import NotFound from "./components/core/NotFound";
import Protected from "./components/auth/Protected";
import AdminProtected from "./components/auth/AdminProtected";

import CreateCategory from "./components/admin/category/CreateCategory";
import CreateProduct from "./components/admin/product/CreateProduct";
import Home from "./components/core/Home";

const PageRoutes = () => {
  return (
    <Fragment>
      <Menu />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signout" exact element={<Signout />} />
        <Route path="/user/dashboard" exact element={<Protected />} />
        <Route path="/admin/dashboard" exact element={<AdminProtected />} />
        <Route
          path="/create/category"
          exact
          element={<AdminProtected children={<CreateCategory />} />}
        />
        <Route
          path="/create/product"
          exact
          element={<AdminProtected children={<CreateProduct />} />}
        />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default PageRoutes;
