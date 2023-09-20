import React from "react";
import {useSocket} from "../../GameContext";
import CardPicker from "../CardPicker/CardPicker";
import WaitingHolder from "../WaitingHolder/WaitingHolder";
import VotingPicker from "../VotingPicker/VotingPicker";
import PlayersRanking from "../PlayersRanking/PlayersRanking";

const GameRoom = () => {
    const {stateData} = useSocket();

    const loadRoomState = () => {
        if(stateData.selection){
            return <CardPicker/>;
        }else if(stateData.voting){
            return <VotingPicker/>;
        }
        return <WaitingHolder/>;
    };
  return (
      <div className="container">
          {loadRoomState()}
          <PlayersRanking/>
      </div>
  );
};
export default GameRoom;
