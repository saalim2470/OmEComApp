import { useEffect, useState } from "react";

const useLikeHook = (
  likeDataRes,
  saveDataRes,
  commentId,
  commentDataResSuccess,
  totalComment
) => {
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
  useEffect(() => {
    if (commentDataResSuccess) {
      updateData(commentId, "comment");
    }
  }, [commentDataResSuccess]);

  // const updateData = (data, actionType) => {
  //   const updatedData = postData.map((item) => {
  //     if (actionType === "like" && item.id === data.contentId) {
  //       return {
  //         ...item,
  //         isCurrentUserLiked: data.isLiked,
  //         totalLikes: data.totalLikes,
  //       };
  //     }
  //     if (actionType === "save" && item.id === data.adContentID) {
  //       return {
  //         ...item,
  //         isCurrentUserSaved: data.isSaved,
  //       };
  //     }
  //     if (actionType === "comment" && item.id === data) {
  //       return {
  //         ...item,
  //         totalComments: totalComment,
  //       };
  //     }
  //     return item;
  //   });
  //   setPostData(updatedData);
  // };
  const updateData = (data, actionType) => {
    switch (actionType) {
      case "like":
        like(data);
        break;
      case "save":
        save(data);
        break;
      case "comment":
        comment(data);
        break;
      default:
        break;
    }
  };
  const like = (data) => {
    let newArray = [...postData];
    let currentData = newArray.find(
      (element, index) => element.id === data.contentId
    );
    const index = newArray.findIndex((x) => x.id === currentData.id);
    const newData = {
      ...currentData,
      isCurrentUserLiked: data.isLiked,
      totalLikes: data.totalLikes,
    };
    newArray[index] = newData;
    setPostData(newArray);
  };
  const save = (data) => {
    let newArray = [...postData];
    let currentData = newArray.find(
      (element, index) => element.id === data.adContentID
    );
    const index = newArray.findIndex((x) => x.id === currentData.id);
    const newData = {
      ...currentData,
      isCurrentUserSaved: data.isSaved,
    };
    newArray[index] = newData;
    setPostData(newArray);
  };
  const comment = (id) => {
    let newArray = [...postData];
    let currentData = newArray.find((element, index) => element.id === id);
    const index = newArray.findIndex((x) => x.id === currentData.id);
    const newData = {
      ...currentData,
      totalComments: totalComment,
    };
    newArray[index] = newData;
    setPostData(newArray);
  };
  return { postData, setPostData };
};

export default useLikeHook;
