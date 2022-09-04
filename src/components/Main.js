import {useEffect, useState} from 'react';
import Card from './Card';
import { api } from '../utils/Api';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__columns">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img className="profile__image" src={`${userAvatar}`} alt="Аватар профиля" />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{`${userName}`}</h1>
            <button className="profile__btn profile__btn_action_edit shaded" type="button" onClick={onEditProfile}></button>
            <p className="profile__description">{`${userDescription}`}</p>
          </div>
        </div>
        <button className="profile__btn profile__btn_action_add shaded" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((data) => {
            return (
              <Card
                card={data}
                key={data._id}
                name={data.name}
                link={data.link}
                likes={data.likes.length}
                onCardClick={onCardClick}
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
