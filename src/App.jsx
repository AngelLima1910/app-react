import { useEffect, useReducer, useState } from "react"
import Footer from "./components/Footer/Footer"
import FormularioTareas from "./components/FormularioTareas/FormularioTareas"
import Header from "./components/Header/Header"
import { TareaAnotada } from "./components/TareaAnotada/TareaAnotada"
import { tareaReducer } from "./reducers/tareaReducer"


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
        setDescipcion("")
    }

    const handleCambiar = (id) => {
        dispatch({
            type: "cambiar",
            payload: id
        })
    }

    const handleBorrar = (id) => {
        dispatch ({
            type: "borrar",
            payload: id
        })
    }

    let terminadas = 0;
    for (let i = 0; i < state.length; i++) {
        if (state[i].realizado === true) {
            terminadas++;
        }
    }

    let porcentaje = terminadas / state.length;

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
