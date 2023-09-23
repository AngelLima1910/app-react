import { useEffect, useReducer, useState } from "react"
import Footer from "./components/Footer/Footer"
import FormularioTareas from "./components/FormularioTareas/FormularioTareas"
import Header from "./components/Header/Header"
import { TareaAnotada } from "./components/TareaAnotada/TareaAnotada"
import { tareaReducer } from "./reducers/tareaReducer"
import Swal from "sweetalert2";

//Funcion flecha
export const App = () => {
    const init = () => {
        return JSON.parse(localStorage.getItem("tareas")) || []
    }

    const [state, dispatch] = useReducer (tareaReducer, [], init);

    const [descripcion, setDescipcion] = useState("")

    useEffect(() => {
        localStorage.setItem("tareas", JSON.stringify(state))
    }, [state])
    

    const handleInputChange = (evento) => {
        setDescipcion(evento.target.value)
        console.log(descripcion)
    }
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

    let terminadas = 0;
    for (let i = 0; i < state.length; i++) {
        if (state[i].realizado === true) {
            terminadas++;
        } 
    }
    let porcentaje = 0;
    if (state.length > 0) {
        porcentaje = terminadas / state.length;
    }
    return (
        <>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <FormularioTareas descripcion={descripcion} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="d-flex flex-wrap">
                            {
                                state.map((tarea, index) => {
                                    return (
                                        <div key={index} className="p-2">
                                            <TareaAnotada key={index} porcentaje={porcentaje} handleCambiar={handleCambiar} handleBorrar={handleBorrar} tarea={tarea} index={index}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            
            <Footer porcentaje={porcentaje}/>
        </>
    )
}
//Otro tipo de funcion flecha
//const App = () => <h1>Hola mundo desde React</h1>
//export default App;
