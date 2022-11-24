import {
  FormWrapper,
  FormTitle,
  FormSubtitle,
  Form,
  InputWrapper,
  InputLogoWrapper,
  Input,
  FormButton,
  FormButtonText,
  Separator,
  FormInfo,
  FormRedirect,
} from "./style";
import { HiLockOpen } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import styled from "styled-components";

export default function SignUnForm(props) {
  return (
    <FormWrapper>
      {/* Header del Formulari*/}
      <FormTitle>Registre</FormTitle>
      <FormSubtitle>
        Al registrar-te tindràs accés als TechLab's i podras gaudir la teva
        creativitat!
      </FormSubtitle>

      {/* Formulari */}
      <Form>
        {/* Informació de l'usuari*/}
        <UserWrapper>
          <InputWrapper>
            <InputLogoWrapper>
              <AiOutlineUser size={24} color={"white"} opacity={0.9} />
            </InputLogoWrapper>
            <Input
              placeholder="Nom"
              name="name"
              type="text"
              autoComplete="given-name"
              required
            />
          </InputWrapper>

          <InputWrapper>
            <InputLogoWrapper>
              <AiOutlineUser size={24} color={"white"} opacity={0.9} />
            </InputLogoWrapper>
            <Input
              placeholder="Cognom"
              name="surname"
              type="text"
              autoComplete="family-name"
              required
            />
          </InputWrapper>
        </UserWrapper>

        {/* Email Input */}
        <InputWrapper>
          <InputLogoWrapper>
            <MdEmail size={24} color={"white"} opacity={0.9} />
          </InputLogoWrapper>
          <Input
            placeholder="Email"
            name="email"
            type="email"
            autoComplete="on"
            required
          />
        </InputWrapper>

        {/* Password Input */}
        <InputWrapper>
          <InputLogoWrapper>
            <HiLockOpen size={24} color={"white"} opacity={0.9} />
          </InputLogoWrapper>
          <Input
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="on"
            required
          />
        </InputWrapper>

        {/* Botó de submmit */}
        <FormButton type="submmit">
          <FormButtonText> Accepta </FormButtonText>
        </FormButton>

        {/* Footer del Formulari (info addicional */}
        <Separator />

        <FormInfo>
          Ja tens un compte?
          <FormRedirect onClick={props.signUpShowHandler}>
            Accedir
          </FormRedirect>
        </FormInfo>
      </Form>
    </FormWrapper>
  );
}

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  column-gap: 20px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, auto);
    row-gap: 20px;
    column-gap: 20px;
  }
`;
