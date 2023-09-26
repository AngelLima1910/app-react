import { useReducer } from "react";
import { tareaReducer } from "../reducers/tareaReducer";
import Swal from "sweetalert2";

export const useCrud = (descripcion, setDescipcion) => {
    const init = () => {
        return JSON.parse(localStorage.getItem("tareas")) || []
    }
    const [tareas, dispatch] = useReducer (tareaReducer, [], init);
    const handleSubmit = (evento) => {
        evento.preventDefault();
        const tareaNueva = {
            id: new Date().getTime(),
            descripcion: descripcion,
            realizado: false
        }
        const action = {
            type:"agregar",
            payload: tareaNueva
        }
        dispatch(action)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tarea agregada correctamente!',
            showConfirmButton: false,
            timer: 1500
          })
        setDescipcion("")
    }

    const handleCambiar = (id) => {
        dispatch({
            type: "cambiar",
            payload: id
        })
    }

    const handleBorrar = (id) => {
        Swal.fire({
            title: '¿Estas seguro de eliminar la tarea?',
            text: "Sí lo haces, no hay vuelta atras!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminalo!'
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'Tu tarea ha sido eliminada.',
                'success'
              )
              dispatch ({
                    type: "borrar",
                    payload: id
                })
            } else if (result.isDenied) {
                Swal.fire(
                    'No paso nada'
                )
            }
        })
    }
    return {
        tareas,
        handleSubmit,
        handleCambiar,
        handleBorrar,
    };
}