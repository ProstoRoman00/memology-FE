import React, {useState} from "react";
import {useSocket} from "../../SocketContext";
import {useTranslation} from "react-i18next";
import ImagesUtil from "../../../../utils/ImagesUtil";

const VotingPicker = () => {
    const {voteList, topicID, setVote} = useSocket();
    const {t} = useTranslation('translation', {keyPrefix: 'game'});
    const [selectedPicture, setSelectedPicture] = useState(null);
    const pictures = ImagesUtil.getImagesList(Object.values(voteList));

    const handlePictureClick = (picture) => {
        setSelectedPicture(picture);
    };
    const selectedItem = pictures.find((item) => item.key === selectedPicture);
    const getUserVoted = () => {
        return Object.entries(voteList).find(([key, value]) => value === selectedPicture)[0];
    };

    return (
        <div className="landingPage">
            <div className="topOfPage">
                <h1>{t('static.title')} - Room</h1>
                <p>{t('static.vote')}:</p>
                <h2>{t(`situations.${topicID}`)}</h2>
            </div>
            {Object.keys(voteList).length > 0 ?(
                <div className="cards-selector">
                    <div className="image-grid">
                        {pictures.map((picture, index) => (<img
                            key={index}
                            src={picture.url}
                            alt={`Picture ${index + 1}`}
                            className={`image ${selectedPicture === picture.key ? 'selected-image' : ''}`}
                            onClick={() => handlePictureClick(picture.key)}
                        />))}
                    </div>
                    <div className={"selected-container"}>
                        <p>{t('static.selected')}</p>
                        {selectedPicture && (
                            <img src={selectedItem.url} alt={t('static.selected')} className="image selected-image"/>)}
                        <button disabled={!selectedPicture} onClick={() => {setVote(getUserVoted())}}>Submit</button>
                    </div>
                </div>
            ):(
                <div className="cards-selector">Waiting for other people to vote!</div>
            )}

        </div>
    );
};
export default VotingPicker;
