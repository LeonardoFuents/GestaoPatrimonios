import React from 'react';
import styles from './modalJustificativa.module.css';

interface ModalJustificativaProps {
    isOpen?: boolean;
    onClose?: () => void;
    textoJustificativa?: string;
}

const ModalJustificativa: React.FC<ModalJustificativaProps> = ({ 
    isOpen = true, 
    onClose,
    textoJustificativa = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quasi distinctio! Temporibus similique expedita laboriosam, assumenda officia veritatis amet doloremque esse obcaecati repudiandae architecto in sed facilis quas harum."
}) => {
    if (!isOpen) return null;

    return (
        <section className={styles.modal_overlay}>
            <article className={`${styles.modal_container} ${styles.modal_justificativa}`}>
                <button type="button" className={styles.modal_close} onClick={onClose}>
                    x
                </button>

                <h1 className={styles.modal_title}>
                    Justificativa
                </h1>

                <p className={styles.modal_text}>
                    {textoJustificativa}
                </p>
            </article>
        </section>
    );
};

export default ModalJustificativa;