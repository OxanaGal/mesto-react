import { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleAboutChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: name,
      about: description
    })

  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);

  }, [currentUser, isOpen]);


  return (
    <PopupWithForm name="profile-form" title="Редактировать профиль" btnText="Сохранить" btnLoadingText="Сохраняю..."
    isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} >
          <fieldset className="form__input-container">
            <label htmlFor="title" className="form__label">
              <input type="text" className="form__item form__text-name" id="title" name="name" placeholder="Имя" minLength="2"
                maxLength="40" value={name} onChange={handleNameChange} required />
              <span className="form__input-error title-error"></span>
            </label>
            <label htmlFor="profile-info" className="form__label">
              <input type="text" className="form__item form__text-info" id="profile-info" name="about" placeholder="О себе"
                minLength="2" maxLength="200" value={description} onChange={handleAboutChange} required />
              <span className="form__input-error profile-info-error"></span>
            </label>
          </fieldset>
        </PopupWithForm>
  )
}

export default EditProfilePopup;
