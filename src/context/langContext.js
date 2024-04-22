import React, {useState} from "react";
import { IntlProvider } from "react-intl";
import MessageSpanish from "../lang/es-ES.json"
import MessageEnglish from "../lang/en-US.json"

const langContext = React.createContext();

function LangProvider ({children}) {
    let defaultLocale;
	let defaultMessage;
	const lang = localStorage.getItem('lang');

	if(lang){
		defaultLocale = lang

		if(lang === 'es-ES'){
			defaultMessage = MessageSpanish;
		} else if(lang === 'en-US'){
			defaultMessage = MessageEnglish
		} else {
			defaultLocale = 'en-US'
			defaultMessage = MessageEnglish
		}
	}

    const [message, setMessage] = useState(defaultMessage);
    const [locale, setLocale] = useState(defaultLocale)

    const establecerLenguaje = (lenguaje) => {
        switch (lenguaje) {
            case 'es-ES':
                setMessage(MessageSpanish);
                setLocale('es-ES');
                localStorage.setItem('lang', 'es-ES');
                break;

            case 'en-US':
                setMessage(MessageEnglish);
                setLocale('en-US');
                localStorage.setItem('lang', 'en-US');
                break;
            default:
                setMessage(MessageEnglish);
                setLocale('en-US');
                localStorage.setItem('lang', 'en-US');
        }
    }

    return(
        <langContext.Provider value={{establecerLenguaje: establecerLenguaje}}>
            <IntlProvider locale={locale} messages={message} >
             {children}
            </IntlProvider>
        </langContext.Provider>
    )
}

export {langContext, LangProvider}