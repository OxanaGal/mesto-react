function PopupWithForm({ name, isOpen, title, children, btnText, onClose }) {
  return (
    <div className={`popup popup_view_${name} ${isOpen ? 'popup__opened' : ''}`}>
      <div className="popup__container" onClick={event => event.stopPropagation()}>
        <form className="form" name="delete-comfirmation-form" method="get" action="#" noValidate>
          <h2 className="form__heading">{`${title}`}</h2>
          {children}
          <div className="form__handlers">
            <button className="popup__btn popup__btn_action_save" type="submit">{`${btnText}`}</button>
            <button className="popup__btn popup__btn_action_close shaded" type="button" onClick={onClose}></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
