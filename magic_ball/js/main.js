const ball = document.querySelector('.ball-img img');
const input = document.querySelector('.question-area input');
const answer = document.querySelector('.answer');
const error = document.querySelector('.error');

const answers = [
	'Tak',
	'Nie',
	'Wolałbys nie znać odpowiedzi na to pytanie...',
	'Raczej tak',
	'Raczej nie',
	'Zdecydowanie tak',
	'Zdecydowanie nie',
	'Dowiesz się wkrótce',
];

const addAnimation = () => {
	ball.classList.add('shake-animation');
	setTimeout(() => {
		ball.classList.remove('shake-animation');
	}, 1000);
};

const checkQuestion = () => {
	if (input.value == '') {
		error.textContent = 'Musisz zadać pytanie';
        answer.textContent = ''
	} else if (input.value.charAt(input.value.length - 1) !== '?') {
		error.textContent = 'Pytanie musi kończyć się znakiem zapytania "?"';
        answer.textContent = ''
	} else {
		const randomAnswer = answer.textContent = answers[Math.floor(Math.random() * answers.length)];
        answer.innerHTML = `<span>Odpowiedź: </span>${randomAnswer}`
        error.textContent = ''
	}
};


ball.addEventListener('click', () => {
	checkQuestion();
	addAnimation();
});
