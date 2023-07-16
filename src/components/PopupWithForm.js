import React from 'react';

function PopupWithForm(props) {
  return (
    <>
      <div className={`popup ${props.name} ${props.isOpen ? 'popup_opened' : ''}`} id={`${props.nameId}`}>
        <div className="popup__conteiner">
          <button className={`popup__close popup__close_${props.name}`} onClick={props.onClose} type="button"></button>
          <form className="popup__form" id={`${props.formId}`} name={`${props.formId}`}>
            <h2 className="popup__form-title">{props.title}</h2>
            {props.children}
            <button className="popup__form-submit-button" type="submit">{props.submitButtonLabel}</button>
          </form>
        </div>
      </div>
    </>
  );
}


export default PopupWithForm;
