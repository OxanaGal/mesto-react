import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card" key={card._id}>
      <img className="card__image shaded" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-section">
          <button className={`card__btn card__btn_action_like ${isLiked ? 'card__btn_action_liked' : ''} shaded`} onClick={handleCardLike}></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button className={`card__btn ${isOwn ?'card__btn_action_delete': 'hidden'} shaded`} onClick={handleDeleteClick}></button>
    </li>
  )
}

export default Card;
