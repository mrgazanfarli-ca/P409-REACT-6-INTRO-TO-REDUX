import React from 'react';
import {
    Navbar,
    Nav,
    NavbarToggler,
    NavItem,
    Collapse, Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { IAppState } from 'store/models';
import { IProduct } from 'models';

export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const basket = useSelector<IAppState, IProduct[]>(state => state.basket);

    const toggle = React.useCallback(() => setIsOpen(prevValue => !prevValue), []);

    return (
        <Navbar color="light" light expand="md">
            <NavLink className="navbar-brand" to="/">reactstrap</NavLink>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink to="/categories" activeClassName="active" className="nav-link">Categories</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            <Button style={{ backgroundColor: 'transparent', border: 'none' }} className="basket-button">
                <FaShoppingBasket />
                {Boolean(basket.length) && (
                    <span className="item-count">{basket.length}</span>
                )}
            </Button>
        </Navbar>
    )
}
