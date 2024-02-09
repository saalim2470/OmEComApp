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
  1: "Banner Ad - Home Page",
  2: "Slider Ad - Home Page",
  3: "Banner Ad - Search Page",
  4: "Slider Ad - Search Page",
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
  1: "1 Month",
  2: "3 Months",
  3: "6 Months",
  4: "12 Months",
  5: "Week - 1 to 7",
  6: "Week - 8 to 14",
  7: "Week - 15 to 21",
  8: "Week - 22 to 28",
};

export const getUserUploadTime = (uploadTime) => {
  // Assuming itemData.createdDate is a UTC date string
  const utcDate = momentz.utc(uploadTime);

  // Set the desired timezone (Indian Standard Time)
  const indianDate = utcDate.tz("Asia/Kolkata");

  // Format the date and time or use it as needed
  return indianDate.format("YYYY-MM-DD HH:mm:ss");
};
export const typeOfAds = {
  1: "homePage",
  2: "searchPage",
  3: "innerPage",
};

export const getFileExtension = (fileName) => {
  return fileName.split(".").pop();
};

export const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bitmap",
  "bmp",
  "svg",
  "webp",
];

// const serverPathWithDomain=`${baseURL}${serverImagePath}/${item}`
