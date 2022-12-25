import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import companylogo from "../../images/companylogo.png";

const LogoContainter = styled.div`
  ${tw`
        flex
        items-center

    `};
`;

const LogoText = styled.div`
  ${tw`
    sm:text-xl
    md:text-2xl
    font-bold
    text-black
    m-1
`};
`;

const Image = styled.div`
  img {
    width: auto;
    height: 100%;
  }
  width: auto;
  ${tw`
    h-7
    md:h-9
    `};
`;

export function Logo() {
  return (
    <LogoContainter>
      <Image>
        <img src={companylogo} alt="companyLogo" />
      </Image>
      <LogoText>The Company.</LogoText>
    </LogoContainter>
  );
}
