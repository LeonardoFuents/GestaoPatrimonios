import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/header/header";
import styles from "./listaPatrimoniosPorSala.module.css";
import ModalImportar from "@/components/modalImportar/modalImportar";
import ModalTransferir from "@/components/modalTransferir/modalTransferir";

const ListaPatrimonios = () => {
    const [isImportarOpen, setIsImportarOpen] = useState(false);
    const [isTransferirOpen, setIsTransferirOpen] = useState(false);

    return (
        <>
            <Head>
                <title>Patrimônios - Gestão de Patrimônios</title>
            </Head>

            <Header />

            <main className={styles.page_content}>
                <section className={`${styles.page_header} ${styles.layout_guide}`} aria-labelledby="titulo-patrimonios">
                    <h1 id="titulo-patrimonios">Patrimônios: Sala 09/10</h1>

                    <form className={styles.search_area} role="search" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="pesquisa-ambiente" className={styles.sr_only}>Pesquisar patrimônios</label>
                        
                        <input 
                            type="search" 
                            id="pesquisa-ambiente" 
                            name="pesquisaAmbiente" 
                            placeholder="Pesquise o patrimônio" 
                        />

                        <button 
                            type="button" 
                            className={styles.add_button}
                            onClick={() => setIsImportarOpen(true)}
                        >
                            <i className="fa-solid fa-plus"></i> Patrimônio
                        </button>

                        <button type="button" className={styles.filter_button} aria-label="Filtrar patrimonios">
                            <i className="fa-solid fa-sliders"></i>
                        </button>
                    </form>
                </section>

                <section className={`${styles.table_section} ${styles.layout_guide}`} aria-label="Lista de patrimonios">
                    <table className={styles.environment_table}>
                        <thead>
                            <tr>
                                <th>Patrimônio</th>
                                <th>Denominação</th>
                                <th>Data transferência</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className={styles.bold_text}>1236808</td>
                                <td className={styles.bold_text}>MESA TRAPEZOIDAL DC-1987</td>
                                <td>11/02/26</td>
                                <td>
                                    <div className={styles.actions_wrapper}>
                                        <button 
                                            type="button" 
                                            className={styles.action_icon_button} 
                                            aria-label="Ver detalhes do patrimonio"
                                        >
                                            <i className="fa-solid fa-circle-info"></i>
                                        </button>
                                        
                                        <button 
                                            type="button" 
                                            className={styles.action_icon_button} 
                                            aria-label="Editar patrimonio"
                                            onClick={() => setIsTransferirOpen(true)}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>

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

            <ModalImportar 
                isOpen={isImportarOpen} 
                onClose={() => setIsImportarOpen(false)} 
            />

            <ModalTransferir 
                isOpen={isTransferirOpen} 
                onClose={() => setIsTransferirOpen(false)} 
            />
        </>
    );
};

export default ListaPatrimonios;