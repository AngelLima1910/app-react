import { useEffect} from "react"
import {Header, Footer, FormularioTareas, TareaAnotada } from "./components";
import { useCrud, useForm, useProgress } from "./hooks";

//Funcion flecha
export const App = () => {
    const [descripcion, handleInputChange, setDescipcion] = useForm("")
    const {tareas, handleSubmit, handleCambiar, handleBorrar, } = useCrud(descripcion, setDescipcion);
    const porcentaje = useProgress(tareas);

    useEffect(() => {
        localStorage.setItem("tareas", JSON.stringify(tareas))
    }, [tareas])
    
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
                                tareas.map((tarea, index) => {
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
