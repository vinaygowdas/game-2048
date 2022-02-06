import { useEffect } from 'react';

export default function useEvent(event, handler) {
    useEffect(() => {
        window.addEventListener(event, handler);
        return () => {
            window.removeEventListener(event, handler);
        }
    });
}
