import React, { useEffect, useState } from 'react';
import styles from './modalTransferir.module.css';
import { listarLocalizacoes, LocalizacaoDto } from '@/pages/api/ambienteService';
import { criarSolicitacaoTransferencia } from '@/pages/api/patrimonioService';
import { toast } from 'react-toastify';

interface ModalTransferirProps {
    isOpen?: boolean;
    onClose?: () => void;
    patrimonioID: string;
    localizacaoAtualID: string;
}

const ModalTransferir: React.FC<ModalTransferirProps> = ({
    isOpen = true,
    onClose,
    patrimonioID,
    localizacaoAtualID,
}) => {
    const [localizacoes, setLocalizacoes] = useState<LocalizacaoDto[]>([]);
    const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState<string>('');
    const [justificativa, setJustificativa] = useState<string>('');
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        listarLocalizacoes()
            .then((dados) => {

                const filtradas = dados.filter((l) => l.localizacaoID !== localizacaoAtualID);
                setLocalizacoes(filtradas);
                if (filtradas.length > 0) {
                    setLocalizacaoSelecionada(filtradas[0].localizacaoID);
                }
            })
            .catch(() => toast.error('Erro ao carregar ambientes.'));
    }, [isOpen, localizacaoAtualID]);

    if (!isOpen) return null;

    async function handleTransferir(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!localizacaoSelecionada) {
            toast.error('Selecione um ambiente de destino.');
            return;
        }

        setEnviando(true);
        try {
            await criarSolicitacaoTransferencia({
                patrimonioID,
                localizacaoID: localizacaoSelecionada,
                justificativa,
            });
            toast.success('Solicitação de transferência criada com sucesso!');
            setJustificativa('');
            onClose?.();
        } catch (error: any) {
            toast.error(error.message ?? 'Erro ao transferir.');
        } finally {
            setEnviando(false);
        }
    }

    return (
        <section className={styles.modal_overlay} onClick={onClose}>
            <article
                className={styles.modal_container}
                id="modalTransferir"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className={styles.modal_close}
                    onClick={onClose}
                    aria-label="Fechar modal"
                >
                    ✕
                </button>

                <h1 className={styles.modal_title}>Transferir Patrimônio</h1>

                <form className={styles.modal_form} onSubmit={handleTransferir}>
                    <div className={styles.modal_field}>
                        <label htmlFor="ambienteTransferencia">Ambiente de destino</label>
                        <select
                            id="ambienteTransferencia"
                            value={localizacaoSelecionada}
                            onChange={(e) => setLocalizacaoSelecionada(e.target.value)}
                            required
                        >
                            {localizacoes.length === 0 && (
                                <option value="">Carregando ambientes...</option>
                            )}
                            {localizacoes.map((loc) => (
                                <option key={loc.localizacaoID} value={loc.localizacaoID}>
                                    {loc.nomeLocal}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.modal_field}>
                        <label htmlFor="motivoTransferencia">Motivo da transferência</label>
                        <textarea
                            id="motivoTransferencia"
                            placeholder="Descreva o motivo da transferência..."
                            value={justificativa}
                            onChange={(e) => setJustificativa(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.modal_button}
                        disabled={enviando}
                    >
                        {enviando ? 'ENVIANDO...' : 'TRANSFERIR'}
                    </button>
                </form>
            </article>
        </section>
    );
};

export default ModalTransferir;