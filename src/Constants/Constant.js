import { Alert, Share } from "react-native";
import { defaultCategoryImg } from "./defaults";
import momentz from "moment-timezone";

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const checkPassword = (str) => {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
};
export const allCategorie = {
  categoryName: "All Categorie",
  svgImagesPath: defaultCategoryImg,
  id: 0,
  files: null,
  filesUrls: null,
};

export const subcriptionType = {
  0: "Inner Ads",
  1: "Home page/Front page Ad",
  2: "Pin Post",
};

export function groupBy(items, callbackFn) {
  return items.reduce((result, item) => {
    const key = callbackFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);

    return result;
  }, {});
}

export const onShare = async () => {
  try {
    const result = await Share.share({
      message: "Om Classified Download to this link: https://www.google.com/",
      url: "https://www.google.com/",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const subscriptionDuration = {
  1: "One Month",
  2: "Three Months",
  3: "Six Months",
  4: "1 Year",
};

export const getUserUploadTime = (uploadTime) => {
  // Assuming itemData.createdDate is a UTC date string
  const utcDate = momentz.utc(uploadTime);

  // Set the desired timezone (Indian Standard Time)
  const indianDate = utcDate.tz("Asia/Kolkata");

  // Format the date and time or use it as needed
  return indianDate.format("YYYY-MM-DD HH:mm:ss");
};
