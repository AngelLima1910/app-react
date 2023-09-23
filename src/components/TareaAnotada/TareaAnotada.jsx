// import { useState } from "react"

export const TareaAnotada = ({tarea, index, handleCambiar, handleBorrar}) => {
  // Uso de hook useStatus
  // Desventaja de props siguen cierto flujo de trabajo del componente padre al hijo
  // del app se pueden mandar props hacia los demas componentes del componente al app no se puede

  return (
    <>
        <div className={tarea.realizado ? "card bg-success" : "card bg-light"} style={{ maxWidth: "400px" }}>
            <div className="card-body text-dark">
                <h5 className="card-title">Tarea: {index + 1}</h5>
                <p className="card-text">{tarea.descripcion}</p>
                <hr />
                <div className="d-grid gap-2">
                  <button onClick={() => handleBorrar(tarea.id)} className="btn btn-outline-dark">Borrar</button>
                  <button onClick={() => handleCambiar(tarea.id)} className="btn btn-outline-primary">{tarea.realizado ? "Marcar como inconclusa" : "Marcar como terminada "}</button>
                </div>
            </div>
        </div>
    </>
  )
}

