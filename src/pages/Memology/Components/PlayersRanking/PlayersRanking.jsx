import {useSocket} from "../../GameContext";
import React from "react";
import UserRow from "../UserRow/UserRow";

const PlayersRanking = () => {
    const {playersData, stateData, startGame} = useSocket();
    return (
        <div className="playersRanking">
            <div className="header">
                Players Ranking
            </div>
            <div className="playersContainer">
                <div className="buttons">
                    {stateData.canStart ? <button onClick={startGame}>Start the game</button> : <></>}
                </div>
                {Object.values(playersData).map((user)=>{
                    return <UserRow user={user}/>;
                })}
            </div>
        </div>
    );

};
export default PlayersRanking;
