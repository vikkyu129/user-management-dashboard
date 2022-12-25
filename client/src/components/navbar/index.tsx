import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Logo } from "../logo";
import { NavItems } from "./navitems";

const NavbarContainer = styled.div`
  min-height: 68px;
  ${tw`
        w-full
        max-w-screen-2xl
        flex
        flex-row
        items-center
        md:pl-12
        md:pr-12
        justify-between

    `};
`;

const LogoContainter = styled.div``;

export function Navabar() {
  return (
    <NavbarContainer>
      <LogoContainter>
        <Logo />
      </LogoContainter>
      <NavItems />
    </NavbarContainer>
  );
}
