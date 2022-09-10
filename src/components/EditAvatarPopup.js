import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm name="avatar-form" title="Обновить аватар" btnText="Сохранить" btnLoadingText="Сохраняю..."
    isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading}>
      <fieldset className="form__input-container">
        <label htmlFor="avatar-link" className="form__label">
          <input ref={avatarRef} type="url" className="form__item form__item_shaded form__card-link" id="avatar-link" name="avatar"
            placeholder="Ссылка на картинку" required />
          <span className="form__input-error avatar-link-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
