import React, { useContext } from "react";
import { format } from "timeago.js";
import { LikeOutlined } from "@ant-design/icons";
import { Image, Card, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import UpdateComment from "./UpdateComment";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";

function Comment(props) {
  const { postId, comment, refresh } = props;
  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleLikeClick = (action) => {
    axiosService
      .post(`/post/${postId}/comment/${comment.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axiosService
      .delete(`/post/${postId}/comment/${comment.id}/`)
      .then(() => {
        setToaster({
          type: "danger",
          message: "Comment deleted 🚀",
          show: true,
          title: "Comment Deleted",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "warning",
          message: "Comment deleted 🚀",
          show: true,
          title: "Comment Deleted",
        });
      });
  };

  return (
    <Card className="rounded-3 my-2" data-testid="comment-test">
      <Card.Body>
        <Card.Title className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <Image
              src={comment.author.avatar}
              roundedCircle
              width={48}
              height={48}
              className="me-2 border border-primary border-1"
            />
            <div className="d-flex flex-column justify-content-start align-self-center mt-2">
              <p className="fs-6 m-0">{comment.author.name}</p>
              <p className="fs-6 fw-lighter">
                <small>{format(comment.created)}</small>
              </p>
            </div>
          </div>
          {user.name === comment.author.name && (
            <div>
              <Dropdown>
                <Dropdown.Toggle as={MoreToggleIcon} />
                <Dropdown.Menu>
                  <UpdateComment
                    comment={comment}
                    refresh={refresh}
                    postId={postId}
                  />
                  <Dropdown.Item onClick={handleDelete} className="text-danger">
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </Card.Title>
        <Card.Text>{comment.body}</Card.Text>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <LikeOutlined
            style={{
              width: "24px",
              height: "24px",
              padding: "1px",
              fontSize: "20px",
              color: comment.liked ? "#0D6EFD" : "#C4C4C4",
            }}
            onClick={() => {
              if (comment.liked) {
                handleLikeClick("remove_like");
              } else {
                handleLikeClick("like");
              }
            }}
          />
            <p className="ms-1 fs-6">
              <small>{comment.likes_count} like</small>
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Comment;