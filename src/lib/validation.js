const validateName = (name) => name.length >= 2; // arrowfunction ohne body {} gibt einen implicit return zurück --> true / false
const validateEmail = (email) =>
  /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]*$/.test(email);
const validatePrice = (price, free_transfer) =>
  (price > 0 && !free_transfer) || free_transfer;

const validatePlayer = (player) =>
  validateName(player.name) &&
  validateEmail(player.email) &&
  validatePrice(player.price, player.free_transfer);

export default validatePlayer;
