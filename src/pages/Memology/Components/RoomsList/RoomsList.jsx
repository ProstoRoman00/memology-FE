import React from "react";
import {useSocket} from "../../SocketContext";
import "./styles.scss";

const RoomsList = () => {
    const {roomsList, getRoomsList, createRoom, startGame, joinRoom, setSelectedImage, setVote} = useSocket();
    return (
        <div className="roomsList">
            <div className="header">
                <p>Rooms list</p>
            </div>
            <div className="buttons">
                <button onClick={createRoom}>Create Own Room</button>
                <button onClick={getRoomsList}>Reload rooms list</button>
                {/*<button onClick={startGame}>startGame</button>*/}
                {/*<button onClick={() => setSelectedImage(document.imageIDtoSelect)}>setSelectedImage</button>*/}
                {/*<button onClick={() => setVote(document.setVoteID)}>setVote</button>*/}
            </div>
            <div className="roomsContainer">
                {
                    Object.values(roomsList).map(data => {
                        console.log(data);
                        return <div className="room" key={data.id}><p>{data.name} Room</p> <button onClick={() => joinRoom(data.id)}>Join room</button></div>;
                    })
                }
            </div>
        </div>
    );
};
export default RoomsList;
