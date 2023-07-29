import React from 'react';
import api from './utils/api'
import Card from './Card'
import { CurrentUserContext } from './contexts/CurrentUserContext'



function Main(props) {

    const [cards, setCards] = React.useState([]);

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch(console.error)
    }, []);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.likeCard(card._id, isLiked)
            .then((newCard) => {
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                // Обновляем стейт
                setCards(newCards);
            });
    }

    function handleCardDelete(card) {
        // Отправляем запрос в API для удаления карточки
        api.deleteCard(card._id)
            .then(() => {
                // Фильтруем массив cards, исключая удаленную карточку
                const updatedCards = cards.filter((c) => c._id !== card._id);
                // Обновляем стейт, присваивая новый массив без удаленной карточки
                setCards(updatedCards);
            })
    }





    return (
        <>
        {currentUser && (
                    <main className="content">
                    <section className="block-profile">
                        <div className="profile">
                            <div className="profile__coteiner-avatar">
                                {currentUser && <img className="profile__avatar" src={currentUser.avatar} />}
                                <button className="profile__edit-avatar-button" type="button" aria-label="Редактировать аватар" id="profileEditAvatar" onClick={props.isEditAvatarPopupOpen}></button>
                            </div>
                            <div className="profile__info-block">
                                <div className="profile__data">
                                    <h1 className="profile__title">{currentUser && currentUser.name}</h1>
                                    <button className="profile__edit-button" type="button" aria-label="Редактировать" id="editUser" onClick={props.onEditProfile}></button>
                                </div>
                                <p className="profile__subtitle" id="specially">{currentUser && currentUser.about}</p>
                            </div>
                        </div>
                        <button className="block-profile__add-button" type="button" aria-label="Добывить" id="addContentButton" onClick={props.isAddPlacePopupOpen}></button>
                    </section>
                    <section className="elements">
                        <CurrentUserContext.Provider value={currentUser}>
                            {cards.map((card) => (
                                <Card
                                    key={card._id}
                                    card={card}
                                    onCardClick={props.onCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                />
                            ))}
                        </CurrentUserContext.Provider>
                    </section>
                </main>
        )}
        </>
    )
}



export default Main;