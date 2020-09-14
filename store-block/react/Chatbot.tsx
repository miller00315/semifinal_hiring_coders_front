import React, { useState } from 'react';
import * as S from './styled';
import {FiSend} from 'react-icons/fi'
//import api from '../api'

interface ChatbotProps { }

const Chatbot: StorefrontFunctionComponent<ChatbotProps> = ({ }) => {

    const [chatOpen, setChatOpen] = useState(false);
    const [dialogo, setDialogo] = useState([
        {
            text: 'Olá, bem vindo ao chatbot!',
            user: 'assistente',
        },
        {
            text: 'Gostaria de comprar um notebook.',
            user: 'cliente',
        }
    ]);

    const[formData,setFormData] = useState({
        text: '',
        user: 'cliente',
    })
    
    function chat(e : React.MouseEvent){
        e.preventDefault();
        setChatOpen(!chatOpen)
        chatOpen ? document.getElementById('chatbot')!.classList.add("newClass") : document.getElementById('chatbot')!.classList.remove("newClass");
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value}= e.target;
        setFormData({...formData, [name]:value});
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        
        const data = formData
        console.log(data);

        if(data.text === ''){
            return;
        }

        const change = [
            ...dialogo,    
            data
        ]

        //const resp = dialogo // await api.post('api/botStore/userQuestion', data)
        setDialogo(change)

        //document.getElementById('input-text')!.
    }

    return(
        <>
        <S.btn_open_chat id='button-open-chat' onClick={chat}>
            <img src="https://icon-library.net//images/bot-icon/bot-icon-7.jpg" className='botzinho' alt="Chatbot" />
        </S.btn_open_chat>

        <S.chatbot id='chatbot' >
            <S.chat_header> Chatbot </S.chat_header>

            <S.chat_dialogo>
                {dialogo.map((item, index)=>(
                    <>
                        <S.dialogo_text key={`${index}`} >{item.text}</S.dialogo_text>
                        <small>{item.user}</small>
                    </>
                ))} 
            </S.chat_dialogo>

            <S.chat_input >
                <S.formulario onSubmit={handleSubmit} className='formulario'>
                    <input type="text" name="text" id="input-text" onChange={handleInputChange} />
                    <button type="submit"><FiSend className='icon'/></button>
                </S.formulario>
            </S.chat_input>
        </S.chatbot> 
        </>
    )
}

Chatbot.schema = {
    title: 'editor.chatbot.title',
    description: 'editor.chatbot.description',
    type: 'object',
    properties: {},
}

export default Chatbot