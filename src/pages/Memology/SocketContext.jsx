import {createContext, useContext, useState} from "react";
import useWebSocket from "react-use-websocket";


const SocketContext = createContext({data: {}});
const useSocket = () => useContext(SocketContext);

const SocketProvider = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [playersData, setPlayersData] = useState({});
    const [stateData, setStateData] = useState({canStart: false, waiting: true, selection: false, voting: false, finished: false});
    const [userData, setUserData] = useState({});
    const [imagesList, setImagesList] = useState([]);
    const [voteList, setVoteList] = useState([]);
    const [roomsList, setRoomsList] = useState({});
    const [winnersList, setWinnersList] = useState({});
    const [topicID, setTopicID] = useState(0);

    const getRoomsList = () => {
        socket.sendMessage(`{"type":"getRoomsList"}`);
    }

    const createRoom = () => {
        socket.sendMessage(`{"type":"createRoom"}`);
    }
    const startGame = () => {
        socket.sendMessage(`{"type":"startGame"}`);
    }
    const joinRoom = (roomID) => {
        socket.sendMessage(`{"type":"joinRoom", "roomID":${roomID}}`);
    }
    const setSelectedImage = (imageID) => {
        setImagesList([]);
        socket.sendMessage(`{"type":"setSelectedImage", "imageID":${imageID}}`);
    }
    const setVote = (userID) => {
        setVoteList([]);
        socket.sendMessage(`{"type":"setVote", "userID":${userID}}`);
    }

    const processMessage = (message) => {
        const dataJSON = JSON.parse(message);
        setUserData(dataJSON['userData']);
        if(dataJSON['playersList']) {
            setPlayersData(dataJSON['playersList']);
            setStateData({
                canStart: dataJSON['canStart'],
                waiting: dataJSON['waiting'],
                selection: dataJSON['selection'],
                voting: dataJSON['voting'],
                finished: dataJSON['finished'],
            });
        }
        if(dataJSON['imageList']){
            setImagesList(dataJSON['imageList']);
            setTopicID(dataJSON['topicID']);
        }
        if(dataJSON['voteList']){
            setVoteList(dataJSON['voteList']);
        }
        if(dataJSON['rooms']){
            setRoomsList(dataJSON['rooms']);
        }
        if(dataJSON['winners']){
            setWinnersList(dataJSON['winners']);
        }
    };

    const socket = useWebSocket(
        `ws://localhost:7359`,
        {
            onOpen: () => { console.log('opened'); setIsLoading(false); },
            onMessage: (event) =>  processMessage(event.data),
            shouldReconnect: (closeEvent) => true
        });
    const values = {
        //tabs
        isLoading,

        //data
        userData,
        playersData,
        stateData,
        imagesList,
        voteList,
        topicID,
        roomsList,
        winnersList,

        //functions
        createRoom,
        startGame,
        joinRoom,
        setSelectedImage,
        setVote,
        getRoomsList
    };
    return (
        <SocketContext.Provider value={values}>{props.children}</SocketContext.Provider>
    );
}

export {
    useSocket,
    SocketProvider
};
