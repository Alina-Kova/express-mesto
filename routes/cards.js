const router = require('express').Router();
const {
  getCard, createCard, deleteCard, likeCard, dislike,
} = require('../controllers/cards');

router.get('/', getCard);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislike);

module.exports = router;
