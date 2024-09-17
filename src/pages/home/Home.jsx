import React from "react";
import { useAuth } from "../../storeing-data/auth";
import HomeBanner from "../../components/Banners/HomeBanner";
import Categories from "../../components/suggestion/categories";
import RecomendedProducts from "../../components/suggestion/RecomendedProducts";

const Home = () => {
  const { user, loading } = useAuth();

  return (
    <>
      <div className="view">
        <HomeBanner />
        <Categories />
        <RecomendedProducts/>
      </div>
    </>
  );
};

export default Home;
