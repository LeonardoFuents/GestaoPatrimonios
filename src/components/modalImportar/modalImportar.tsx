import React from 'react';
import styles from './modalImportar.module.css';

interface ModalImportarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const ModalImportar: React.FC<ModalImportarProps> = ({ isOpen = true, onClose }) => {
    if (!isOpen) return null;

    return (
        <section className={styles.modal_overlay}>
            <article className={styles.modal_container} id="modalImportar">
                <button type="button" className={styles.modal_close} onClick={onClose}>
                    x
                </button>

                <h1 className={styles.modal_title}>
                    Importar novos patrimônios
                </h1>

                <form className={styles.modal_form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.modal_field}>
                        <label htmlFor="numeroPatrimonio">
                            Número do patrimônio
                        </label>
                        <input 
                            type="text" 
                            id="numeroPatrimonio"
                            placeholder="1245769"
                        />
                    </div>

                    <div className={styles.modal_field}>
                        <label htmlFor="denominacaoPatrimonio">
                            Denominação
                        </label>
                        <input 
                            type="text"
                            id="denominacaoPatrimonio"
                            placeholder="CADEIRA GIRATÓRIA EM POLIPROPILENO PRETO"
                        />
                    </div>

                    <button type="submit" className={styles.modal_button}>
                        SALVAR IMPORTAÇÃO
                    </button>
                </form>
            </article>
        </section>
    );
};

export default ModalImportar;