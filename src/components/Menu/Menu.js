import MenuButton from '../MenuButton/MenuButton';
import Navigation from '../Navigation/Navigation';

import './menu.css';
import './menu__container.css';
import './menu_open.css';

function Menu(props) {
  return (
    <aside className={ 'menu ' + (props.isOpen ? 'menu_open' : '') }>
      <div className="menu__container">
        <MenuButton location="menu" onMenuOpen={ props.onMenuOpen } />
        <Navigation location="menu" />
      </div>
    </aside>
  );
}

export default Menu;
