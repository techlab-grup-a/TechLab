import { useState } from "react";
import styled from "styled-components";
// import Logo from "../assets/logo.svg";
import Logo from "../assets/techLab-logo.jpg";

import Stars from "../assets/stars.svg";
import NavItem from "../components/Header/NavItem";
import NavMenuItem from "../components/Header/NavMenuItem";

import { FiMenu } from "react-icons/fi";
import { BsBookmarks } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

export default function Header(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const buttonMenuHandler = () => {
    setOpenMenu((openMenu) => (openMenu = !openMenu));
  };

  return (
    <>
      <HeaderStars />
      <HeaderWrapper>
        <HeaderLogo src={Logo} />

        { /* Navegador */ }
        <NavBar>
          <NavItem
            withRoute={true}
            href="reserves"
            text="Reserves"
            icon={<BsBookmarks size={24} color={"white"} opacity={0.6} />}
          />
          <NavItem
            withRoute={false}
            href="#"
            text="Perfil"
            icon={<FaUserCircle size={24} color={"white"} opacity={0.6} />}
            handler={props.modalHandler}
          />
        </NavBar>

        { /* Mòbil */ }
        <HeaderWrapperMobile>
          <Wrapper>
              <ButtonWrapper>
                  <FiMenu size={24} color={"white"} opacity={0.6} style={{top: "10px", position: "relative"}}
                    onClick={buttonMenuHandler}
                  />
              </ButtonWrapper>
              { openMenu && <MenuWrapper>
                  <NavMenuItem 
                    withRoute={true}
                    href="reserves"
                    text="Reserves"
                    icon={<BsBookmarks size={24} color={"white"} opacity={0.6} />}
                  />
                  <Separator />
                  <NavMenuItem
                    withRoute={false}
                    text="Perfil"
                    icon={<FaUserCircle size={24} color={"white"} opacity={0.6} />}
                    handler={props.modalHandler}
                  />
                </MenuWrapper>
              }
          </Wrapper>

        </HeaderWrapperMobile>

      </HeaderWrapper>
    </>
  );
}

const HeaderLogo = styled.img`
  border-radius: 50%;
  
  &:hover {
    transform: scale(1.15);
    transition-timing-function: ease-in-out;
    transition: 0.2s;
  }
`;

const HeaderWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  max-width: 1234px;
  height: 44px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  padding: 60px;
  z-index: 3;
`;

const HeaderWrapperMobile = styled.div`
  display: none;
  @media (max-width: 550px) {
    display: grid;
  }
`

const NavBar = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 26px;

  @media (max-width: 550px) {
    display: none;
  }
`;

const HeaderStars = styled.div`
  position: absolute;
  width: 100%;
  background-position: center top;
  background-repeat: repeat;
  background-image: url(${Stars});
  height: 224px;
  top: 10px;

  @media (prefers-color-scheme: light) {
    display: none;
  }
`;



const Wrapper = styled.div`
    perspective: 1000px;
`

const ButtonWrapper = styled.div`
    position: relative;
    display: grid;
    justify-content: center;
    width: 44px;
    height: 44px;
    right: 0px;
    border-radius: 50%;
    background: rgba(15, 14, 71, 0.3);
    box-shadow: rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset;
    backdrop-filter: blur(40px);
    cursor: pointer;
`

const MenuWrapper = styled.div`
    position: absolute;
    max-width: 260px;
    margin-top: 10px;
    padding: 20px;
    right: 0px;
    background: rgba(15, 14, 71, 0.3);
    box-shadow: rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset;
    backdrop-filter: blur(40px) brightness(80%) saturate(150%);
    border-radius: 20px;
    visibility: visible;
    opacity: 1;
    transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
    transform-origin: center top;
    transform: rotateX(0deg) translateY(0px);

    @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
        transform: skewY(0deg) rotate(0deg) translateY(0px);
    }
`

const Separator = styled.div`
    width: 180px;
    height: 1px;
    background: rgb(255, 255, 255);
    opacity: 0.2;
`

