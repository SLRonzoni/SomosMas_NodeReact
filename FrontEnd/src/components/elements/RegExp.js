
const regularExpresions = {
	user: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo, entre 4 y 16 digitos
	name: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos, hasta 50 digitos
	description: /^[a-zA-Z0-9À-ÿ\s]{1,200}$/, // Letras, numeros y espacios, pueden llevar acentos, hasta 200 digitos
	password: /^.{4,12}$/, // entre 4 y 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // entre 7 y 14 numeros.

}

const charactersOk = {

	onlyNumbers : "return (event.charCode >= 48 && event.charCode <= 57 )",

	onlyletters:"return (event.charCode >= 65 && event.charCode <= 90 && event.charCode >= 97 && event.charCode <= 122)",

	numbersANDletters:"return (event.charCode >= 48 && event.charCode <= 57 && event.charCode >= 65 && event.charCode <= 90 && event.charCode >= 97 && event.charCode <= 122)",

	lettersUpper:"return (event.charCode >= 65 && event.charCode <= 90)",

	lettersDown:"return (event.charCode >= 97 && event.charCode <= 122)",

	notSpace:"return (event.charCode !==32)",

	notÑñ:"return (event.charCode !==209 && event.charCode !==241)",

	notQuotes:"return (event.charCode !==139 )", // comillas simples

	notDoubleQuotes:"return (event.charCode !==34)", // comillas dobles

	notArroba:"return (event.charCode !==64)", // @

	notBar:"return (event.charCode !==47)", //  /

	notBarReverse:"return (event.charCode !==92)", //  \

	onlyPoint:"return (event.charCode === 46 )" //  .

}

export { regularExpresions,
	     charactersOk };