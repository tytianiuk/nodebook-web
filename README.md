# Nodebook

## 📝 Опис проєкту

Цей проєкт — це книжковий форум, який дозволяє користувачам переглянути книги з їх описом та відгуками від інших користувачів, і можливість вподобати улюблені книги.

### 👥 Робили проєкт у команді:

- **Бонадренко Олександр**, ІМ-22: Back-end
- **Балахон Михайло**, ІМ-22: Back-end
- **Титянюк Артем**, ІМ-22: Front-end
- **Сачко Максим**, ІМ-22: Front-end

Вирішили робити у різних репозиторіях Front-end та Back-end. Усі важливі посилання вкінці.

# Патерни, застосовані в проєкті

[**Abstract Factory**](./public/docs/abstract-factory.md)🏭 імплементований для генерації різних типів полів вводу у формах

[**Adapter**](./public/docs/adapter-pattern.md)🔌 імплементований для адаптації стороннього API до HttpClient-сумісного інтерфейсу

[**Chain of Responsibility**](./public/docs/chain-of-resposibility.md)⛓️ імплементований для побудови ланцюга обробки запитів авторизації (валідація, автентифікація)

[**Container/Presentational**](./public/docs/presentational-container-pattern.md))📦👩‍🏫 імплементований для розділення логіки отримання даних і відображення компонентів сторінки профілю

[**Proxy**](./public/docs/proxy-pattern.md)🛡️ імплементований для додавання кешування і логування запитів до API

[**Singleton**](./public/docs/singleton-pattern.md)☝️ імплементований для забезпечення єдиного екземпляру API-клієнта

[**Strategy**](./public/docs/strategy.md)♟️ імплементований для гнучкого застосування фільтрів і взаємодій з книгами

# Додаткова інформація

### 👨‍💻 Основні функції:

- **✍️ Реєстрація та авторизація**:

  - Реєстрація через логін і пароль (credentials).

- **📋🔍 Фільтрування та пошук книг**:

  - Користувачі можуть фільтрувати книги за жанрами.
  - Книги можна буде знайти за автором чи назвою у пошуковій системі.

- **👍❤️ Вподобання**:

  - Можливість поставити вподобання на улюблені книги.
  - Кожну вподобану книгу користувач може переглянути у своєму профілі.

- **💬 Коментарі щодо книг**:

  - Користувачі можуть залишити відгук (або коментар) щодо книги.
  - Користувачі зможуть переглянути опис книги та коментарі інших користувачів щодо неї.

### 💻 Технології

- **⌨️ Backend**:

  - Nest.js
  - MongoDB (база даних)
  - Jest (для тестування)

- **🖥 Frontend**:

  - Next.js
  - Tailwind CSS (для стилізації)
  - TypeScript
  - Jest (для unit та integration тестування)

- **🤖 Інтеграції**:

  - Nodemailer для надсилання повідомлень на пошту (а саме gmail).

Проєкт увесь написаний на TypeScript.

### ✨ Особливості

- [Prettier](https://github.com/tytianiuk/nodebook-web/blob/main/.prettierrc)
- [ESlint](https://github.com/tytianiuk/nodebook-web/blob/main/.eslintrc.json)
- Husky як git-hooks
  - [commit-msg](https://github.com/tytianiuk/nodebook-web/blob/main/.husky/commit-msg)
  - [pre-commit](https://github.com/tytianiuk/nodebook-web/blob/main/.husky/pre-commit)
  - [pre-push](https://github.com/tytianiuk/nodebook-web/blob/main/.husky/pre-push)

### 📈 Діаграма компонентів ([Сачко Максим](https://github.com/tytianiuk/nodebook-web/commit/4ca7181c14a29af55fb7e4ef83095af2328b599b))

![Components diagram](/public/graph.jpeg)

### 📈 Use Case діаграма ([Титянюк Артем](https://github.com/tytianiuk/nodebook-web/commit/e3a61c950b6285439f22dd9126bfe850f129a716))

![Use Case Diagram](/public/use-case-diagram.jpeg)

# Посилання

Посилання на [Back-end](https://github.com/DreammyOleksandr/nodebook-server)

Посилання на [Бібліотеку](https://github.com/SachkoMaxim/nodebook-api-lib)
