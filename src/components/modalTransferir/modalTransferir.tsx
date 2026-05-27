import React from 'react';
import styles from './modalTransferir.module.css';

interface ModalTransferirProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const ModalTransferir: React.FC<ModalTransferirProps> = ({ isOpen = true, onClose }) => {
    if (!isOpen) return null;

    return (
        <section className={styles.modal_overlay}>
            <article className={styles.modal_container} id="modalTransferir">
                <button type="button" className={styles.modal_close} onClick={onClose}>
                    x
                </button>

                <h1 className={styles.modal_title}>
                    Transferir os patrimônios
                </h1>

                <form className={styles.modal_form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.modal_field}>
                        <label htmlFor="ambienteTransferencia">
                            Ambiente
                        </label>
                        <select id="ambienteTransferencia" defaultValue="Manutenção">
                            <option value="Manutenção">Manutenção</option>
                            <option value="Sala XX">Sala XX</option>
                            <option value="Sala XX">Sala XX</option>
                        </select>
                    </div>

                    <div className={styles.modal_field}>
                        <label htmlFor="motivoTransferencia">
                            Motivo da transferência
                        </label>
                        <textarea 
                            id="motivoTransferencia"
                            placeholder="Lorem"
                        ></textarea>
                    </div>

                    <button type="submit" className={styles.modal_button}>
                        TRANSFERIR
                    </button>
                </form>
            </article>
        </section>
    );
};

export default ModalTransferir;