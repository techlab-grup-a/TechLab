import styled from "styled-components";

export default function NavMenuItem(props) {
  if (!props.withRoute) {
    return (
    <MenuItemWrapper onClick={props.handler}>
        <MenuItem>
          {props.icon}
          <MenuItemText>{props.text}</MenuItemText>
        </MenuItem>
    </MenuItemWrapper>
    )
  } else {
    return (
      <NavLink href={props.href}>
        <MenuItemWrapper>
          <MenuItem>
            {props.icon}
            <MenuItemText>{props.text}</MenuItemText>
          </MenuItem>
        </MenuItemWrapper>
      </NavLink>
    );
  }
}

const NavLink = styled.a`
  text-decoration: none;
`;

const MenuItemWrapper = styled.div`
  height: 24px;
  transition: all 0.3s ease-in-out 0s;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const MenuItem = styled.div`
  display: inline-flex;
`;

const MenuItemText = styled.p`
  font-style: normal;
  font-size: 15px;
  font-weight: normal;
  line-height: 130%;
  color: rgb(255, 255, 255, 0.7);
  text-align: center;
  margin: auto auto auto 10px;
`;
