function Card(props){
  console.log(props.card)
  function handleClick() {
    props.onCardClick(props.card);
  }

    return (
        <li className="card">

          <img className="card__image shaded" src={`${props.link}`} alt="description" onClick={handleClick}/>
            <div className="card__description">
              <h2 className="card__title">{`${props.name}`}</h2>
              <div className="card__like-section">
                <button className="card__btn card__btn_action_like shaded"></button>
                <span className="card__like-counter">{`${props.likes}`}</span>
              </div>
            </div>
            <button className="card__btn card__btn_action_delete shaded"></button>
        </li>
    )
}

export default Card;
