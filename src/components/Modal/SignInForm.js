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

export default function SignInForm(props) {
  return (
    <FormWrapper>
      {/* Header del Formulari*/}
      <FormTitle>Accés</FormTitle>
      <FormSubtitle>
        Accedint al teu compte podràs gestionar les teves reserves!
      </FormSubtitle>

      {/* Formulari */}
      <Form>
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
          <FormButtonText> Accedir </FormButtonText>
        </FormButton>

        {/* Footer del Formulari (info addicional */}
        <Separator />

        <FormInfo>
          No tens cap compte?
          <FormRedirect onClick={props.signUpShowHandler}>
            Registra't
          </FormRedirect>
        </FormInfo>

        <FormInfo>
          Has oblidat la contrasenya?
          <FormRedirect
            onClick={() => {
              console.log("Restableix contra");
            }}
          >
            Restableix-la
          </FormRedirect>
        </FormInfo>
      </Form>
    </FormWrapper>
  );
}
