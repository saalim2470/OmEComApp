import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import CategorySlice from "./categorySlices/CategorySlice";
import GetAdContentSlice from "./AdContentSlices/GetAdContentSlice";
import SearchContentSlice from "./searchContentSlices/SearchContentSlice";
import LoginSlice from "./authSlices/LoginSlice";
import AddPostData from "./addAdContentSlices/AddPostData";
import AddAdContent from "./AdContentSlices/AddAdContent";
import GetCountrySlice from "./contrySlices/GetCountrySlice";
import GetStateSlice from "./contrySlices/GetStateSlice";
import GetCitySlice from "./contrySlices/GetCitySlice";
import CreateAccountSlice from "./authSlices/CreateAccountSlice";
import SubscriptionPlanSlice from "./subscriptionSlices/SubscriptionPlanSlice";
import GetSubscriptionPlanSlice from "./subscriptionSlices/GetSubscriptionPlanSlice";
import StoreDataSlice from "./StoreDataSlice";
import GetUserContentSlice from "./profileSlices/GetUserContentSlice";
import EditProfileSlice from "./authSlices/EditProfileSlice";
import GetCommentByContentIdSlice from "./commentSlices/GetCommentByContentIdSlice";
import PostCommentSlice from "./commentSlices/PostCommentSlice";
import GetContentByUserId from "./profileSlices/GetContentByUserId";
import LikeSlice from "./AdContentSlices/LikeSlice";
import SaveContentSlice from "./AdContentSlices/SaveContentSlice";
import DeleteAdContent from "./AdContentSlices/DeleteAdContent";
import GetSavedContent from "./AdContentSlices/GetSavedContent";
import GetLegalData from "./legalData/GetLegalData";
import GetGpsData from "./gpsSlice/GetGpsData";
import Follow_UnFollowSlice from "./profileSlices/Follow_UnFollowSlice";
import PostBannerOrSliderSlice from "./bannerorSliderAdSlices/PostBannerOrSliderSlice";
import GetPromotedContentSlice from "./bannerorSliderAdSlices/GetPromotedContentSlice";
import PasswordSlice from "./authSlices/PasswordSlice";
import GetCurrentUserAllNotifications from "./NotificationSlices/GetCurrentUserAllNotifications";
import SubscriptionTypeRulesSlice from "./subscriptionSlices/SubscriptionTypeRulesSlice";
import GetUserReadNotification from "./NotificationSlices/GetUserReadNotification";
import GetAdContentById from "./AdContentSlices/GetAdContentById";

const store = configureStore({
  reducer: {
    category: CategorySlice,
    getAddContentByCategory: GetAdContentSlice,
    searchContent: SearchContentSlice,
    login: LoginSlice,
    addPost: AddPostData,
    addAdContentData: AddAdContent,
    getCountry: GetCountrySlice,
    getState: GetStateSlice,
    getCity: GetCitySlice,
    createAccount: CreateAccountSlice,
    subscriptionPlan: SubscriptionPlanSlice,
    getSubscriptionPlan: GetSubscriptionPlanSlice,
    storeData: StoreDataSlice,
    getUSerContent: GetUserContentSlice,
    editProfile: EditProfileSlice,
    getCommentByContentId: GetCommentByContentIdSlice,
    postComment: PostCommentSlice,
    getContentByUserId: GetContentByUserId,
    like: LikeSlice,
    saveContent: SaveContentSlice,
    deleteAdContent: DeleteAdContent,
    getSavedContent: GetSavedContent,
    getLegalData: GetLegalData,
    gpsData: GetGpsData,
    follow_UnFollowSlice: Follow_UnFollowSlice,
    postBannerOrSliderSlice: PostBannerOrSliderSlice,
    getPromotedContentSlice: GetPromotedContentSlice,
    passwordSlice: PasswordSlice,
    getCurrentUserAllNotifications: GetCurrentUserAllNotifications,
    subscriptionTypeRulesSlice: SubscriptionTypeRulesSlice,
    getUserReadNotification: GetUserReadNotification,
    getAdContentById: GetAdContentById,
  },
  middleware: [thunk],
});

export default store;
