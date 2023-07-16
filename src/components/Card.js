import React from 'react';

function Card({ card, onCardClick }) {

  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <div className="element__signature">
        <h2 className="element__text-photo">{card.name}</h2>
        <div className="element__config-licke">
          <button className="element__like" type="button"></button>
          <span className="element__number">{card.likes.length}</span>
        </div>
      </div>
      <button className="element__delete-button" type="button"></button>
    </article>
  );
}

export default Card;
