import React from "react";

const UserRow = (props) => {
    const { user, isWinner = false } = props;
  return (
      <div className="player" key={user.id}>
          <div className="userAvatar">
              <img className="avatar" src="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"/>
              <p>{user.name}</p>
          </div>
          <p>{isWinner ? `${user.gamesWon} Games` : `${user.points} points`}</p>
      </div>);
};
export default UserRow;
