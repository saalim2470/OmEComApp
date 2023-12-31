import { baseURL, serverImagePath } from "./defaults";

export const emailValidate = (email) => {
  var regExp = /^[A-Za-z][\w$.]+@[\w]+\.\w+$/;
  console.log(email);
  if (regExp.test(email)) return true;
  else return false;
};
export const passwordValidate = (password) => {
  let regExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (regExp.test(password)) return true;
  else return false;
};
export const imageurl = (imgData) => {
  let data = JSON.parse(imgData);
  let values = [];
  data.map((item, index) => {
    values.push(`${baseURL}${serverImagePath}/${item}`);
  });
  return values;
};
