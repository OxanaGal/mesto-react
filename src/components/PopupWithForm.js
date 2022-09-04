function PopupWithForm(props) {
  return (
    <div className={`popup popup_view_${props.name} ${props.isOpen ? 'popup__opened' : ''}`}>
      <div className="popup__container" onClick={event => event.stopPropagation()}>
        <form className="form" name="delete-comfirmation-form" method="get" action="#" noValidate>
          <h2 className="form__heading">{`${props.title}`}</h2>
          {props.children}
          <div className="form__handlers">
            <button className="popup__btn popup__btn_action_save" type="submit">{`${props.btnText}`}</button>
            <button className="popup__btn popup__btn_action_close shaded" type="button" onClick={props.onClose}></button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default PopupWithForm;
