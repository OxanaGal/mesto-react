import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDeleteClick }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__columns">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img className="profile__image" src={currentUser.avatar} alt="Аватар профиля" />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{`${currentUser.name || ""}`}</h1>
            <button className="profile__btn profile__btn_action_edit shaded" type="button" onClick={onEditProfile}></button>
            <p className="profile__description">{`${currentUser.about || ""}`}</p>
          </div>
        </div>
        <button className="profile__btn profile__btn_action_add shaded" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards?.map((data) => {
            return (
              <Card
                card={data}
                key={data._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDeleteClick={onCardDeleteClick}
              />
            )
          }
          )}
        </ul>
      </section>
    </main>

  )
}

export default Main;
