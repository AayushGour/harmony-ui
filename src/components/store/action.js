// Application Level Redux actions 
import axios from "axios";
import { LOGIN_STATUS, TOGGLE_SIDEBAR } from "./action-types";
// export const api_call = () => { 
//     axios.get(""); 
// } 
export const toggleSidebar = (value) => {
    return ({ type: TOGGLE_SIDEBAR, payload: value })
}
export const setLoggedIn = (value) => {
    return ({ type: LOGIN_STATUS, payload: value })
}
export const ytSearch = (params) => {
    return axios.post(process.env.SEARCH_API, params).then(async (response) => {
        return await formatSearchData(response);
    });
}

export const formatSearchData = async (response) => {

    let searchItems = response.data?.items?.filter(elem => elem?.type === "video")?.map((item) => {
        return {
            id: item?.id,
            title: item?.title,
            type: item?.type,
            url: item?.url,
            duration: item?.duration,
            thumbnailUrl: item?.bestThumbnail?.url || item?.thumbnails[0]?.url,
            authorName: item?.author?.name,
            authorAvatarUrl: item?.author?.bestAvatar?.url || item?.author?.avatars[0]?.url,
            authorChannelUrl: item?.author?.url

        };
    });
    let channelObject = response.data?.items?.find(elem => elem?.type === "channel");
    let shelfObject = response.data?.items?.find(elem => elem?.type === "shelf");
    let shelfItems = shelfObject?.items?.map(elem => {
        return {
            id: elem?.id,
            title: elem?.title,
            type: elem?.type,
            url: elem?.url,
            duration: elem?.duration,
            thumbnailUrl: elem?.bestThumbnail?.url || elem?.thumbnails[0]?.url,
            author: elem?.author?.name,
            authorAvatarUrl: elem?.author?.bestAvatar?.url || elem?.author?.avatars[0]?.url,
            authorChannelUrl: elem?.author?.url

        }
    });

    await Promise.all([searchItems, shelfItems]);

    let channel = !!channelObject ? {
        authorName: channelObject?.name,
        authorAvatarUrl: channelObject?.bestAvatar?.url || channelObject?.avatars[0]?.url,
        authorChannelUrl: channelObject?.url,
        description: channelObject?.descriptionShort,
        subscribers: channelObject?.subscribers,
        type: channelObject?.type
    } : null;

    let shelf = !!shelfObject ? {
        name: shelfObject?.title,
        type: shelfObject?.type,
        items: shelfItems,
    } : null

    return ({
        continuation: response?.data?.continuation,
        searchItems: searchItems,
        originalQuery: response?.data?.originalQuery,
        correctedQuery: response?.data?.correctedQuery,
        channel: channel,
        shelf: shelf
    })
}