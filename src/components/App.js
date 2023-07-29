import React from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import api from './utils/api'
import EditProfilePopup from './EditProfilePopup'



function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const [currentUser, setCurrentUser] = React.useState(null) // <-- 



    React.useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo)
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

    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard(null);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleUpdateUser = ( name, description ) => {
        api.setUserInfo( name, description )
            .then((userInfo) => setCurrentUser(userInfo))
            .catch(console.error)
    }

    return (
        <>
            <Header />
            <CurrentUserContext.Provider value={currentUser}>
                <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen={handleEditAvatarClick} onCardClick={handleCardClick} />
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <PopupWithForm name="edit-form" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} nameId="editForm" formId="editForm" title="Редактировать профиль" submitButtonLabel="Сохранить">
                    <div className="popup__input-container">
                        <input id="name" required minLength={2} maxLength={40} className="popup__form-input popup__form-input_text_name" placeholder="Name" type="text" name="userName" />
                        <span id="name-error" className="popup__message"></span>
                    </div>
                    <div className="popup__input-container">
                        <input id="job" required minLength={2} maxLength={200} className="popup__form-input popup__form-input_text_role" placeholder="Job" type="text" name="userRole" />
                        <span id="job-error" className="popup__message"></span>
                    </div>
                </PopupWithForm>
                <PopupWithForm name="add-form" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} nameId="addForm" formId="userImg" title="Новое место" submitButtonLabel="Создать">
                    <div className="popup__input-container">
                        <input id="text_img" required minLength={2} maxLength={30} className='popup__form-input popup__form-input_text_img' placeholder="Название" type="text" name="commentImg" />
                        <span id="text_img-error" className='popup__message'></span>
                    </div>
                    <div className='popup__input-container'>
                        <input id="url" required className='popup__form-input popup__form-input_src_img' placeholder="Ссылка на картинку" type="url" name="linkImg" />
                        <span id="url-error" className='popup__message'></span>
                    </div>
                </PopupWithForm>
                <PopupWithForm name="delete" nameId="delete" formId="deleteForm" title="Вы уверены?" submitButtonLabel="Да" ></PopupWithForm>
                <PopupWithForm name="edit-avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} nameId="editAvatar" formId="editAvatarForm" title="Обновить аватар" submitButtonLabel="Сохранить">
                    <div className='popup__input-container'>
                        <input id="url_avatar" required className='popup__form-input popup__form-input_edit_avatar' placeholder="Ссылка на аватар" type="url" name="linkAvatar" />
                        <span id="url_avatar-error" className='popup__message'></span>
                    </div>
                </PopupWithForm>
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
