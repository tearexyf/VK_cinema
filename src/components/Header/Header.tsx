import { Link, NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Input } from "../Input/Input";
import { useDispatch } from "react-redux";
import { openAuthModal } from "../../store/uiSlice";
import type { AppDispatch } from "../../store/store";
import { SearchModal } from "../SearchModal/SearchModal";
import { useState } from "react";
import  styles from "./Header.module.scss";

export function Header() {
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  return (
    <header className={styles.header}>
      
        <Logo/>
      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>Главная</NavLink>
        <NavLink to="/genres" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>Жанры</NavLink>
      </nav>

      <Input backgroundColor="black" className={styles.searchWrapper} placeholder="Поиск" onClick={() => setIsSearchOpen(true)} readOnly />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <div className={styles.rightSection}>
        {user ? (
          <Link to="/account" className={styles.userName}>{user.name}</Link>
        ) : (
          <button className={styles.loginButton} onClick={() => dispatch(openAuthModal())}>Войти</button>
        )}
      </div>
    </header>
  )
}
