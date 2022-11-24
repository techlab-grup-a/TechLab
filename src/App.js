import styled from "styled-components";
import Header from "./layout/Header";
import Background from "./layout/Background";
import Banner from "./layout/Banner";
import Modal from "./layout/Modal";
import { useState } from "react";

export default function App() {
  const [openModal, setOpenModal] = useState(false);
  const buttonModalHandler = () => {
    setOpenModal((openModal) => (openModal = !openModal));
  };

  return (
    <AppOutline>
      <Header modalHandler={buttonModalHandler} />
      <Background />
      <Banner />
      {openModal && <Modal modalHandler={buttonModalHandler} />}
    </AppOutline>
  );
}

const AppOutline = styled.div`
  body {
    background-color: rgb(242, 246, 255);

    @media (prefers-color-scheme: dark) {
      background-color: rgb(31, 31, 71);
    }
  }
`;
