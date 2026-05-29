import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./header.module.css";
import { getUsuarioLogado, logout } from "@/pages/api/authService";

const Header = () => {
    const router = useRouter();
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {

        const usuario = getUsuarioLogado();
        setNome(usuario.nome);
        setEmail(usuario.email);
    }, []);

    function handleLogout() {
        logout();
        router.push("/login");
    }

    return (
        <header className={styles.topbar}>
            <nav className={`${styles.navbar} ${styles.layout_guide}`} aria-label="Menu principal">

                <Link href="/listaAmbientes" className={styles.logo_link} aria-label="Página inicial">
                    <img src="/imgs/Logo Senai.png" alt="Logo SENAI" className={styles.logo} />
                </Link>

                <ul className={styles.menu_list}>
                    <li>
                        <Link href="/listaAmbientes" className={styles.menu_link}>
                            Ambientes
                        </Link>
                    </li>
                    <li>
                        <Link href="/listaAprovacoes" className={styles.menu_link}>
                            Aprovações
                        </Link>
                    </li>
                    <li>
                        <Link href="/todosPatrimonios" className={styles.menu_link}>
                            Patrimônios
                        </Link>
                    </li>
                </ul>

                <section className={styles.user_area} aria-label="Informações do usuário">
                    <button className={styles.user_icon} aria-label="Abrir perfil do usuário">
                        <i className="fa-solid fa-user"></i>
                    </button>

                    <div className={styles.user_info}>
                        <strong title={nome}>{nome || "Usuário"}</strong>
                        <span title={email}>{email || "—"}</span>
                    </div>

                    <button
                        className={styles.arrow_button}
                        aria-label="Sair do sistema"
                        title="Sair"
                        onClick={handleLogout}
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
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