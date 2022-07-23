import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import Test from "./test";
import SearchPage from "../search-page/search-page";
import HomePage from "../home/home-page";
import Playlists from "../playlist/playlists";

const Router = (props) => {
    return (
        <Routes>
            <Route path="/" >
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route path="/" element={<Navigate to="/playlists" />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/test" element={<Test />} />
                <Route path="/search" element={<SearchPage />} />
            </Route>
        </Routes>
    )
}

export default Router;