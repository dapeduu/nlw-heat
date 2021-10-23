import styles from './App.module.scss'
import { MessageList } from './components/MessageList'
import { LoginBox } from './components/LoginBox'
import { SendMessageForm } from './components/SendMessageForm'
import { AuthContext } from './contexts/auth'
import { useContext } from 'react'
export function App() {
  const { user } = useContext(AuthContext)

  return (
    <main className={styles.container}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}
