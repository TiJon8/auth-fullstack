# Auth Fullstack App

Этот проект — минималистичная, но расширяемая система аутентификации.
Состоит из серверной части ([NestJS](https://nestjs.com/)) и клиентской ([Next.js](https://nextjs.org/)). Подходит как база для учебных или реальных pet-проектов.

## 🚀 Стек технологий

### Backend (NestJS)

 - Сессии (cookie-based auth)

 - Credentials auth (email + пароль)

 - OAuth (Google, GitHub)

 - Интеграция кодов подтверждения по email

 - Восстановление и обновление пароля

 - Двухфакторная аутентификация (2FA)

### Frontend (Next.js)

 - Структура FSD

 - Управление формами через react-hook-form

 - Серверные запросы через TanStack Query

 - Набор хуков для аутентификации

## 📂 Структура проекта

```yaml
auth-app:
	auth-server/ # Backend (auth API)
	auth-client/ # Frontend 
```

## ⚙️ Запуск проекта

### Клонируем репозиторий

```bash
git clone https://github.com/TiJon8/auth-fullstack.git
cd auth-fullstack
```

Перед запуском создайте .env файлы в auth-client и auth-server используя за основу .env.example шаблоны

### Поднимаем backend

```bash
cd auth-server
npm install
npm run start:dev
```

По умолчанию сервер стартует на http://localhost:4000

### Поднимаем frontend

```bash
cd client
npm install
npm run dev
```

Клиент доступен по адресу http://localhost:3000

Так же необходимо запустить докер контейнеры для postgres и redis

```bash
cd auth-server
docker-compose up -d
```

## 📚 Полезные ссылки

 - [NestJS Docs](https://docs.nestjs.com/)

 - [Next.js Docs](https://nextjs.org/docs)

 - [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)

 - [React Hook Form](https://react-hook-form.com/get-started)