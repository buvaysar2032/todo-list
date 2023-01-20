(function() {
	// создаем и возвращаем заголовок приложения 
	function createAppTitle(title) {
		let appTitle = document.createElement('h2')
		appTitle.innerHTML = title
		return appTitle
	}

	// создаем и возвращаем форму для создания дела
	function createTodoItemForm() {
		let form = document.createElement('form')
		let input = document.createElement('input')
		let buttonWrapper = document.createElement('div')
		let button = document.createElement('button')

        button.disabled = !input.value.length // probel

        input.addEventListener('input', () => { // probel
            button.disabled = !input.value.length // probel
        }) // probel

		form.classList.add('input-group', 'mb-3')
		input.classList.add('form-control')
		input.placeholder = 'Введите название нового дела'
		buttonWrapper.classList.add('input-group-append')
		button.classList.add('btn', 'btn-primary')
		button.textContent = 'Добавить дело'

		buttonWrapper.append(button)
		form.append(input)
		form.append(buttonWrapper)

        // <form class="input-group mb-3">
        //     <input class="form-control" placeholder="Введите название нового дела">
        //     <div class="input-group-append">
        //         <button class="btn btn-primary">Добавить дело</button>
        //     </div>
        // </form>

		return {
			form,
			input,
			button,
		}
	}

	// создаем и возвращаем список элементов
	function createTodoList() {
		let list = document.createElement('ul')
		list.classList.add('list-group')
		return list
	}

    function createTodoItem(name) {
        let item = document.createElement('li')
        // кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button')

        // probel //

        let randomId = Math.random() * 33
        item.id = randomId.toFixed(0)

        // probel //
        
        // устанавливаем стили для элемента списка, а также для размещения кнопок
        // в его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        item.textContent = name

        buttonGroup.classList.add('btn-group', 'btn-group-sm')
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово'
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить'

        // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
        buttonGroup.append(doneButton)
        buttonGroup.append(deleteButton)
        item.append(buttonGroup)

        // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
        return {
            item,
            doneButton,
            deleteButton,
            buttonGroup
        }
    }

    // probel

    function ItemDone(arr, item) {
        arr.map(obj => {
            if (obj.id === item.id && obj.done === false) {
                obj.done = true
            } else if (obj.id === item.id && obj.done === true) {
                obj.done = false
            }
        })
    }

    // probel

    function createTodoApp(container, title = 'Список дел', key) {
        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItemForm()
        let todoList = createTodoList()
        
        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)

        if (localStorage.getItem(key)) { // probel
            todoArray = JSON.parse(localStorage.getItem(key)) // probel

            for (let obj of todoArray) {
                let todoItem = createTodoItem(todoItemForm.input.value)

                todoItem.item.textContent = obj.name
                todoItem.item.id = obj.id

                if (obj.done === true) {
                    todoItem.item.classList.add('list-group-item-success')
                } else {
                    todoItem.item.classList.remove('list-group-item-success')
                }

                todoItem.doneButton.addEventListener('click', function() {
                    todoArray = JSON.parse(localStorage.getItem(key)) // probel
                    todoItem.item.classList.toggle('list-group-item-success')
                    ItemDone(todoArray, todoItem.item) // probel
    
                    localStorage.setItem(key, JSON.stringify(todoArray)) // probel
                })
                todoItem.deleteButton.addEventListener('click', function() {
                    if (confirm('Вы уверены?')) {
                        todoArray = JSON.parse(localStorage.getItem(key)) // probel
    
                        let newList = todoArray.filter(obj => obj.id !== todoItem.item.id) // probel
    
                        localStorage.setItem(key, JSON.stringify(newList)) // probel
                        todoItem.item.remove()
                    }
                })

                todoList.append(todoItem.item)
                todoItem.item.append(todoItem.buttonGroup)
            }
        }

        // браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e) {
            // эта строчка необходима, чтобы предотвратить стандартное действия браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault()

            // игнорируем создание элемента, если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value) {
                return
            }
            
            let todoItem = createTodoItem(todoItemForm.input.value)

            // добавляем обработчики на кнопки 
            todoItem.doneButton.addEventListener('click', function() {
                todoArray = JSON.parse(localStorage.getItem(key)) // probel
                todoItem.item.classList.toggle('list-group-item-success')
                ItemDone(todoArray, todoItem.item) // probel

                localStorage.setItem(key, JSON.stringify(todoArray)) // probel
            })
            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoArray = JSON.parse(localStorage.getItem(key)) // probel

                    let newList = todoArray.filter(obj => obj.id !== todoItem.item.id) // probel

                    localStorage.setItem(key, JSON.stringify(newList)) // probel
                    todoItem.item.remove()
                }
            })

            let localStorageArr = localStorage.getItem(key) // probel

            if (localStorageArr === null) { // probel
                todoArray = [] // probel
            } else { // probel
                todoArray = JSON.parse((localStorageArr)) // probel
            }

            // probel //

            function createObj(arr) {
                let itemObj = {}
                itemObj.name = todoItemForm.input.value
                itemObj.id = todoItem.item.id
                itemObj.done = false

                arr.push(itemObj)
            }

            createObj(todoArray)
            localStorage.setItem(key, JSON.stringify(todoArray))

            // probel //

            // создаем и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item)

            // обнуляем значение в поле, чтобы не пришлось стирать его вручную 
            todoItemForm.input.value = ''
            todoItemForm.button.disabled = !todoItemForm.button.disabled // probel
        })
    }

    window.createTodoApp = createTodoApp
}) ();

let todoArray = []