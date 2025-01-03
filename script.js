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

// Категории
const categories = ["Все", "Веб-технологии", "Программирование", "Инструменты"];

// Функция для отображения статей
function displayArticles(filteredArticles) {
    articlesSection.innerHTML = ""; // Очищаем секцию статей
    filteredArticles.forEach(article => {
        const articleElement = document.createElement("article");
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.content}</p>
            <small>Теги: ${article.tags.join(", ")}</small>
        `;
        articlesSection.appendChild(articleElement);
    });
}

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

// Инициализация категорий
categories.forEach(category => {
    const li = document.createElement("li");
    li.textContent = category;
    li.addEventListener("click", () => filterByCategory(category));
    categoriesList.appendChild(li);
});

// Инициализация поиска
searchInput.addEventListener("input", (e) => {
    searchByTag(e.target.value);
});

// Кнопка "Вернуться назад"
backButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Плавная прокрутка вверх
});

// Отображаем все статьи при загрузке страницы
displayArticles(articles);
