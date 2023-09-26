export const useProgress = (tareas) => {
    let terminadas = 0;
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].realizado === true) {
            terminadas++;
        } 
    }
    let porcentaje = 0;
    if (tareas.length > 0) {
        porcentaje = terminadas / tareas.length;
    }
    return porcentaje
}