import { useState } from "react"

export const useForm = (estadoInicial) => {
    const [descripcion, setDescipcion] = useState(estadoInicial)

    const handleInputChange = (evento) => {
        setDescipcion(evento.target.value)
    }
    return [descripcion, handleInputChange, setDescipcion];
}