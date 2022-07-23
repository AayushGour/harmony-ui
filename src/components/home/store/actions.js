import axios from "axios";

export const getTrending = (params) => {
    let qParams = new URLSearchParams(params);
    const apiUrl = `${process.env.TRENDING_API}?${qParams?.toString()}`
    return axios.get(apiUrl).then(resp => {
        let artists = resp.data?.artists?.map(elem => {
            return {
                rank: elem?.rank,
                title: elem?.title,
                authorName: elem?.artist,
                thumbnailUrl: elem?.cover,
            }
        });
        let trending = resp.data?.trending?.map(elem => {
            return {
                rank: elem?.rank,
                title: elem?.title,
                authorName: elem?.artist,
                thumbnailUrl: elem?.cover,
            }
        });
        // let albums = resp.data?.albums;
        return {
            // albums: albums,
            trending: trending,
            artists: artists
        }
    });
}