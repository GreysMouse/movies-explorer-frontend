import './menu-button.css';
import './menu-button_location_promo.css';
import './menu-button_location_main.css';
import './menu-button_location_menu.css';

function MenuButton(props) {
  return (
    <button
      className={ 'menu-button ' + (props.location ? `menu-button_location_${props.location}` : '') }
      onClick={ props.onMenuOpen }
    />
  );
}

export default MenuButton;
