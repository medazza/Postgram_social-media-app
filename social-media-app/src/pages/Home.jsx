import React from "react";
import Layout from "../components/Layout";
import { Row, Col, Image } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { getUser } from "../hooks/user.actions";
import { Post } from "../components/posts";
import CreatePost from "../components/posts/CreatePost";
import ProfileCard from "../components/profile/ProfileCard";

function Home() {
  const posts = useSWR("/post/", fetcher, {
    refreshInterval: 20000,
  });
  const profiles = useSWR("/user/?limit=5", fetcher);

  const user = getUser();

  if (!user) {
    return <div>Loading!</div>;
  }

  return (
    <Layout>
      <Row className="justify-content-evenly m-0">
        <Col sm={6}>
          <Row className="border rounded  align-items-center">
            <Col className="flex-shrink-1">
              <Image
                src={user.avatar}
                roundedCircle
                width={52}
                height={52}
                className="my-2 border border-primary border-1"
              />
            </Col>
            <Col sm={10} className="flex-grow-1">
              <CreatePost refresh={posts.mutate} />
            </Col>
          </Row>
          <Row className="my-2">
            {posts.data?.results.map((post, index) => (
              <Post key={index} post={post} refresh={posts.mutate} />
            ))}
          </Row>
        </Col>
        <Col sm={4} className="border rounded py-4 h-50">
          <h5 className="font-weight-bold text-center">Suggestions</h5>
          <div className="d-flex flex-column align-items-center">
            {profiles.data &&
              profiles.data.results.map((profile, index) => (
                <ProfileCard key={index} user={profile} />
              ))}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Home;