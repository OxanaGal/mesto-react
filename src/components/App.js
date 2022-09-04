import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard({isOpen: false, card: {}})
  }

  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, card: {}});
  const handleCardClick = (card) => {
    setSelectedCard({isOpen: true, card: card})
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm name="profile-form" title="Редактировать профиль" btnText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <fieldset className="form__input-container">
          <label htmlFor="title" className="form__label">
            <input type="text" className="form__item form__text-name" id="title" name="name" placeholder="Имя" minLength="2"
              maxLength="40" /*value=""*/ required />
            <span className="form__input-error title-error"></span>
          </label>
          <label htmlFor="profile-info" className="form__label">
            <input type="text" className="form__item form__text-info" id="profile-info" name="about" placeholder="О себе"
              minLength="2" maxLength="200" /*value=""*/ required />
            <span className="form__input-error profile-info-error"></span>
          </label>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name="card-form" title="Новое место" btnText="Сохранить" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <fieldset className="form__input-container">
          <label htmlFor="card-title" className="form__label">
            <input type="text" className="form__item form__item_shaded form__card-title" id="card-title" name="name"
              /*value=""*/ placeholder="Название" minLength="2" maxLength="30" required />
            <span className="form__input-error card-title-error"></span>
          </label>
          <label htmlFor="image-link" className="form__label">
            <input type="url" className="form__item form__item_shaded form__card-link" id="image-link" name="link" /*value=""*/
              placeholder="Ссылка на картинку" required />
            <span className="form__input-error image-link-error"></span>
          </label>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name="avatar-form" title="Обновить аватар" btnText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <fieldset className="form__input-container">
          <label htmlFor="avatar-link" className="form__label">
            <input type="url" className="form__item form__item_shaded form__card-link" id="avatar-link" name="link" /*value=""*/
              placeholder="Ссылка на картинку" required />
            <span className="form__input-error avatar-link-error"></span>
          </label>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name="delete-comfirmation" title="Вы уверены?" btnText="Да" onClose={closeAllPopups} />
      <ImagePopup name="image" card={selectedCard} isOpen={selectedCard.isOpen} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
