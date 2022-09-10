import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({ name, link })
  }

  return (
    <PopupWithForm name="card-form" title="Новое место" btnText="Создать" btnLoadingText="Создаю..."
    isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading}>
      <fieldset className="form__input-container">
        <label htmlFor="card-title" className="form__label">
          <input type="text" className="form__item form__item_shaded form__card-title" id="card-title" name="name"
            value={name} onChange={handleNameChange} placeholder="Название" minLength="2" maxLength="30" required />
          <span className="form__input-error card-title-error"></span>
        </label>
        <label htmlFor="image-link" className="form__label">
          <input type="url" className="form__item form__item_shaded form__card-link" id="image-link" name="link" value={link} onChange={handleLinkChange}
            placeholder="Ссылка на картинку" required />
          <span className="form__input-error image-link-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
