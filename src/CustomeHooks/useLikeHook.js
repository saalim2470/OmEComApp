import { useEffect, useState } from "react";

const useLikeHook = (likeDataRes, saveDataRes) => {
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    if (likeDataRes != null && likeDataRes?.Success) {
      updateData(likeDataRes?.Data, "like");
    }
  }, [likeDataRes]);
  useEffect(() => {
    if (saveDataRes != null && saveDataRes.Success) {
      updateData(saveDataRes?.Data, "save");
    }
  }, [saveDataRes]);

  const updateData = (data, actionType) => {
    const updatedData = postData.map((item) => {
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

  return { postData, setPostData };
};

export default useLikeHook;
