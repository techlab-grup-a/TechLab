
import Selector from '../components/Reserva/Selector';

import React, {useState} from 'react'
import styled, {keyframes}from 'styled-components'
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import depositData from './DepositData.json'
import userEvent from '@testing-library/user-event';


export default function Dashboard(){
    return (
        <MainContainer>
            <Deposits title="Màquines Actives" count={depositData.active.length} data={depositData.active} />
        </MainContainer>

    )
}

function Deposits ({ title, data, count }) {

    return (
        <Container> 
            <Title>{title}<DepositsCount>{count}</DepositsCount></Title>
            <SortingBar />
            {data.map(deposit => (
                <Deposit data={deposit} key={deposit.machine.name} />
            ))}

        </Container>
    )
}


function SortingBar (){
    return (
        <ContainerBar>
            <NomBar>Màquina</NomBar>
            <StatusBar>Estat</StatusBar>
        </ContainerBar>
    )
}


function Deposit({ data }){
    const { machine,status } = data;

    const [modalIsOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [range, setRange] = useState([]);

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }


    const caselles = [
        {
            id: 0,
            disp: true,
            title: '9:00 - 10:00'
        },
        {
            id: 1,
            disp: true,
            title: '10:00 - 11:00'
        },
        {
            id: 2,
            disp: false,
            title: '11:00 - 12:00'
        },
        {
            id: 3,
            disp: true,
            title: '12:00 - 13:00'
        },
        {
            id: 4,
            disp: true,
            title: '13:00 - 14:00'
        },
        {
            id: 5,
            disp: true,
            title: '14:00 - 15:00'
        },
        {
            id: 6,
            disp: true,
            title: '15:00 - 16:00'
        },
        {
            id: 7,
            disp: true,
            title: '16:00 - 17:00'
        },
        {
            id: 8,
            disp: true,
            title: '17:00 - 18:00'
        },
        {
            id: 9,
            disp: true,
            title: '18:00 - 19:00'
        },
        {
            id: 10,
            disp: false,
            title: '19:00 - 20:00'
        },
        {
            id: 11,
            disp: false,
            title: '20:00 - 21:00'
        }
      ]

      const Item = props => {
        const {title} = props
        return (
            <Casella disp={props.disp}>
                <h3>{title}</h3>
            </Casella>
        )
      }

    return (
        <ContainerA >
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <ModalWrapper>
                        <ModalContent>
                            <div class="modal-header">                           
                                <h2>Horari de reserva - {machine.name}</h2>
                            </div>
                            <div class="modal-datepicker">
                                    <h3>HORARI DE RESERVA: </h3>
                                        <div>  
                                            <DatePicker
                                            wrapperClassName="DatePicker"
                                            selected={startDate}
                                            onChange={(date) => {
                                                console.log(date);
                                                setStartDate(date);
                                            }}
                                            dateFormat="MMMM d, yyyy"
                                        />
                                        </div>
                                </div>
                            <div class="modal-grid">
                                <div>
                                    <Graella>
                                        { caselles.length > 0 ? caselles.map(item => <Item disp = {item.disp} id={item.id} title={item.title}/>) : [<p>No hi ha horaris.</p>] }
                                    </Graella>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <Button onClick={closeModal}>Tancar</Button>
                            </div>
                        </ModalContent>
                    </ModalWrapper>
                </Modal>
            <Machine>
                <MachineImg src={require(`./images/${machine.imageUrl}`)} />
                <CompleteName onClick={openModal}>{machine.name}</CompleteName>
            </Machine>
            <Status>
                <Text>{status.message}</Text>
                {(() => {
                    switch (status.level) {
                        case 1: return <StatusIndicator color="#F17E7E" />;
                        case 2: return <StatusIndicator color="#FFD056" />;
                        case 3: return <StatusIndicator color="#75C282" />;
                        default: return <StatusIndicator color="#AAA5A5" />;
                    }
                })()}
            </Status>
        </ContainerA>
    )
}





const ContainerBar = styled.div`
    display: flex;
    padding: 0.4rem 1rem;
    background-color: ${({ theme }) => theme.secondary};
    margin: 2rem 0;
    border-radius: 5px;
`

const TextBar = styled.h1`
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
`

const NomBar = styled(TextBar)`
    width: 30%;
`

const StatusBar = styled(TextBar)`
    width 10%;
`


const Graella = styled.div`
  display: grid;
  height: 400px;
  width: 400px;
  grid-template-rows: 0.3fr 0.3fr 0.3fr 0.3fr;
  grid-template-columns: 0.5fr 0.5fr 0.5fr;
  grid-template-areas:
  text-align: center;
  grid-gap: 0.25rem;
`
const Casella = styled.button`
    text-align: center;
    padding:10px;
    border-radius: 15px;
    cursor: ${(props)=>props.disp === true ? 'pointer' : 'arrow'};
    background-color: ${(props)=>props.disp === true ? 'yellowgreen' : 'red'}
`

