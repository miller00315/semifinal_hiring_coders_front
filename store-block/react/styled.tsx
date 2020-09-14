  
import styled from 'styled-components';

export const btn_open_chat = styled.button`
    position: fixed;
    right: 0px;
    bottom: 0px;

    border-radius: 100%;
    width: 60px;
    height: 60px;
    margin: 40px;
    background-color: white;
    border: 3px solid #3B66B0;

    -webkit-box-shadow: 6px 8px 5px 2px rgba(0,0,0,0.41);
    -moz-box-shadow: 6px 8px 5px 2px rgba(0,0,0,0.41);
    box-shadow: 6px 8px 5px 2px rgba(0,0,0,0.41);
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    .botzinho{
        min-width: 200%;
    }

    &:focus{
        outline-style: none;
    }
`;

export const chatbot = styled.div`
    display: none;
    position: fixed;
    /* top: -266px; */
    /* top: 0px; */
    right: 25px;
    
    width: 270px;
    height: 300px;
    background: white;
    border-radius: 10px;
    overflow: hidden;

    border: 1px solid #E7E0F5;

    &.newClass{
        display: initial;
    }

    /* RESET */
    html, body{
        width: 100vw;
        height: 100vh;
    }

    *{
        padding: 0;
        box-sizing: border-box;
        margin: 0;
        vertical-align: top;
    }

    p{
        margin: 0;
    }
`;

export const chat_header = styled.div`
    padding: 3px;
    height: 30px;
    text-align: center;
    font-weight: bold;
    background: #17a2b8;
`;

export const chat_dialogo = styled.div`
    padding: 3px 10px;

    /* display: flex;
    flex-direction: column;
    justify-content: flex-end; */

    overflow: auto;
    max-height: 70%;
    min-height: 70%;

    /* &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
    } */

`;

export const dialogo_text = styled.p`
    background: #E7E0F5;
    border-radius: 6px;
    padding: 3px; 
`;

export const chat_input = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 60px;
    padding: 10px;
    background: #17a2b8;
`;

export const formulario = styled.form`
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;


    input{
        margin-right: 3px;
        border: 1px solid gray;
        border-radius: 3px;
        width: 80%;
        height: 30px;
    }

    button{
        background: black;
        padding: 5px;
        border-radius: 10%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;

        .icon{
            color: white;
        }

        &:focus{
            outline-style: none;
        }
    }
`;