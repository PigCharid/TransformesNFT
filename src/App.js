import React from "react";
import TopBar from "./components/TopBar";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Stake from "./page/Stake";
import Alert from "./components/Alert";
import Mint from "./components/Mint";
import Loading from "./components/Loading";
import Cast from "./components/Cast";

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/b&c" element={<Stake />} />
      </Routes>
      <Mint />
      <Cast />
      <Loading />
      <Alert />
    </>
  );
}

export default App;
