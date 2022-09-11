import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isComfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoadingText, setIsLoadingText] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    setIsConfirmationPopupOpen(!isComfirmationPopupOpen);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsConfirmationPopupOpen(false)
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.isOpen || isComfirmationPopupOpen

  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      }
    }
  }, [isOpen]);



  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.toggleLike(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCard() {

    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== selectedCard._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    setIsLoadingText(true);
    api.patchUserProfile(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingText(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoadingText(true);
    api.patchUserAvatar(avatar)
      .then((res) => {
        console.log(res)
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingText(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoadingText(true);
    api.postNewCard(card)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingText(false);
      });
  }



  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDeleteClick={handleDeleteCardClick}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoadingText} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoadingText} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoadingText} />
        <ConfirmationPopup isOpen={isComfirmationPopupOpen} onClose={closeAllPopups} onCardDelete={handleDeleteCard} isLoading={isLoadingText}/>



        <ImagePopup name="image-preview" card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;
