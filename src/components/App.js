import React from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import api from './utils/api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'



function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const [sure, setSure] = React.useState(false)

    const [currentUser, setCurrentUser] = React.useState(null) // <-- 

    const [cards, setCards] = React.useState([])



    React.useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo)
            })
            .catch(console.error)

        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch(console.error)

    }, [])


    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true)

    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true)
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true)
    }

    const deleteCardSure = () => {
        setSure(true)
    }

    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard(null);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleUpdateUser = ({ name, about: description }) => {
        api.postUserInfo({ name, about: description })
            .then((userInfo) => {
                setCurrentUser(userInfo)
                closeAllPopups()
            })
            .catch(console.error)
    }

    const handleUpdateAvatar = ({ avatar: avatar }) => {
        api.postUserAvatar({ avatar: avatar })
            .then((avatar) => {
                setCurrentUser(avatar)
                closeAllPopups()
            })
            .catch(console.error)
    }


    const handleAddPlaceSubmit = ({ name, link }) => {
        api.addCard({ name, link })
            .then((newCard) => {
                setCards([...cards, newCard]);
                closeAllPopups();
            })
            .catch(console.error)

    }

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
            <Header />
            <CurrentUserContext.Provider value={currentUser}>
                <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen={handleEditAvatarClick} onCardClick={handleCardClick} deleteCardSure={deleteCardSure} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateAddCard={handleAddPlaceSubmit} />
                <PopupWithForm name="delete" nameId="delete" formId="deleteForm" title="Вы уверены?" submitButtonLabel="Да" ></PopupWithForm>
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
