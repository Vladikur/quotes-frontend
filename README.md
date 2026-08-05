# quotes-frontend

Фронтенд-приложение для поиска и управления цитатами с поддержкой двух языков (русский / английский). Построено на Vue 3 + Vite.

## Возможности

- **Семантический поиск** — AI-поиск по цитатам на русском и английском языках
- **Строгий режим поиска** — переключение между семантическим и точным совпадением
- **Двуязычный контент** — каждая цитата отображается на двух языках одновременно
- **Ролевой доступ** — разные возможности для редактора (editor) и читателя (viewer)
- **Редактирование** — добавление, изменение и удаление цитат (для редакторов)
- **Массовая загрузка** — загрузка массива цитат через JSON (для редакторов)
- **Определение дублей** — поиск похожих цитат в базе (для редакторов)
- **Пагинация** — постраничный вывод результатов
- **Локализация UI** — интерфейс на русском и английском, автоопределение языка системы
- **Аналитика** — интеграция Google Tag Manager

## Стек

| Слой | Технологии |
|---|---|
| Фреймворк | Vue 3.5, Vite 7 |
| Роутинг | Vue Router 4 |
| Состояние | Pinia 3 |
| UI | Naive UI 2.43, @vicons/material |
| i18n | Vue-i18n 11 |
| HTTP | Axios 1.13 |
| Стили | SCSS, normalize.css |
| Линтинг | ESLint 9, Prettier 3 |

## Структура проекта

```
quotes-frontend/
├── api/
│   └── quotes.js           # HTTP-клиент (Axios + перехватчики токена и 401)
├── src/
│   ├── components/
│   │   ├── AppHeader.vue   # Шапка: переключатель языка, кнопка выхода
│   │   └── CardQuote.vue   # Карточка цитаты (двуязычная)
│   ├── i18n/
│   │   ├── index.js        # Конфигурация vue-i18n
│   │   ├── en.js           # Английские переводы
│   │   └── ru.js           # Русские переводы
│   ├── pages/
│   │   ├── QuoteSearch.vue # Главная страница — поиск цитат
│   │   ├── LoginPage.vue   # Авторизация
│   │   ├── BulkPage.vue    # Массовая загрузка (editor)
│   │   ├── EditPage.vue    # Редактирование цитаты (editor)
│   │   └── NotFound.vue    # 404
│   ├── router/index.js     # Маршруты и гарды
│   ├── stores/
│   │   ├── auth.js         # Хранилище: токен, роль
│   │   └── lang.js         # Хранилище: выбранный язык
│   ├── App.vue             # Корневой компонент
│   └── main.js             # Точка входа
├── styles/
│   ├── main.scss           # Глобальные стили
│   └── base/
│       ├── colors.scss     # Цветовые переменные
│       └── fonts.scss      # Шрифт Lora
├── public/
│   ├── fonts/              # Lora Regular / Medium / Bold
│   └── site.webmanifest    # PWA-манифест
├── index.html              # HTML-точка входа (GTM подключён здесь)
└── vite.config.js          # Конфигурация Vite
```

## API

Клиент настроен на `/api` (production) или `http://localhost:3000/api` (development).  
Авторизация — Bearer-токен в заголовке `Authorization`, хранится в `localStorage`.

| Метод | Путь | Описание |
|---|---|---|
| POST | `/auth/login` | Вход, получение токена |
| POST | `/quotes` | Поиск цитат (с пагинацией) |
| POST | `/quotes/bulk` | Массовая загрузка цитат |
| GET | `/quotes/:id` | Получить цитату по ID |
| PUT | `/quotes/:id` | Обновить цитату |
| DELETE | `/quotes/:id` | Удалить цитату |
| POST | `/quotes/duplicates` | Найти дубли |

## Маршруты

| Путь | Страница | Доступ |
|---|---|---|
| `/login` | Авторизация | публичный |
| `/` | Поиск цитат | авторизованный |
| `/bulk` | Массовая загрузка | editor |
| `/edit/:id` | Редактирование | editor |

## Установка и запуск

**Требования:** Node.js `^20.19.0` или `>=22.12.0`

```sh
npm install
```

### Разработка (с hot-reload)

```sh
npm run dev
```

### Сборка для production

```sh
npm run build
```

### Предпросмотр production-сборки

```sh
npm run preview
```

### Линтинг и форматирование

```sh
npm run lint     # ESLint (с автоисправлением)
npm run format   # Prettier
```

## Рекомендуемая среда

- **IDE:** [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- **Браузер:** Chrome/Edge + [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
