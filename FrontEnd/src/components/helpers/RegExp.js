
//REGULAR EXPRESSIONS
const regexActivitiesName=/^[a-zA-Z0-9_-\s]{6,16}$/ // Letras, numeros, guion y guion_bajo, entre 6 y 16 digitos

const regexUserfirstName=/^[a-zA-Z_-\s]{4,16}$/ // Letras, guion y guion_bajo, entre 4 y 16 digitos

const regexUserLastName=/^[a-zA-Z_-\s]{4,16}$/ // Letras, guion y guion_bajo, entre 4 y 16 digitos

const regexCategoryId=/^[0-9]{1,5}$/
const regexUserEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const regexUserPassword=/^[a-zA-Z0-9_-\s]{6,16}$/ // Letras, numeros, guion y guion_bajo, entre 6 y 16 digitos

const regexUserPhone=/^[0-9_-]{7,14}$/ // entre 7 y 14 numeros.

const regexCategoryName=/^[a-zA-ZÀ-ÿ\s]{4,50}$/ // Letras y espacios, pueden llevar acentos, hasta 50 digitos

const regexCategoryDescription=/^[a-zA-Z0-9À-ÿ\s+]{0,200}$/ // Letras, numeros y espacios, pueden llevar acentos, hasta 200 digitos

const regexUrl=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,40}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

const regexAmount=/^[0-9]{1,6}$/



let eCharCode;
const charactersOk = {

	onlyNumbers : (eCharCode >= 48 && eCharCode <= 57 ),

	onlyletters:((eCharCode >= 65 && eCharCode <= 90) || (eCharCode >= 97 && eCharCode <= 122)),

	numbersANDletters:((eCharCode >= 48 && eCharCode <= 57) || (eCharCode >= 65 && eCharCode <= 90) || (eCharCode >= 97 && eCharCode <= 122)),

	lettersUpper:(eCharCode >= 65 && eCharCode <= 90),

	lettersDown:(eCharCode >= 97 && eCharCode <= 122),

	notSpace:(eCharCode !==32),

	notÑñ:(eCharCode !==209 || eCharCode !==241),

	notQuotes:(eCharCode !==139 ), // comillas simples

	notDoubleQuotes:(eCharCode !==34), // comillas dobles

	notArroba:(eCharCode !==64), // @

	notBar:(eCharCode !==47), //  /

	notBarReverse:(eCharCode !==92), //  \

	onlyPoint:(eCharCode === 46 ) //  .

}

export { regexActivitiesName, regexCategoryId, regexAmount,
	     regexUserfirstName,regexUserLastName,regexUserPassword,regexUserEmail,regexUserPhone,
	     regexCategoryName,regexCategoryDescription, regexUrl,
	     charactersOk };