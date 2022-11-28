import { useEffect, useState } from "react";

// used to propertly declare the hook's return type
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

export default function useStorage(key:string, defaultValue:string | Function): [string, Dispatch<SetStateAction<string>>]{
    const [val, setVal] = useState(()=>{
        try {
            const savedVal = JSON.parse( localStorage.getItem(key)!);
            if (savedVal){
                return savedVal;
            }
                
        } catch (error) {
            console.error('Error reading storage', error);            
        }

        return  (defaultValue instanceof Function ? defaultValue() : defaultValue);
    });

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(val));
    },[val])

    return [val, setVal]; 
}