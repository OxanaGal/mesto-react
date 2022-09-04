function Card({ card, onCardClick, link, name, likes }) {

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card">

      <img className="card__image shaded" src={`${link}`} alt={`${name}`} onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{`${name}`}</h2>
        <div className="card__like-section">
          <button className="card__btn card__btn_action_like shaded"></button>
          <span className="card__like-counter">{`${likes}`}</span>
        </div>
      </div>
      <button className="card__btn card__btn_action_delete shaded"></button>
    </li>
  )
}

export default Card;
