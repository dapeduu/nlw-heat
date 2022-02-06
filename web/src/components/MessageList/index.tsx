import styles from './styles.module.scss'
import logo from '../../assets/logo.svg'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

interface Message {
  id: string
  text: string
  user: {
    id: string
    login: string
    name: string
    avatar_url: string
  }
}

const socket = io('http://localhost:3001')
let messagesQueue: Message[] = []

socket.on('new_message', (newMessage) => messagesQueue.push(newMessage))

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])

  async function fetchMessages(numberOfMessages: number) {
    try {
      const { data: messages } = await api.get<Message[]>('/messages/last', {
        params: { numberOfMessages },
      })
      setMessages(messages)
    } catch (error) {
      console.log('Erro:', error)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((oldMessages) =>
          [
            messagesQueue.shift() as Message,
            oldMessages[0],
            oldMessages[1],
          ].filter(Boolean)
        )
      }
    }, 3000)

    return () => {
      timer
    }
  }, [])

  useEffect(() => {
    console.log(messages)
  }, [messages])

  useEffect(() => {
    fetchMessages(3)

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo do DoWhile" />
      <ul className={styles.messagesList}>
        {messages.map((message) => (
          <li key={message.id} className={styles.messageContainer}>
            <p className={styles.message}>{message.text}</p>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span className={styles.userName}>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
