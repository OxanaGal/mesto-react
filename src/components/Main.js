import React from 'react';
import Card from './Card';
import { api } from '../utils/Api';

function Main(props) {

   const [userName, setUserName] = React.useState('');
   const [userDescription, setUserDescription] = React.useState('');
   const [userAvatar, setUserAvatar] = React.useState('');
   const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
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
          <div className="profile__avatar" onClick={ props.onEditAvatar}>
            <img className="profile__image" src={`${userAvatar}`} alt="Аватар профиля" />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{`${userName}`}</h1>
            <button className="profile__btn profile__btn_action_edit shaded" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__description">{`${userDescription}`}</p>
          </div>
        </div>
        <button className="profile__btn profile__btn_action_add shaded" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((data) => {
              return(
                <Card
                  card={data}
                  key={data._id}
                  name={data.name}
                  link={data.link}
                  likes={data.likes.length}
                  onCardClick={props.onCardClick}
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
