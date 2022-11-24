import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Stars from "../assets/stars.svg";
import NavItem from "../components/Header/NavItem";

// import {MdHistory} from "react-icons/md";
import { BsBookmarks } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

export default function Header(props) {
  return (
    <>
      <HeaderStars />
      <HeaderWrapper>
        <HeaderLogo src={Logo} />
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
          {/* <Link href='/1'>More</Link>
        <Link href='/1'>Search</Link> */}
        </NavBar>
      </HeaderWrapper>
    </>
  );
}

const HeaderLogo = styled.img`
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

const NavBar = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 26px;
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
