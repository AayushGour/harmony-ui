import "./home-page.scss";
import React, { useState } from 'react';
import { useEffect } from "react";
import { getTrending } from "./store/actions";
import { Charts } from "../../common/constants";
import Loader from "../loader/loader";
import { Carousel } from "antd";
import YTItemList from "../yt-items-list/yt-items-list";

const HomePage = (props) => {
    const [topArtistsData, setTopArtistsData] = useState(null);
    const [trendingData, setTrendingData] = useState(null);
    const [albumsData, setAlbumsData] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(true);
    let theme = localStorage.getItem("theme");
    let gradientColor = "";
    useEffect(() => {
        setIsDataLoading(true);
        getTrending({ name: Charts.ARTIST_100, date: new Date().toISOString()?.slice(0, 10) }).then(resp => {
            console.log(resp)
            setTopArtistsData(resp?.artists);
            setTrendingData(resp?.trending);
            setAlbumsData(resp?.albums);
            setIsDataLoading(false);
        }).catch(error => {
            setIsDataLoading(false);
            console.error(error);
        })
    }, [])
    useEffect(() => {


    }, [localStorage.getItem("theme")])
    if (theme === "light") {
        gradientColor = "white";
    } else {
        gradientColor = "#00151e";
    }

    return (
        <div className={`content-container home-page ${isDataLoading ? "loading" : ""}`}>
            {isDataLoading ? <Loader className="h-100 w-100" /> :
                <>
                    <div className="top-10-carousel-container">
                        <h1 className="trending-title">Top 10 Trending</h1>
                        <Carousel
                            autoplay={true}
                            autoplaySpeed={5000}
                            dotPosition="bottom"
                            swipe={true}
                            swipeToSlide={true}
                        >
                            {!!trendingData && trendingData?.slice(0, 10).map((trendingItem) => {
                                return <div className="trending-card" key={trendingItem?.rank}>
                                    <div className="background-image" style={{ backgroundImage: `linear-gradient(to right, ${gradientColor} 20%, transparent 100%), url(${trendingItem?.thumbnailUrl})` }}></div>
                                    <div className="title-container">
                                        <h1 className="rank">{trendingItem?.rank}</h1>
                                        <div className="name-container d-flex flex-column align-item-start justify-content-center">
                                            <h1>{trendingItem?.title}</h1>
                                            <h2>{trendingItem?.authorName}</h2>
                                        </div>
                                    </div>
                                    <img className="trending-artist-img" src={trendingItem?.thumbnailUrl} alt={`${trendingItem?.title}-${trendingItem?.authorName}`} />
                                </div>
                            })}
                        </Carousel>
                    </div>
                    <div className="artist-container card">
                        <h2 className="top-artist-title">Top 5 Artists</h2>
                        {/* <Carousel
                            autoplay={true}
                            autoplaySpeed={5000}
                            dotPosition="bottom"
                            swipe={true}
                            swipeToSlide={true}
                        >
                    </Carousel> */}

                        <div className="artist-carousel-container">
                            <div className="carousel-track">
                                {topArtistsData?.slice(0, 5)?.map(elem => {
                                    return <div key={elem?.rank} className="artist-card">
                                        <img src={elem?.thumbnailUrl} />
                                        <h3>{elem?.authorName}</h3>
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>
                    <YTItemList className="top-100-list-container" elements={trendingData?.slice(10)} displayRank={true} />
                    {/* <div className="album-container">
                        {albumsData?.map(elem => {
                            return <div className="album-card">
                                <img src="/assets/img/record-img.png" />
                                <span>{elem}</span>
                            </div>
                        })}
                    </div> */}
                    {/* <div className="other-content-container">
                        <div className="artist-top-100-container">
                        </div>
                    </div> */}
                </>
            }
        </div>
    )
}

export default HomePage;