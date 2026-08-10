import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { login, register } from "../../store/authSlice";
import { closeAuthModal } from "../../store/uiSlice";
import { Modal } from "../Modal/Modal";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import styles from "./AuthModal.module.scss";
import { Logo } from "../Logo/Logo";

type Mode = "login" | "register" | "registerSuccess";

export function AuthModal() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.ui.isAuthModalOpen);
  const error = useSelector((state: RootState) => state.auth.error);

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    dispatch(closeAuthModal())
    setMode("login")
    setSubmitted(false)
  }

  const handleLogin = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    if (!email || !password) return

    dispatch(login({ email, password })).then((result) => {
      if (login.fulfilled.match(result)) {
        handleClose()
      }
    })
  }

  const handleRegister = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    if (!email || !password || !confirmPassword || !name || !surname) return
    if (password !== confirmPassword) return

    dispatch(register({ email, password, name, surname })).then((result) => {
      if (register.fulfilled.match(result)) {
        setMode("registerSuccess")
      }
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {mode === "login" && (
        <form className={styles.form} onSubmit={handleLogin}>
          <Logo className={styles.logo} textColor="black" />
          <Input className={styles.input}
            placeholder="Электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hasError={submitted && !email}
          />
          <Input className={styles.input}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={submitted && !password}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" variant="primary">Войти</Button>
          <button type="button" className={styles.link} onClick={() => setMode("register")}>
            Регистрация
          </button>
        </form>
      )}

      {mode === "register" && (
        <form className={styles.form} onSubmit={handleRegister}>
          <Logo className={styles.logo} textColor="black" />
          <h2>Регистрация</h2>
          <Input className={styles.input}
            placeholder="Электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hasError={submitted && !email}
          />
          <Input className={styles.input}
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            hasError={submitted && !name}
          />
          <Input className={styles.input}
            placeholder="Фамилия"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            hasError={submitted && !surname}
          />
          <Input className={styles.input}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={submitted && !password}
          />
          <Input className={styles.input}
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            hasError={submitted && (!confirmPassword || confirmPassword !== password)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" variant="primary">Создать аккаунт</Button>
          <button type="button" className={styles.link} onClick={() => setMode("login")}>
            У меня есть пароль
          </button>
        </form>
      )}

      {mode === "registerSuccess" && (
        <div className={styles.form}>
          <h2>Регистрация завершена</h2>
          <p>Используйте вашу электронную почту для входа</p>
          <Button variant="primary" onClick={() => setMode("login")}>Войти</Button>
        </div>
      )}
    </Modal>
  )
}