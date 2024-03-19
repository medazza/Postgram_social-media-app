import React from "react";
import { Card, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProfileCard(props) {
  const navigate = useNavigate();
  const { user } = props;

  const handleNavigateToProfile = () => {
    navigate(`/profile/${user.id}/`);
  };

  return (
    <Card className="border-0" data-testid="profile-card">
      
        <Card.Body>
          <div className="d-flex flex-column align-items-center text-center">
        <Image
          src={user.avatar}
          roundedCircle
          width={48}
          height={48}
          className="my-2 border border-primary border-1"
        />
        
          <Card.Title className="fs-6">{user.name}</Card.Title>
          <Button variant="primary" onClick={handleNavigateToProfile}>
           See profile
          </Button>
        </div>
        </Card.Body>
      
    </Card>
  );
}

export default ProfileCard;