function ImagePopup({ name, card, isOpen, onClose }) {

  function handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_view_${name} ${isOpen ? 'popup__opened' : ''}`} onClick={handleOverlayClose}>
      <div className="preview">
        <button className="popup__btn popup__btn_action_close shaded" type="button" onClick={onClose}></button>
        <figure className="preview__area">
          <img className="preview__image" src={`${card.link}`} alt={`${card.name}`} />
          <figcaption className="preview__description">{`${card.name}`}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
