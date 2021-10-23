import styles from './styles.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'
import { api } from '../../services/api'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth'

export function LoginBox() {
  const { signInUrl } = useContext(AuthContext)

  return (
    <aside className={styles.container}>
      <h2>Entre e compartilhe sua mensagem</h2>
      <a href={signInUrl}>
        <VscGithubInverted size="24" /> Entrar com Github
      </a>
    </aside>
  )
}
