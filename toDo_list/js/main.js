let todoInput; //miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo; //info o braku zadań / konieczności wpisania tekstu
let addBtn; //przycisk ADD - dodaje nowe elementy do listy
let ulList; //lista zadań, tag UL

let popup;
let popupInfo; //tekst podczas dodania pustego pustego stringa
let todoToEdit; //edytowany Todo
let popupInput; //input w popupie
let popupAddBtn; //przycisk "zatwierdź"
let popupCloseBtn; //przycisk "anuluj"
// let newTodo

// FONKCJA URUCHAMIAJACA POBIERANIE I NASLUCHIWANIE
const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

// FUNKCJA POBIERAJACA ELEMENTY
const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');

	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};

// NASLUCHIWANIE NA AKCJE
const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTask);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', cancelPopup);
	popupAddBtn.addEventListener('click', changeTodoText);
    todoInput.addEventListener('keyup', enterKeyCheck)
};

// DODANIE NOWEGO ELEMENTU DO LISTY
const addNewTask = () => {
	if (todoInput.value !== '') {
		const newTodo = document.createElement('li'); //tworzymy zmienną
		newTodo.textContent = todoInput.value;
		createToolsArea(newTodo); // przekazujemy parametr do funkcji
		ulList.append(newTodo);

		todoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!';
	}
};

// STWORZENIE CIALA ELEMENTU W LISCIE
const createToolsArea = (param) => {
	//odbieramy parametr
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	param.append(toolsPanel); // wykorzystujemy przypisany parametr

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

// AKCJA NA PRZYCISKACH
const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('complete');
	} else if (e.target.matches('.edit')) {
		editTodo(e);
	} else if (e.target.matches('.delete')) {
		deleteTodo(e);
	}
};

// PANEL EDYCJI
const editTodo = (e) => {
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
	console.log(todoToEdit.firstChild);
	popup.style.display = 'flex';
};

// SCHOWANIE PANELU ECUCJI "ANULUJ"
const cancelPopup = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

// WARTOSC W PANELU EDYCJI
const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		cancelPopup();
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść!';
	}
};

// USUNIECIE ELEMENTU Z LISTY
const deleteTodo = (e) => {
	e.target.closest('li').remove();
	const allTodos = ulList.querySelectorAll('li');

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Twoja lista jest pusta';
	}
};

const enterKeyCheck = (e) => {
    if(e.key === 'Enter'){
        addNewTask()
    }
};

document.addEventListener('DOMContentLoaded', main);
