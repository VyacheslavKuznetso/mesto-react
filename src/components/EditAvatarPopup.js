import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from './contexts/CurrentUserContext'




function EditAvatarPopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [avatar, setAvatar] = React.useState('')

    React.useEffect(() => {
        if (currentUser) {
            setAvatar(currentUser.avatar);
        }
    }, [currentUser]);


    function handleChange(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatar
        });
    }

    return (
        <PopupWithForm name="edit-avatar" isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit} nameId="editAvatar" formId="editAvatarForm" title="Обновить аватар" submitButtonLabel="Сохранить">
            <div className='popup__input-container'>
                <input id="url_avatar" required className='popup__form-input popup__form-input_edit_avatar' placeholder="Ссылка на аватар" type="url" name="linkAvatar" value={avatar} onChange={handleChange} />
                <span id="url_avatar-error" className='popup__message'></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup