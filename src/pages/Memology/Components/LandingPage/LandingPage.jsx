import React from "react";
import {useTranslation} from "react-i18next";
import {useSocket} from "../../GameContext";
import UserRow from "../UserRow/UserRow";

const LandingPage = () => {
    const {t} = useTranslation('translation', {keyPrefix: 'game'});
    const {userData, winnersList} = useSocket();
    return (
        <div className="container">
            <div className="landingPage">
                <h1>{t('static.title')} - Room Player3</h1>
                <p>{t('static.greetings', {userName: userData.name})}</p>
                <p>{t('static.summary')}</p>
            </div>
            <div className="playersRanking">
                <div className="header">
                    Last your game winners:
                </div>
                <div className="playersContainer">
                    {Object.values(winnersList).map((user)=>{
                        return <UserRow user={user} isWinner/>;
                    })}
                </div>
            </div>
        </div>
    );
};
export default LandingPage;
