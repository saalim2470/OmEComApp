import { useState } from 'react';

const useLikeHook = () => {
    const [postData, setPostData] = useState([]);

    const updateData = (data, actionType) => {
        const updatedData = postData.map(item => {
            if (actionType === "like" && item.id === data.contentId) {
                return {
                    ...item,
                    isCurrentUserLiked: data.isLiked,
                    totalLikes: data.totalLikes,
                };
            }
            if (actionType === "save" && item.id === data.adContentID) {
                return {
                    ...item,
                    isCurrentUserSaved: data.isSaved,
                };
            }
            return item;
        });
        setPostData(updatedData);
    };

    return { postData, updateData,setPostData };
};

export default useLikeHook;
