import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/header/header";
import styles from "./detalhesPatrimonio.module.css";
import ModalTransferir from "@/components/modalTransferir/modalTransferir";
import { buscarPatrimonioPorId, DetalhesPatrimonioDto } from "@/pages/api/patrimonioService";
import { toast } from "react-toastify";

const DetalhesPatrimonio = () => {
    const router = useRouter();
    const { patrimonioId } = router.query;

    const [patrimonio, setPatrimonio] = useState<DetalhesPatrimonioDto | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [isTransferirOpen, setIsTransferirOpen] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;
        
        if (!patrimonioId || typeof patrimonioId !== "string") {
            toast.error("Patrimônio não informado.");
            setCarregando(false);
            return;
        }

        async function carregarDados() {
            try {
                const dados = await buscarPatrimonioPorId(patrimonioId as string);
                setPatrimonio(dados);
            } catch (error: any) {
                toast.error(error.message || "Erro ao carregar os dados.");
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, [router.isReady, patrimonioId, isTransferirOpen]);

    const formatCurrency = (value?: number | null) => {
        if (value == null) return "—";
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (dateString?: string | null) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const getStatusClass = (status: string) => {
        if (status.includes("Ativo")) return styles.status_Ativo;
        if (status.includes("Inativo")) return styles.status_Inativo;
        if (status.includes("Transferido")) return styles.status_Transferido;
        return styles.status_default;
    };

    return (
        <>
            <Head>
                <title>Detalhes do Patrimônio - Gestão de Patrimônios</title>
            </Head>

            <Header />

            <main className={styles.page_content}>
                <section className={`${styles.page_header} ${styles.layout_guide}`} aria-labelledby="titulo-detalhes">
                    <div className={styles.title_container}>
                        <Link 
                            href={patrimonio ? `/todosPatrimonios?localizacaoId=${patrimonio.localizacaoID}` : "/listaAmbientes"} 
                            className={styles.back_button}
                            aria-label="Voltar"
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </Link>
                        <h1 id="titulo-detalhes">Detalhes do Patrimônio</h1>
                    </div>
                </section>

                <section className={`${styles.card_section} ${styles.layout_guide}`} aria-label="Informações do patrimônio">
                    {carregando ? (
                        <p>Carregando dados do patrimônio...</p>
                    ) : !patrimonio ? (
                        <p>Patrimônio não encontrado.</p>
                    ) : (
                        <>
                            <div className={styles.details_grid}>
                                <div className={styles.detail_item}>
                                    <span className={styles.detail_label}>Número do Patrimônio</span>
                                    <span className={styles.detail_value}>{patrimonio.numeroPatrimonio}</span>
                                </div>
                                
                                <div className={styles.detail_item}>
                                    <span className={styles.detail_label}>Denominação</span>
                                    <span className={styles.detail_value}>{patrimonio.denominacao}</span>
                                </div>

                                <div className={styles.detail_item}>
                                    <span className={styles.detail_label}>Valor de Aquisição</span>
                                    <span className={styles.detail_value}>{formatCurrency(patrimonio.valor)}</span>
                                </div>

                                <div className={styles.detail_item}>
                                    <span className={styles.detail_label}>Localização Atual</span>
                                    <span className={styles.detail_value}>{patrimonio.nomeLocalizacao}</span>
                                </div>

                                <div className={styles.detail_item}>
                                    <span className={styles.detail_label}>Status</span>
                                    <span className={styles.detail_value}>
                                        <span className={`${styles.status_badge} ${getStatusClass(patrimonio.nomeStatus)}`}>
                                            {patrimonio.nomeStatus}
                                        </span>
                                    </span>
                                </div>

                                <div className={styles.detail_item}>
                                    <span className={styles.detail_label}>Última Transferência</span>
                                    <span className={styles.detail_value}>{formatDate(patrimonio.dataUltimaTransferencia)}</span>
                                </div>
                            </div>

                            <div className={styles.action_area}>
                                <button 
                                    type="button" 
                                    className={styles.transfer_btn}
                                    onClick={() => setIsTransferirOpen(true)}
                                >
                                    <i className="fa-solid fa-arrow-right-arrow-left"></i> Solicitar Transferência
                                </button>
                            </div>
                        </>
                    )}
                </section>
            </main>

            {isTransferirOpen && patrimonio && (
                <ModalTransferir 
                    isOpen={isTransferirOpen} 
                    onClose={() => setIsTransferirOpen(false)} 
                    patrimonioID={patrimonio.patrimonioID}
                    localizacaoAtualID={patrimonio.localizacaoID}
                />
            )}
        </>
    );
};

export default DetalhesPatrimonio;
