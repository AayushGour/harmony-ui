import PropTypes from "prop-types";

export const YT_ITEM_AUTHOR_PROP_TYPES = PropTypes.shape({
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    channelUrl: PropTypes.string
})

export const YT_ITEM_PROP_TYPES = PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
    duration: PropTypes.string,
    thumbnailUrl: PropTypes.string || null,
    author: YT_ITEM_AUTHOR_PROP_TYPES,
})

export const SEARCH_PROP_TYPES = PropTypes.shape({
    search: PropTypes.string,
    continuation: PropTypes.array,
    limit: PropTypes.number || PropTypes.string,
    pages: PropTypes.number || PropTypes.string,
})