import React, { useState } from 'react';
import './Chatbot.css'
import {FiSend} from 'react-icons/fi'
//import dialogo from './../../dialogo.json'
import api from '../../api'


const Chatbot = () =>{

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
        question: '',
        user: 'cliente',
    })
    
    function sayHello(e){
        e.preventDefault();
        setChatOpen(!chatOpen)
        chatOpen ? document.getElementById('chatbot').classList.add("newClass") : document.getElementById('chatbot').classList.remove("newClass");
    }

    function handleInputChange(e){
        const {name, value}= e.target;
        setFormData({...formData, [name]:value});
    }

    async function handleSubmit(e){
        e.preventDefault();

        const {name, value} = e.target;

        
        const data = [{[name]:value}]
        console.log(data);
        const resp = await api.post('api/botStore/userQuestion', data)

        setDialogo(resp)
    }

    return(
        <>
        <button id='button-open-chat' className='button-open-chat' onClick={sayHello}>
            <img src="https://icon-library.net//images/bot-icon/bot-icon-7.jpg" width="90" />
        </button>

        <div id='chatbot' className='chatbot' >
            <div className='chat-header'> Chatbot </div>

            <div className='chat-dialogo'>
                {dialogo.map(item=>(
                    <>
                        <p key={item.id} className='dialogo-text' >{item.text}</p>
                        <small className='dialogo-user'>{item.user}</small>
                    </>
                ))} 
            </div>

            <div className='chat-input' >
                <form onSubmit={handleSubmit} className='formulario'>
                    <input type="text" name="question" class="form-control" id="" onChange={handleInputChange} />
                    <button type="submit" class="btn btn-primary"><FiSend/></button>
                </form>
            </div>
        </div> 
        </>
    )
}

export default Chatbot;