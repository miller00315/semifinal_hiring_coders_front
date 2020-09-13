import React, { useMemo, useState, useEffect } from 'react';
import './Chatbot.css';
import { FiSend } from 'react-icons/fi';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { v4 as uuidV4 } from 'uuid';

const CHAT = gql`
  query CHAT(
    $userId: String!
    $userName: String!
    $content: String!
    $id: String!
  ) {
    chat(
      options: {
        user: { id: $userId, name: $userName }
        content: $content
        id: $id
      }
    ) {
      items {
        id
        content
        user {
          id
          name
        }
      }
      totalItems
    }
  }
`;

const initialCode = uuidV4();

const Chatbot = () => {
  const initial = {
    user: { id: 'ghhgjg', name: 'Miller César' },
    content: 'initial',
  };

  const { data, error, fetchMore } = useQuery(CHAT, {
    variables: {
      userId: initial.user.id,
      userName: initial.user.name,
      content: initial.content,
      id: initialCode,
    },
    skip: !initial,
    fetchPolicy: 'cache-first',
  });

  const initialValues = useMemo(
    () => ({
      messages: data?.chat.items ?? [],
      totalItems: data?.chat.totalItems ?? 0,
    }),
    [data]
  );

  const [values, setValues] = useState(initialValues);

  useEffect(() => setValues(initialValues), [initialValues]);

  const [chatOpen, setChatOpen] = useState(false);

  const [formData, setFormData] = useState({
    question: '',
    user: initial.user,
  });

  function sayHello(e) {
    e.preventDefault();
    setChatOpen(!chatOpen);
    chatOpen
      ? document.getElementById('chatbot').classList.add('newClass')
      : document.getElementById('chatbot').classList.remove('newClass');
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const message = {
      id: uuidV4(),
      content: formData.question,
      user: initial.user,
    };

    const messages = values.messages;

    messages.push(message);

    setFormData({
      question: '',
    });

    setValues({
      messages,
    });

    fetchMore({
      variables: {
        userId: message.user.id,
        userName: message.user.name,
        content: message.id,
        messageId: message.content,
      },
      updateQuery: (result, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          setValues({
            messages: values.messages.concat(result.chat.items),
          });
        } else {
          setValues({
            messages: values.messages.concat(fetchMoreResult.chat.items),
          });
        }
      },
    });
  }

  return (
    <>
      <button
        id="button-open-chat"
        className="button-open-chat"
        onClick={sayHello}
      >
        <img
          src="https://icon-library.net//images/bot-icon/bot-icon-7.jpg"
          width="90"
          alt="Imagem do chat"
        />
      </button>

      <div id="chatbot" className="chatbot">
        <div className="chat-header"> Chatbot </div>

        <div className="chat-dialogo">
          {values.messages.map((item) => (
            <div key={item.id}>
              <p key={item.id} className="dialogo-text">
                {item.content}
              </p>
              <small className="dialogo-user">{item.user.name}</small>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <form onSubmit={handleSubmit} className="formulario">
            <input
              type="text"
              name="question"
              className="form-control"
              id="chatInput"
              onChange={handleInputChange}
              value={formData.question}
            />
            <button type="submit" className="btn btn-primary">
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
