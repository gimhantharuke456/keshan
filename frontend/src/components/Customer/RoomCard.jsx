import React from "react";
import { Card, Button, Rate } from "antd";

const RoomCard = ({ room }) => {
  return (
    <div style={styles.cardContainer}>
      <Card
        cover={
          <img alt={room.name} src={room.image} style={styles.cardImage} />
        }
        title={room.name}
        extra={
          <Button type="primary" onClick={() => alert(`Booking ${room.name}`)}>
            Book Now
          </Button>
        }
      >
        <p>
          <span style={styles.locationIcon}>📍</span> {room.floor}
        </p>
        <Rate allowHalf value={room.rating} />
        <p style={styles.price}>{`LKR ${room.price}/Night`}</p>
      </Card>
    </div>
  );
};

const styles = {
  cardContainer: {
    width: "300px",
    margin: "10px",
  },
  cardImage: {
    height: "200px",
    objectFit: "cover",
  },
  locationIcon: {
    color: "#FFA500",
  },
  price: {
    marginTop: "10px",
    fontWeight: "bold",
  },
};

export default RoomCard;
