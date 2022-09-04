function ImagePopup (props){
  console.log(props.card)
    return (
        <div className={`popup popup_view_${props.name} ${props.card.isOpen ? 'popup__opened' : ''}`}>
        <div className="preview">
          <button className="popup__btn popup__btn_action_close shaded" type="button" onClick={props.onClose}></button>
          <figure className="preview__area">
            <img className="preview__image" src={`${props.card.card.link}`} alt="Изображение"/>
              <figcaption className="preview__description">{`${props.card.card.name}`}</figcaption>
          </figure>
        </div>
      </div>
    )
}

export default ImagePopup;
