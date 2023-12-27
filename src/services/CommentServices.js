import { http } from "../../http-common";

class CommentServices {
  getCommentByContentId(contentId, pageNumber, pageSize) {
    return http.get(
      `/Comment/GetCommentByContentId?contentId=${contentId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  postComment(data) {
    return http.post("/Comment", data);
  }
}

export default new CommentServices();
