import { useEffect, useState } from "react"


export const useDebounce = (value, delay) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {

      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    
      return () => {
        clearTimeout(handler);
      }

    }, [value, delay])

    // yo le paso al debounce el valor que es cambiante
    // por cada tecla que presione el contador se va a reiniciar
    // s -> empieza contar 500ms
    // si no presiono ninguna otra tecla despues de los 500ms
    // entonces se ejecuta el setDebouncedValue con el valor final
    // caso contrario si presiono una tecla más antes de qie se acabe el tiempo
    // se reinicia el contador

    return debouncedValue;
}