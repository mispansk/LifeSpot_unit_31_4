/*
* Конструктор, через который создаётся комментарий
*/
function Comment() {
    // Запросим имя
    this.author = prompt("Как вас зовут ?")
    if (this.author == null) {
        this.empty = true
        return
    }

    // Запросим текст
    this.text = prompt("Оставьте отзыв")
    if (this.text == null) {
        this.empty = true
        return
    }

    // Сохраним текущее время
    this.date = new Date().toLocaleString()
}

/*
* Оставить комментарий
*/
function addComment() {
    let comment = new Comment()

    // проверяем, успешно ли юзер осуществил ввод
    if (comment.empty) {
        return;
    }

    // Запросим, хочет ли пользователь оставить полноценный отзыв или это будет обычный комментарий
    let enableLikes = confirm('Разрешить пользователям оценивать ваш отзыв?')

    if (enableLikes) {
        // Создадим для отзыва новый объект из прототипа - комментария
        let review = Object.create(comment)
        // и добавим ему нужное свойство
        review.rate = 0;
        // Добавляем отзыв с возможностью пользовательских оценок
        writeReview(review)
    } else {
        // Добавим простой комментарий без возможности оценки
        writeReview(comment)
    }
}

/*
* Запишем объект на страницу
*/
const writeReview = review => {
    let likeCounter = '';

    // Для проверки, является ли объект отзывом, используем свойство hasOwnProperty
    // Если публикуется отзыв -  добавляем ему кнопку с лайками
    if (review.hasOwnProperty('rate')) {
        // Генерим идентификатор комментария
        let commentId = Math.random();
        // для кнопки лайков добавляем: идентифигаор атрибут onclicl для передачи id в функцию,
        // значок лайка и само значение счетчика отделем пробелом
        // добавлен стиль, чтобы кнопка смотрелась лучше 
        likeCounter += '<button id="' + commentId + '" style="border: none" onclick="addLike(this.id)">'
            + `❤️ ${review.rate}</button>`
    }

    // Запишем результат
    document.getElementsByClassName('reviews')[0].innerHTML += '    <div class="review-text">\n' +
        `<p> <i> <b>${review['author']}</b>  ${review['date']}${likeCounter}</i></p>` +
        `<p>${review['text']}</p>` +
        '</div>';
}
/*
* Увеличивает счётчик лайков
*/
    function addLike(id) {
        // Найдём нужный элемент по id
        let element = document.getElementById(id);

        // Преобразуем текст элемента в массив, разбив его по пробелам (так как счётчик лайков у нас отделен от символа ❤️пробелом)
        let array = element.innerText.split(' ')

        // Вытащим искомое значение счётчика и сразу же преобразуем его в число, так как
        // при сложении любого значения со строкой в JS будет строка, а нам этого не требуется
        let resultNum = parseInt(array[array.length - 1], 10);

        // Увеличим счётчик
        resultNum += 1

        // Сохраним измененное значение обратно в массив
        array[array.length - 1] = `${resultNum}`

        // Обновим текст элемента
        element.innerText = array.join(' ')
    }

                                                    /*ФУНКЦИИ ДЛЯ СЛАЙДЕРА*/


/* Устанавливаем стартовый индекс слайда по умолчанию: */
let slideIndex = 1;
/* Вызываем функцию, которая реализована ниже: */
//showSlides(slideIndex);

/* показываем следующий слайд: */
function nextSlide(n) {
    showSlides(slideIndex += n);
}

/* Устанавливаем текущий слайд: */
function currentSlide(n) {
    showSlides(slideIndex = n);
}
/* Функция перелистывания: */
function showSlides(n) {
    /* элементы  класса "picture", то есть картинки: */
    let slides = document.getElementsByClassName("picture");
    /* элементы  класса "dot", то есть кружки: */
    let dots = document.getElementsByClassName("dot");
    /*элемент кнопки вперед*/
    let next = document.getElementsByClassName("next");
    /*элемент кнопки назад*/
    let prev = document.getElementsByClassName("prev");

    /*эти проверки для того, чтобы был зацикленный показ картинок  (+ отредактировать кнопку prev в slider.html)*/

    ///* Проверяем количество слайдов: */
    //if (n > slides.length) {
    //    slideIndex = 1
    //}
    //if (n < 1) {
    //    slideIndex = slides.length
    //}

    /*эти проверки для конечного показа картинок*/

    if (n == slides.length) {
        next[0].style.display = "none"
    }
    else {
        next[0].style.display = "block"
    }

    if (n - 1 > 0) {
        prev[0].style.display = "block"
    }
    else {
        prev[0].style.display = "none"
    }

    /* Проходим по каждому слайду в цикле for: и делаем все картинки невидимыми */
    for (let slide of slides) {
        slide.style.display = "none";
    }

    /* все кружочки делаем светлыми */
    for (let dot of dots) {
        dot.className = "dot";
    }
    /* Делаем элемент блочным: */
    slides[slideIndex - 1].style.display = "block";
    /*делаем кружочек черным*/
    dots[slideIndex - 1].className = "dot active_dot";
}



