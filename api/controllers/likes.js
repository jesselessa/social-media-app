import { db } from "../utils/connect.js";

export const getLikes = (req, res) => {
  const postId = req.query.postId;
  const q = "SELECT userId FROM likes WHERE postId = ?";

  db.query(q, [postId], (error, data) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Error fetching likes.", error: error });
    return res.status(200).json(data.map((like) => like.userId));
  });
};

export const addLike = (req, res) => {
  const loggedInUserId = req.userInfo.id;
  const postId = req.body.postId;

  const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";
  const values = [loggedInUserId, postId];

  db.query(q, [values], (error, data) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Error adding like.", error: error });
    if (data.affectedRows > 0) return res.status(200).json("Post liked.");
  });
};

export const deleteLike = (req, res) => {
  const loggedInUserId = req.userInfo.id;
  const postId = req.query.postId;

  const q = "DELETE FROM likes WHERE userId = ? AND postId = ?";

  db.query(q, [loggedInUserId, postId], (error, data) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Error deleting like.", error: error });

    if (data.affectedRows > 0) return res.status(200).json("Post unliked.");
  });
};
