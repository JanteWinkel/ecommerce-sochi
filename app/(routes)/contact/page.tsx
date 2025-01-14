import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Page() {
    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <h1 className="mb-5 text-3xl font-bold text-primary">Contacto</h1>
            <h3 className="text-xl text-black dark:text-white">¡Estamos aquí para ayudarte! Si tienes alguna pregunta sobre nuestros productos o deseas crear un accesorio único y a tu medida, no dudes en escribirnos. Puedes contactarnos directamente por WhatsApp o enviarnos un mensaje en Instagram. ¡Será un placer atenderte!</h3>
            <div className="max-w-md mx-auto  justify-center items-center gap-8 mt-5">
                <div className="mb-5 sm:flex items-center justify-between">
                    <a href="https://wa.me/+584141885117" target="_blank" rel="noopener noreferrer" className="ml-4">
                        <p>Contáctanos por WhatsApp </p>
                        <FaWhatsapp className="mr-2 text-6xl text-primary" />
                    </a>
                    <a href="https://instagram.com/muysochi" target="_blank" rel="noopener noreferrer" className="ml-4">
                        <p>Contáctanos por Instagram </p>
                        <FaInstagram className="mr-2 text-6xl text-primary" />
                    </a>
                </div>
            </div>
        </div>
    )
}