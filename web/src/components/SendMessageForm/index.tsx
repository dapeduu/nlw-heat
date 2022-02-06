import styles from './styles.module.scss'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { VscSignOut, VscGithubInverted } from 'react-icons/vsc'
import { api } from '../../services/api'

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext)
  const [message, setMessage] = useState<string>('')

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault()

    if (!message.trim()) {
      return
    }

    await api.post('/messages', { message })

    setMessage('')
    // TODO: Error handling + Alerts
  }

  return (
    <aside className={styles.container}>
      <header className={styles.userInfo}>
        <button onClick={signOut} className={styles.signOutButton}>
          <VscSignOut size="24" />
        </button>

        <div className={styles.avatar}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <h2 className={styles.userName}>{user?.name}</h2>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>
      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual a sua expectativa para o evento"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Enviar mensagem</button>
      </form>
    </aside>
  )
}
