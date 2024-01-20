import { defaultCategoryImg } from "./defaults";

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

    // Check if the key group already exists, if not, create it
    if (!result[key]) {
      result[key] = [];
    }

    // Push the current item into the corresponding key group
    result[key].push(item);

    return result;
  }, {});
}
