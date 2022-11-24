import styled from "styled-components";

export default function NavItem(props) {
  if (!props.withRoute) {
    return (
      <Button onClick={props.handler}>
        {props.icon}
        <ButtonText>{props.text}</ButtonText>
      </Button>
    );
  } else {
    return (
      <NavLink href={props.href}>
        <Button onClick={props.handler}>
          {props.icon}
          <ButtonText>{props.text}</ButtonText>
        </Button>
      </NavLink>
    );
  }
}

const NavLink = styled.a`
  text-decoration: none;
  background-color: transparent;
`;

const Button = styled.button`
  display: flex;
  align-items: flex-start;
  background-color: transparent;
  border: none;
  border-radius: 14px;

  height: 44px;
  padding: 10px 20px;
  text-align: center;

  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: rgba(31, 47, 71, 0.25) 0px 20px 40px,
      rgba(0, 0, 0, 0.1) 0px 1px 5px,
      rgba(255, 255, 255, 0.4) 0px 0px 0px 0.5px inset;
    background-blend-mode: overlay;
  }

  &:hover p {
    transform: translateY(-1px);
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    transition-property: all;
    background-blend-mode: overlay;
  }
`;

const ButtonText = styled.p`
  color: rgb(255, 255, 255);
  align-items: center;
  text-align: center;
  margin: auto;
  font-weight: 500;
  font-size: 15px;
  margin-left: 10px;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.7);
  }
`;