const ContainerA = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(190,190,190,0.22);
    cursor: pointer;
    background-color: ${({ theme }) => theme.primary};
    transition: all ease-in-out 300ms;

    &:hover {
        /* box-shadow: 0px 10px 8px -8px rgba(138, 153, 192, 0.6); */
        background-color: ${({ theme }) => theme.secondary};
    }

`

const Text = styled.h1`
    font-size: 0.8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
    margin: 0;
`

const Machine = styled.div`
    width: 30%;
    display: flex;
    align-items: center;
`

const MachineImg = styled.img`
    height: 35px;
    width: 35px;
`
const CompleteName = styled(Text)`
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
`

const Status = styled.div`
    display: flex;
    align-items: center;
        background-color: ${props => props.color};
`
const StatusIndicator = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 10px;
    background-color: ${props => props.color};
    margin-left: 1rem;
    position: absolute;
    right: 7rem;
`

const Button = styled.a`
    text-transform: uppercase;
    width: 9rem;
    font-size: 0.6rem;
    font-weight: 700;
    background-color: Red;
    color: #FFF;
    border-radius: 5rem;
    padding: 0.7rem;
    display: flex;
    justify-content: center;
    cursor: pointer;
    transition: all ease-in-out 300ms;

    &:hover {
        box-shadow: 0px 0px 7px rgba(128,74,216,0.6);
    }

`

const wrapperAnim = keyframes`
    /* ----------------------------------------------
    * Generated by Animista on 2022-11-18 19:44:13
    * Licensed under FreeBSD License.
    * See http://animista.net/license for more info. 
    * w: http://animista.net, t: @cssanimista
    * ---------------------------------------------- */
    0% { 
    -webkit-backdrop-filter: blur(0px) saturate(100%); 
    }
    100% { 
    -webkit-backdrop-filter: blur(20px) saturate(100%); 
    }
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 3;
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding: 20px 0px;

  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  background-color: rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: blur(20px) saturate(100%);
  backdrop-filter: blur(20px) saturate(100%);

  animation-delay: 0s;
  animation-duration: 2s;
  animation-name: ${wrapperAnim};
`;
const cardAnim = keyframes`
    0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
    }
    100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    }
`;
const ModalContent = styled.div`
  display: grid;
  position: relative;
  justify-items: center;
  z-index: 3;
  grid-template-columns: auto;
  gap: 20px;

  margin: 30px;
  max-width: 960px;
  width: 100%;
  border-radius: 20px;
  padding: 20px;

  background-color: rgba(50, 61, 109,0.5);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 50px 100px,
    rgba(255, 255, 255, 0.3) 0px 0px 0px 0.5px inset;
  animation-duration: 1s;
  animation-delay: 0s;
  animation-name: ${cardAnim};

  @media (max-width: 900px) {
    grid-template-columns: auto;
    gap: 20px;
  }
`;


const Container = styled.div`

`

const Title = styled.h1`
    font-weight: 500;
    color:  ${({ theme }) => theme.textColor};
    font-size: 1.3rem;
    display: flex;
    align-items: center;
`

const DepositsCount = styled.div`
    margin-left: 1rem;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.header};
    color: ${({ theme }) => theme.headerNumber};
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
`

const MainContainer = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem;
`







// import React, { useState } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';



const [click, setClick] = useState(false);
onClick(setClick(true))

// export default function Reserves() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     console.log(e);
setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//       <Carousel.Item>
//         <img
//           className="center d-block w-50"
//           src={require("../assets/universitats/eetac.jpg")}
//           // src="../assets/universitats/eetac.jpg"
//           alt="First slide"
//         />
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-50"
//           src={require("../assets/universitats/eetac.jpg")}
//           alt="Second slide"
//         />

//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-50"
//           src={require("../assets/universitats/eetac.jpg")}
//           alt="Third slide"
//         />

//         <Carousel.Caption>
//           <h3>Third slide label</h3>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }



// % Reserva
//     1. Filtrar per uni (Dropdown) [80%]
//     2. Fetch de les maquines [0%]
//     3. Modal horari (Boto ...) [70%] -> 200/ Navigate(/maquines) 
//     4. Reserva feta


/* user
tecnic -> admin 
admin  -> admin


Un admin nomes canviii dades d'un user o activar maquines o parar-les

Administració
Reserva
Gestionar la reserva (pin, activar la mquina) */