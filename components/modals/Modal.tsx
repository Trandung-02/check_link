"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    isOpen?: boolean;
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    isClosable?: boolean | false;
    heightFull?: boolean | false;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, isClosable = true, heightFull }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal-backdrop"
                    className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 px-0 py-0 backdrop-blur-[2px] sm:items-center sm:px-4 sm:py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        key="modal-content"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? "modal-title" : undefined}
                        className={`flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/[0.04] sm:rounded-2xl ${heightFull ? "h-full max-h-full sm:max-h-[92vh]" : ""}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ type: "spring", damping: 28, stiffness: 320 }}
                    >
                        <div
                            className={`flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 text-left sm:px-6 ${title || isClosable ? "" : "hidden"}`}
                        >
                            {title ? (
                                <h2
                                    id="modal-title"
                                    className="text-left text-lg font-semibold leading-snug tracking-tight text-slate-900"
                                >
                                    {title}
                                </h2>
                            ) : (
                                <div className="min-w-0 flex-1" />
                            )}

                            {isClosable ? (
                                <button
                                    type="button"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                    onClick={onClose}
                                    aria-label="Close"
                                >
                                    <img src="/images/icons/ic_close.svg" className="h-[18px] w-[18px]" alt="" />
                                </button>
                            ) : null}
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 text-left sm:px-6 sm:py-6">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
