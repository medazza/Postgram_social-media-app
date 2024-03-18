import React, { useState, useContext } from "react";
import { Button, Form, Image } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";

import { Context } from "../Layout";

function CreateComment(props) {
  const { postId, refresh } = props;
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({});

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const createCommentForm = event.currentTarget;

    if (createCommentForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: user.id,
      body: form.body,
      post: postId,
    };

    axiosService
      .post(`/post/${postId}/comment/`, data)
      .then(() => {
        setForm({ ...form, body: "" });
        setToaster({
          type: "success",
          message: "Comment posted successfully🚀",
          show: true,
          title: "Comment!",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "",
          show: true,
          title: "An error occurred.!",
        });
      });
  };

  return (
    <Form
      className="d-flex flex-row justify-content-between"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Image
        src={user.avatar}
        roundedCircle
        width={48}
        height={48}
        className="my-2 border border-primary border-1"
      />
      <Form.Group className="m-2 w-75 py-1">
        <Form.Control
          className="py-2 rounded-pill border-primary"
          type="text"
          placeholder="Write a comment"
          value={form.body}
          name="body"
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </Form.Group>
      <div className="m-auto p-0">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={form.body === undefined}
          size="small"
        >
          Comment
        </Button>
      </div>
    </Form>
  );
}

export default CreateComment;