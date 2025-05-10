import { useState, useEffect } from 'react';

function Themeswitcher() {

    const [ themeMode, setThemeMode ] = useState('light');

    const darkMode = () => {
    setThemeMode('Dark');
    }

    const lightMode = () => {
    setThemeMode('light');
    }

    useEffect(() => {
        document.querySelector('html')
    }, [themeMode]);

    return (

    )
}

export default Themeswitcher;