import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { deleteTokens } from "../Authentication";

import "./navbar.css";
import logo from "./dumbbell.png";

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="user-nav">
      <Navbar light expand="md">
        <NavbarBrand className="logo d-flex align-items-end" href="/">
          Lenge
          <img className="navbar-brand" src={logo} alt="dumbbell-img"></img>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto the-nav" navbar>
            {props.logged ? (
              <UncontrolledDropdown className="item-nav" nav inNavbar>
              <DropdownToggle nav caret>
                Profile
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/profile">View Profile</DropdownItem>
                <DropdownItem onClick={deleteTokens} href="/logIn">Log Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            ) : (
              <UncontrolledDropdown className="item-nav" nav inNavbar>
                <DropdownToggle nav caret>
                  Sign In
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/signUp">Sign Up</DropdownItem>
                  <DropdownItem href="/logIn">Log In</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
