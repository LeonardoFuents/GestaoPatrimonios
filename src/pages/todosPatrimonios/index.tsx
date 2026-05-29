import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/header/header";
import styles from "./todosPatrimonios.module.css";
import ModalImportar from "@/components/modalImportar/modalImportar";
import ModalTransferir from "@/components/modalTransferir/modalTransferir";
import { listarTodosPatrimonios, listarPatrimoniosPorLocalizacao, PatrimonioDto } from "@/pages/api/patrimonioService";
import { listarLocalizacoes, LocalizacaoDto } from "@/pages/api/ambienteService";
import { toast } from "react-toastify";

const ITENS_POR_PAGINA = 10;

const Patrimonios = () => {
    const router = useRouter();

    const filtroLocalizacao = typeof router.query.localizacaoId === "string" ? router.query.localizacaoId : "";

    const [isImportarOpen, setIsImportarOpen] = useState(false);

    const [isTransferirOpen, setIsTransferirOpen] = useState(false);
    const [patrimonioSelecionado, setPatrimonioSelecionado] = useState<string>("");
    const [localizacaoAtualPatrimonio, setLocalizacaoAtualPatrimonio] = useState<string>("");

    const [patrimonios, setPatrimonios] = useState<PatrimonioDto[]>([]);
    const [localizacoes, setLocalizacoes] = useState<LocalizacaoDto[]>([]);
    const [carregando, setCarregando] = useState(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(1);
    const [totalPaginas, setTotalPaginas] = useState<number>(1);
    const [pesquisa, setPesquisa] = useState<string>("");

    useEffect(() => {
        listarLocalizacoes()
            .then(dados => setLocalizacoes(dados))
            .catch(() => toast.error("Erro ao carregar locais para o filtro."));
    }, []);

    useEffect(() => {
        if (!router.isReady) return;

        let ignore = false;

        async function carregarDados() {
            setCarregando(true);
            try {

                const termo = pesquisa.trim() ? pesquisa.trim() : undefined;
                
                let result;
                if (filtroLocalizacao) {
                    result = await listarPatrimoniosPorLocalizacao(filtroLocalizacao, paginaAtual, ITENS_POR_PAGINA, termo);
                } else {
                    result = await listarTodosPatrimonios(paginaAtual, ITENS_POR_PAGINA, termo);
                }

                if (!ignore) {
                    setPatrimonios(result.items);
                    setTotalPaginas(result.totalPages);
                }
            } catch (error: any) {
                if (!ignore) toast.error(error.message || "Erro ao carregar os dados.");
            } finally {
                if (!ignore) setCarregando(false);
            }
        }

        const timeoutId = setTimeout(() => {
            carregarDados();
        }, 300);

        return () => { 
            ignore = true; 
            clearTimeout(timeoutId);
        };
    }, [filtroLocalizacao, router.isReady, paginaAtual, pesquisa]);

    useEffect(() => {
        setPaginaAtual(1);
    }, [pesquisa, filtroLocalizacao]);

    const alterarFiltro = (valor: string) => {
        router.push(
            {
                pathname: router.pathname,
                query: valor ? { localizacaoId: valor } : {},
            },
            undefined,
            { shallow: true }
        );
    };

    const abrirModalTransferir = (patrimonioId: string, localizacaoAtualID: string) => {
        setPatrimonioSelecionado(patrimonioId);
        setLocalizacaoAtualPatrimonio(localizacaoAtualID);
        setIsTransferirOpen(true);
    };

    const getVisiblePages = (current: number, total: number) => {
        if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
        if (current === 1) return [1, 2, 3];
        if (current === total) return [total - 2, total - 1, total];
        return [current - 1, current, current + 1];
    };

    const paginasVisiveis = getVisiblePages(paginaAtual, totalPaginas);

    return (
        <>
            <Head>
                <title>Patrimônios - Gestão de Patrimônios</title>
            </Head>

            <Header />

            <main className={styles.page_content}>
                <section className={`${styles.page_header} ${styles.layout_guide}`} aria-labelledby="titulo-patrimonios">
                    <h1 id="titulo-patrimonios">Patrimônios</h1>

                    <form className={styles.search_area} role="search" onSubmit={(e) => e.preventDefault()}>
                        
                        {/* Filtro de local */}
                        <label htmlFor="filtro-local" className={styles.sr_only}>Filtrar por local</label>
                        <select 
                            id="filtro-local"
                            className={styles.filter_select}
                            value={filtroLocalizacao}
                            onChange={(e) => alterarFiltro(e.target.value)}
                        >
                            <option value="">Todos os locais</option>
                            {localizacoes.map(loc => (
                                <option key={loc.localizacaoID} value={loc.localizacaoID}>
                                    {loc.nomeLocal}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="pesquisa-patrimonio" className={styles.sr_only}>Pesquisar patrimônios</label>
                        <input 
                            type="search" 
                            id="pesquisa-patrimonio" 
                            name="pesquisaPatrimonio" 
                            placeholder="Pesquise o patrimônio" 
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                        />

                        <button 
                            type="button" 
                            className={styles.add_button}
                            onClick={() => setIsImportarOpen(true)}
                        >
                            <i className="fa-solid fa-plus"></i> Patrimônio
                        </button>
                    </form>
                </section>

                <section className={`${styles.table_section} ${styles.layout_guide}`} aria-label="Lista de patrimonios">
                    <table className={styles.environment_table}>
                        <thead>
                            <tr>
                                <th>Patrimônio</th>
                                <th>Denominação</th>
                                <th>Localização Atual</th>
                                <th>Data transferência</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {carregando ? (
                                <tr>
                                    <td colSpan={5}>Carregando patrimônios...</td>
                                </tr>
                            ) : patrimonios.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center' }}>
                                        {pesquisa ? "Nenhum patrimônio encontrado para a pesquisa." : "Nenhum patrimônio encontrado para este filtro."}
                                    </td>
                                </tr>
                            ) : (
                                patrimonios.map((patrimonio) => {
                                    const dataFormatada = patrimonio.dataUltimaTransferencia 
                                        ? new Date(patrimonio.dataUltimaTransferencia).toLocaleDateString('pt-BR') 
                                        : "—";

                                    return (
                                        <tr key={patrimonio.patrimonioID}>
                                            <td data-label="Patrimônio" className={styles.bold_text}>{patrimonio.numeroPatrimonio}</td>
                                            <td data-label="Denominação" className={styles.bold_text}>{patrimonio.denominacao}</td>
                                            <td data-label="Localização Atual">{patrimonio.nomeLocalizacao}</td>
                                            <td data-label="Data transferência">{dataFormatada}</td>
                                            <td data-label="Ações">
                                                <div className={styles.actions_wrapper}>
                                                    <Link 
                                                        href={`/detalhesPatrimonio?patrimonioId=${patrimonio.patrimonioID}`}
                                                        className={styles.action_icon_button}
                                                        aria-label="Ver detalhes do patrimonio"
                                                    >
                                                        <i className="fa-solid fa-circle-info"></i>
                                                    </Link>
                                                    
                                                    <button 
                                                        type="button" 
                                                        className={styles.action_icon_button} 
                                                        aria-label="Transferir patrimonio"
                                                        onClick={() => abrirModalTransferir(patrimonio.patrimonioID, patrimonio.localizacaoID)}
                                                    >
                                                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </section>

                {/* Paginação */}
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

                        {paginasVisiveis.map((num) => (
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

            <ModalImportar 
                isOpen={isImportarOpen} 
                onClose={() => setIsImportarOpen(false)} 
            />

            {isTransferirOpen && (
                <ModalTransferir 
                    isOpen={isTransferirOpen} 
                    onClose={() => {
                        setIsTransferirOpen(false);

                        router.replace(router.asPath);
                    }} 
                    patrimonioID={patrimonioSelecionado}
                    localizacaoAtualID={localizacaoAtualPatrimonio}
                />
            )}
        </>
    );
};

export default Patrimonios;
