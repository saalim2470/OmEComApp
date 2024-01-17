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
