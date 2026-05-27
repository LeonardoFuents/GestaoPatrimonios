import React from "react";
import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
    return (
        <header className={styles.topbar}>
            <nav className={`${styles.navbar} layout_guide`} aria-label="Menu principal">
                
                <Link href="#" className={styles.logo_link} aria-label="Página inicial">
                    <img src="/imgs/Logo Senai.png" alt="Logo SENAI" className={styles.logo} />
                </Link>

                <ul className={styles.menu_list}>
                    <li>
                        <a href="#" className={styles.menu_link}>
                            Ambientes <i className="fa-solid fa-chevron-down"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={styles.menu_link}>Patrimônios</a>
                    </li>
                </ul>

                <section className={styles.user_area} aria-label="Informações do usuário">
                    <button className={styles.user_icon} aria-label="Abrir perfil do usuário">
                        <i className="fa-solid fa-user"></i>
                    </button>

                    <div className={styles.user_info}>
                        <strong>Késsia Milena</strong>
                        <span>kessia@sp.senai.br</span>
                    </div>

                    <button className={styles.arrow_button} aria-label="Abrir opções da conta">
                        <i className="fa-solid fa-chevron-down"></i>
                    </button>
                </section>

                <button className={styles.hamburguer} aria-label="Abrir opções de menu">
                    <i className="fa-solid fa-bars"></i>
                </button>
                
            </nav>
        </header>
    );
};

export default Header;