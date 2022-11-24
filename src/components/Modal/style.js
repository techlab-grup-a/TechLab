import styled from "styled-components";

export const FormWrapper = styled.div`
  display: grid;
  justify-content: start;
  text-align: left;
  gap: 20px;
  max-width: 400px;
  padding-top: 20px;
  margin-bottom: 20px;
  position: relative;
`;

export const FormTitle = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  margin: 0px;
  line-height: 48px;
  color: rgb(255, 255, 255);
`;

export const FormSubtitle = styled.p`
  font-style: normal;
  font-weight: normal;
  margin: 0px;
  font-size: 15px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.7);
`;

export const Form = styled.form`
  display: grid;
  gap: 20px;
  margin-top: 0;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 44px;
`;

export const InputLogoWrapper = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
`;

export const Input = styled.input`
  height: 100%;
  width: 100%;
  
  background-image: linear-gradient(
    rgba(99, 106, 150, 0.4) 0%,
    rgba(182, 186, 214, 0.25) 100%
  );

  background-color: initial;
  border-style: none;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 20px 40px,
    rgba(255, 255, 255, 0.3) 0px 0px 0px 0.5px inset;
  box-sizing: border-box;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 42px;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 130%;
  color: rgb(255, 255, 255);

  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-delay: 0s;
  transition-property: all;
  padding-left: 56px;

  /* Important!!! Pel tema del autofill de Chrome / Safari / etc. */
  &:-webkit-autofill {
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgb(255, 255, 255);
  }
`;

export const FormButton = styled.button`
  background-image: linear-gradient(
    91.4deg,
    rgb(47, 184, 255) 0%,
    rgb(158, 236, 217) 100%
  );

  border-style: none;
  border-radius: 30px;

  position: relative;
  display: grid;
  text-align: center;
  justify-content: center;
  width: 100%;

  box-shadow: rgba(147, 231, 221, 0.3) 0px 20px 40px;
  padding-top: 12px;
  padding-right: 0px;
  padding-bottom: 12px;
  padding-left: 0px;

  cursor: pointer;
  &:hover {
    transition-duration: 0.8s;
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 20px 40px,
      rgba(0, 0, 0, 0.3) 0px 0px 0px 0.5px inset,
      rgba(0, 0, 0, 0.1) 0px 10px 40px inset;
  }
`;

export const FormButtonText = styled.p`
  margin: 0px;

  font-style: normal;
  font-size: 17px;
  color: rgb(14, 67, 92);
  font-weight: 600;


  @media (prefers-color-scheme: dark) {
    color: rgb(255, 255, 255);
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const FormInfo = styled.p`
  display: flex;
  color: rgba(255, 255, 255, 0.7);
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 130%;
  margin: 0px;
`;

export const FormRedirect = styled.span`
  color: rgb(47, 184, 255);
  font-weight: bold;
  margin: 0px 0px 0px 10px;
  cursor: pointer;
`;
