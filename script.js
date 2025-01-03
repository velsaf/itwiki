// Загрузка статей из JSON
let articles = [];

fetch('articles.json')
    .then(response => response.json())
    .then(data => {
        articles = data;
        displayArticles(articles); // Отображаем все статьи при загрузке
    })
    .catch(error => console.error('Ошибка загрузки статей:', error));

// Элементы DOM
const categoriesList = document.getElementById("categories");
const articlesSection = document.getElementById("articles");
const searchInput = document.getElementById("search");
const backButton = document.getElementById("backButton");
const menuToggle = document.getElementById("menuToggle");

// Категории
const categories = ["Все", "Веб-технологии", "Программирование", "Инструменты", "Базы данных", "DevOps"];

// Функция для отображения списка статей
function displayArticles(filteredArticles) {
    articlesSection.innerHTML = ""; // Очищаем секцию статей
    filteredArticles.forEach(article => {
        const articleElement = document.createElement("article");
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.content.substring(0, 200)}...</p>
            <small>Теги: ${article.tags.join(", ")}</small>
            <button class="read-more" data-id="${article.id}">Читать далее</button>
        `;
        articlesSection.appendChild(articleElement);
    });

    // Добавляем обработчики для кнопок "Читать далее"
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', (e) => {
            const articleId = e.target.getAttribute('data-id');
            displayFullArticle(articleId);
        });
    });
}

// Функция для отображения полной статьи
function displayFullArticle(articleId) {
    const article = articles.find(article => article.id == articleId);
    if (article) {
        articlesSection.innerHTML = `
            <article>
                <h2>${article.title}</h2>
                <p>${article.content}</p>
                <small>Теги: ${article.tags.join(", ")}</small>
            </article>
        `;
        backButton.style.display = "block"; // Показываем кнопку "Вернуться назад"
    }
}

// Функция для возврата к списку статей
function returnToArticleList() {
    displayArticles(articles);
    backButton.style.display = "none"; // Скрываем кнопку "Вернуться назад"
}

// Инициализация категорий
categories.forEach(category => {
    const li = document.createElement("li");
    li.textContent = category;
    li.addEventListener("click", () => {
        filterByCategory(category);
        if (window.innerWidth <= 768) {
            categoriesList.classList.remove("active"); // Скрываем меню после выбора категории
        }
    });
    categoriesList.appendChild(li);
});

// Инициализация поиска
searchInput.addEventListener("input", (e) => {
    searchByTag(e.target.value);
});

// Кнопка "Вернуться назад"
backButton.addEventListener("click", returnToArticleList);
backButton.style.display = "none"; // Скрываем кнопку при загрузке страницы

// Кнопка меню для мобильных устройств
menuToggle.addEventListener("click", () => {
    categoriesList.classList.toggle("active"); // Показываем/скрываем меню
});

// Функция для фильтрации статей по категории
function filterByCategory(category) {
    const filteredArticles = category === "Все" 
        ? articles 
        : articles.filter(article => article.category === category);
    displayArticles(filteredArticles);
}

// Функция для поиска статей по тегам
function searchByTag(query) {
    const filteredArticles = articles.filter(article =>
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    displayArticles(filteredArticles);
}

// Отображаем все статьи при загрузке страницы
displayArticles(articles);
