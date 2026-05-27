import React from "react";
import Head from "next/head";
import Header from "@/components/header/header";
import styles from "./listaLocais.module.css";

const ListaLocais = () => {
    return (
        <>
            <Head>
                <title>Locais - Gestão de Patrimônios</title>
            </Head>

            <Header />

            <main className={styles.page_content}>
                
                {/* Cabeçalho da página com o alinhamento corrigido */}
                <section className={styles.page_header} aria-labelledby="titulo-locais">
                    <h1 id="titulo-locais">Locais</h1>

                    <form className={styles.search_area} role="search">
                        <label htmlFor="pesquisa-ambiente" className={styles.sr_only}>Pesquisar ambiente</label>
                        <input 
                            type="search" 
                            id="pesquisa-ambiente" 
                            name="pesquisaAmbiente" 
                            placeholder="Pesquise o ambiente" 
                        />
                        <button type="button" className={styles.filter_button} aria-label="Filtrar ambientes">
                            <i className="fa-solid fa-sliders"></i>
                        </button>
                    </form>
                </section>

                {/* Tabela reajustada para 3 colunas (Local, Área, Responsável) */}
                <section className={styles.table_section} aria-label="Lista de locais">
                    <table className={styles.environment_table}>
                        <thead>
                            <tr>
                                <th>Local</th>
                                <th>Área</th>
                                <th>Responsável</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Sala 30/31 (anfiteatro)</td>
                                <td>Andar 1</td>
                                <td>Samanta Melissa</td>
                            </tr>
                            <tr>
                                <td className={styles.bold_text}>Sala 09/10</td>
                                <td>Andar 1</td>
                                <td className={styles.bold_text}>Késsia Milena</td>
                            </tr>
                            <tr>
                                <td>Sala 21/22</td>
                                <td>Andar 1</td>
                                <td>Odirlei Sabella</td>
                            </tr>
                            <tr>
                                <td>Sala 21/22</td>
                                <td>Andar 1</td>
                                <td>Odirlei Sabella</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* Paginação centralizada */}
                <nav className={styles.pagination} aria-label="Paginação">
                    <button type="button" className={styles.pagination_button} aria-label="Página anterior">
                        ‹
                    </button>
                    <a href="#" className={`${styles.pagination_link} ${styles.current}`} aria-current="page">1</a>
                    <a href="#" className={styles.pagination_link}>2</a>
                    <a href="#" className={styles.pagination_link}>3</a>
                    <button type="button" className={styles.pagination_button} aria-label="Próxima página">
                        ›
                    </button>
                </nav>
            </main>
        </>
    );
};

export default ListaLocais;