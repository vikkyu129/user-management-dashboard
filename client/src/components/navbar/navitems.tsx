import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";
import menuStyle from "./menuStyle";
const ListContainer = styled.ul`
  ${tw`
        flex
        list-none
    `};
`;

const NavItem = styled.li<{ menu?: boolean }>`
  ${tw`
        text-base
        text-black
        font-medium
        mr-5
        cursor-pointer
        transition
        duration-300   
        ease-in-out
        hover:text-lime-700
    `};

  ${({ menu }) =>
    menu &&
    css`
      ${tw`
        text-white
        text-xl
        mb-3
        focus:text-white
    `};
    `};
`;

const LoginButtonContainer = styled.button`
  text-align: center;
  ${tw`
        bg-blue-500
        text-white
        items-center
        font-bold
        rounded
        text-base
        px-2
        py-2
        hover:bg-blue-700
        active:bg-blue-800
        transition
        duration-150
        ease-in-out
    `};
`;

export function NavItems() {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  if (isMobile) {
    return (
      <Menu right styles={menuStyle}>
        <ListContainer>
          <NavItem menu>
            <a href="">Home</a>
          </NavItem>
          <NavItem menu>
            <a href="">About</a>
          </NavItem>
          <NavItem menu>
            <a href="">Services</a>
          </NavItem>
          <NavItem menu>
            <a href="">Contact Us</a>
          </NavItem>
          <NavItem menu>
            <a href="">Login</a>
          </NavItem>
        </ListContainer>
      </Menu>
    );
  }

  return (
    <>
      <ListContainer>
        <NavItem>
          <a href="">Home</a>
        </NavItem>
        <NavItem>
          <a href="">About</a>
        </NavItem>
        <NavItem>
          <a href="">Services</a>
        </NavItem>
        <NavItem>
          <a href="">Contact Us</a>
        </NavItem>
      </ListContainer>
      <LoginButtonContainer>Login</LoginButtonContainer>
    </>
  );
}
