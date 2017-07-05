export const validationRegexes = {
	email: /.+\@.+\..+/,
	phoneNumber: /\d{10,}/,
	address: /.{5,}/,
	city: /.{2,}/,
	state: /.{2,}/,
	zipCode: /.{4,}/,
	cardholderName: /.{3,}/,
	cardNumber: /[\d\s]{15,}/,
	cvv: /\d{3,4}/,
};