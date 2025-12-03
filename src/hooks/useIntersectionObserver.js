import { useEffect, useRef } from "react"


export const useIntersectionObserver = ({ onIntersect, enable = true }) => {

    const targetRef = useRef(null);

    useEffect(() => {
      
        if ( !enable ) return;

        //TODO: explicarle a carmen que es IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if ( first.isIntersecting ) {
                    onIntersect();
                }
            }, 
            {
                threshold: 1.0,
                rootMargin: '100px'
            }
            // antes de llegar al final del elemento - margen de 100px
        );

        const currentTarget = targetRef.current;

        if ( currentTarget ) {
            observer.observe( currentTarget );
        }

        return () => {
            if ( currentTarget ){
                observer.unobserve( currentTarget );
            }
        };

    }, [onIntersect, enable]);
    

    return targetRef;
}