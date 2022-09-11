import PopupWithForm from "./PopupWithForm"

function ConfirmationPopup({isOpen, onClose, onCardDelete, isLoading}){

  function handleSubmit(event){
    event.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm name="delete-comfirmation" title="Вы уверены?" btnText="Да" btnLoadingText="Удаляю..."
    isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} />
  )
}

export default ConfirmationPopup;
