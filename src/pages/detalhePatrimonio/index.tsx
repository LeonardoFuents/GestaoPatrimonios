import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/header/header";
import styles from "./detalhePatrimonio.module.css";
import ModalJustificativa from "@/components/modalJustificativa/modalJustificativa"; 

const DetalhePatrimonio = () => {
    const [isJustificativaOpen, setIsJustificativaOpen] = useState(false);

    return (
        <>
            <Head>
                <title>Histórico/Detalhes - Gestão de Patrimônios</title>
            </Head>

            <Header />

            <main className={styles.page_content}>
                <section className={`${styles.page_detalhes} ${styles.layout_guide}`} aria-labelledby="titulo-patrimonio">

                    <a href="#" className={styles.back_link}>
                        <i className="fa-solid fa-arrow-left"></i> Voltar
                    </a>

                    <h1 id="titulo-patrimonio" className={styles.titulo_patrimonio}>
                        Patrimônio: 1236808
                    </h1>

                    <article className={styles.patrimonio_card}>
                        <div className={styles.patrimonio_content}>
                            <dl>
                                <dt>Denominação</dt>
                                <dd>NOTEBOOK ALTO DESEMPENHO P/ GAMER</dd>
                            </dl>
                            <dl>
                                <dt>Tipo</dt>
                                <dd>Mesa</dd>
                            </dl>
                            <dl>
                                <dt>Data transferência</dt>
                                <dd><time dateTime="2026-02-09">09/02/2026</time></dd>
                            </dl>
                            <dl>
                                <dt>Local Atual</dt>
                                <dd>Sala 09/10</dd>
                            </dl>
                            <dl>
                                <dt>Status Atual</dt>
                                <dd>Ativo</dd>
                            </dl>
                        </div>
                    </article>
                </section>

                <section className={`${styles.table_section} ${styles.layout_guide}`} aria-label="Lista de histórico do patrimônio">
                    <h2>Histórico</h2>

                    <table className={styles.history_table}>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Tipo de movimentação</th>
                                <th>Origem</th>
                                <th>Destino</th>
                                <th>Responsável</th>
                                <th>Justificativa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Data">11/02/2026</td>
                                <td data-label="Tipo de movimentação">
                                    <span className={styles.status_badge}>Transferência</span>
                                </td>
                                <td data-label="Origem">Sala 07/08</td>
                                <td data-label="Destino">Sala 09/10</td>
                                <td data-label="Responsável">Gustavo Lima</td>
                                <td data-label="Justificativa">
                                    <button 
                                        type="button"
                                        className={styles.action_icon_button}
                                        aria-label="Ver justificativa da transferência"
                                        onClick={() => setIsJustificativaOpen(true)}
                                    >
                                        <i className="fa-solid fa-circle-info"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>

            <ModalJustificativa 
                isOpen={isJustificativaOpen} 
                onClose={() => setIsJustificativaOpen(false)} 
            />
        </>
    );
};

export default DetalhePatrimonio;