import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/header/header";
import styles from "./listaLocais.module.css";
import { listarAmbientes, AmbienteViewModel } from "../api/ambienteService";
import { toast, ToastContainer } from "react-toastify";

const ITENS_POR_PAGINA = 10;

const ListaLocais = () => {
    const router = useRouter();

    const [ambientes, setAmbientes] = useState<AmbienteViewModel[]>([]);
    const [ambientesFiltrados, setAmbientesFiltrados] = useState<AmbienteViewModel[]>([]);
    const [pesquisa, setPesquisa] = useState<string>("");
    const [carregando, setCarregando] = useState<boolean>(true);
    const [paginaAtual, setPaginaAtual] = useState<number>(1);

    const carregarAmbientes = useCallback(async () => {
        setCarregando(true);
        try {
            const dados = await listarAmbientes();
            setAmbientes(dados);
            setAmbientesFiltrados(dados);
        } catch (error: any) {
            toast.error(error.message ?? "Erro ao carregar ambientes.");

            if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
                router.push("/login");
            }
        } finally {
            setCarregando(false);
        }
    }, [router]);

    useEffect(() => {
        carregarAmbientes();
    }, [carregarAmbientes]);

    useEffect(() => {
        const termo = pesquisa.toLowerCase().trim();
        if (!termo) {
            setAmbientesFiltrados(ambientes);
        } else {
            setAmbientesFiltrados(
                ambientes.filter(
                    (a) =>
                        a.nomeLocal.toLowerCase().includes(termo) ||
                        a.nomeArea.toLowerCase().includes(termo)
                )
            );
        }
        setPaginaAtual(1);
    }, [pesquisa, ambientes]);

    const totalPaginas = Math.max(1, Math.ceil(ambientesFiltrados.length / ITENS_POR_PAGINA));
    const itensPagina = ambientesFiltrados.slice(
        (paginaAtual - 1) * ITENS_POR_PAGINA,
        paginaAtual * ITENS_POR_PAGINA
    );

    function irParaPatrimonios(localizacaoID: string) {
        router.push(`/todosPatrimonios?localizacaoId=${localizacaoID}`);
    }

    return (
        <>
            <ToastContainer />
            <Head>
                <title>Locais - Gestão de Patrimônios</title>
            </Head>

            <Header />

            <main className={styles.page_content}>

                <section className={styles.page_header} aria-labelledby="titulo-locais">
                    <h1 id="titulo-locais">Locais</h1>

                    <form
                        className={styles.search_area}
                        role="search"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor="pesquisa-ambiente" className={styles.sr_only}>
                            Pesquisar ambiente
                        </label>
                        <input
                            type="search"
                            id="pesquisa-ambiente"
                            name="pesquisaAmbiente"
                            placeholder="Pesquise o ambiente"
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                        />
                        <button
                            type="button"
                            className={styles.filter_button}
                            aria-label="Limpar filtro"
                            onClick={() => setPesquisa("")}
                        >
                            <i className={`fa-solid ${pesquisa ? "fa-xmark" : "fa-sliders"}`}></i>
                        </button>
                    </form>
                </section>

                {/* Tabela de locais */}
                <section className={styles.table_section} aria-label="Lista de locais">
                    {carregando ? (
                        <p className={styles.loading_text} aria-live="polite">
                            Carregando ambientes...
                        </p>
                    ) : (
                        <table className={styles.environment_table}>
                            <thead>
                                <tr>
                                    <th>Local</th>
                                    <th>Área</th>
                                    <th>Responsável</th>
                                </tr>
                            </thead>

                            <tbody>
                                {itensPagina.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className={styles.empty_row}>
                                            {pesquisa
                                                ? "Nenhum ambiente encontrado para a pesquisa."
                                                : "Nenhum ambiente cadastrado."}
                                        </td>
                                    </tr>
                                ) : (
                                    itensPagina.map((ambiente) => (
                                        <tr
                                            key={ambiente.localizacaoID}
                                            className={styles.clickable_row}
                                            onClick={() => irParaPatrimonios(ambiente.localizacaoID)}
                                            title={`Ver patrimônios de ${ambiente.nomeLocal}`}
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") irParaPatrimonios(ambiente.localizacaoID);
                                            }}
                                        >
                                            <td>{ambiente.nomeLocal}</td>
                                            <td>{ambiente.nomeArea}</td>
                                            <td>{ambiente.nomeResponsavel}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </section>

                {!carregando && totalPaginas > 1 && (
                    <nav className={styles.pagination} aria-label="Paginação">
                        <button
                            type="button"
                            className={styles.pagination_button}
                            aria-label="Página anterior"
                            onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                            disabled={paginaAtual === 1}
                        >
                            ‹
                        </button>

                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                            <button
                                key={num}
                                type="button"
                                className={`${styles.pagination_link} ${num === paginaAtual ? styles.current : ""}`}
                                aria-current={num === paginaAtual ? "page" : undefined}
                                onClick={() => setPaginaAtual(num)}
                            >
                                {num}
                            </button>
                        ))}

                        <button
                            type="button"
                            className={styles.pagination_button}
                            aria-label="Próxima página"
                            onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
                            disabled={paginaAtual === totalPaginas}
                        >
                            ›
                        </button>
                    </nav>
                )}
            </main>
        </>
    );
};

export default ListaLocais;