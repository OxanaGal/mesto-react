function ImagePopup({ name, card, onClose }) {

  return (
    <div className={`popup popup_view_${name} ${card.isOpen ? 'popup__opened' : ''}`}>
      <div className="preview">
        <button className="popup__btn popup__btn_action_close shaded" type="button" onClick={onClose}></button>
        <figure className="preview__area">
          <img className="preview__image" src={`${card.card.link}`} alt="Изображение" />
          <figcaption className="preview__description">{`${card.card.name}`}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
