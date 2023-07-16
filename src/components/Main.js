import React from 'react';
import api from './utils/api'
import Card from './Card'

function Main(props) {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState()
    const [cards, setCards] = React.useState([]);



    React.useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
                setUserName(userInfo.name)
                setUserDescription(userInfo.about)
                setUserAvatar(userInfo.avatar)
            })
            .catch(console.error)
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch(console.error)
    }, []);

    return (
        <main className="content">
            <section className="block-profile">
                <div className="profile">
                    <div className="profile__coteiner-avatar">
                        <img className="profile__avatar" src={userAvatar} />
                        <button className="profile__edit-avatar-button" type="button" aria-label="Редактировать аватар" id="profileEditAvatar" onClick={props.isEditAvatarPopupOpen}></button>
                    </div>
                    <div className="profile__info-block">
                        <div className="profile__data">
                            <h1 className="profile__title">{userName}</h1>
                            <button className="profile__edit-button" type="button" aria-label="Редактировать" id="editUser" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle" id="specially">{userDescription}</p>
                    </div>
                </div>
                <button className="block-profile__add-button" type="button" aria-label="Добывить" id="addContentButton" onClick={props.isAddPlacePopupOpen}></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                    />
                ))}
            </section>
        </main>
    )
}



export default Main;