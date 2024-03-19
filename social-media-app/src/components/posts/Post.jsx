import React, { useContext } from "react";
import { format } from "timeago.js";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Image, Card, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import UpdatePost from "./UpdatePost";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";

function Post(props) {
  const { post, refresh, isSinglePost } = props;
  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleLikeClick = (action) => {
    axiosService
      .post(`/post/${post.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axiosService
      .delete(`/post/${post.id}/`)
      .then(() => {
        setToaster({
          type: "warning",
          message: "Post deleted 🚀",
          show: true,
          title: "Post Deleted",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "An error occurred.",
          show: true,
          title: "Post Error",
        });
      });
  };

  return (
    <>
      <Card className="rounded-3 my-1"
        data-testid="post-test">
        <Card.Body>
          <Card.Title className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <Image
                src={post.author.avatar}
                roundedCircle
                width={48}
                height={48}
                className="me-2 border border-primary border-2"
              />
              <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                <p className="fs-6 m-0">{post.author.name}</p>
                <p className="fs-6 fw-lighter">
                  <small>{format(post.created)}</small>
                </p>
              </div>
            </div>
            {user.name === post.author.name && (
              <div>
                <Dropdown>
                  <Dropdown.Toggle as={MoreToggleIcon} />
                  <Dropdown.Menu>
                    <UpdatePost post={post}
                    refresh={refresh} />
                    <Dropdown.Item 
                      onClick={handleDelete}
                      className="text-danger"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <LikeOutlined
              style={{
                width: "24px",
                height: "24px",
                padding: "1px",
                fontSize: "20px",
                color: post.liked ? "#0D6EFD" : "#C4C4C4",
              }}
              onClick={() => {
                if (post.liked) {
                  handleLikeClick("remove_like");
                } else {
                  handleLikeClick("like");
                }
              }}
            />
              <p className="ms-1 fs-6">
                <small>{post.likes_count} like</small>
              </p>
            </div>
            <div className="d-flex flex-row">
        
                {!isSinglePost && (
                  <Link to={`/post/${post.id}/`}>
              <CommentOutlined
                style={{
                  width: "24px",
                  height: "24px",
                  padding: "1px",
                  fontSize: "20px",
                  color: "#C4C4C4",
                }}
              />
            </Link>
              )}
          {!isSinglePost && (
          <p className="ms-1 fs-6">
                <small>
                  {post.comments_count} comments
                </small>
          </p>
          )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Post;