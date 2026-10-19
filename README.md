# areal-hr_ext - Учёт сотрудников

## Инструментарий

- **ОС:** Windows 11 + WSL2 (Ubuntu)
- **IDE:** Visual Studio Code
- **БД:** PostgreSQL 17 в Docker контейнере
- **Контейнеризация:** Docker Desktop

## Структура проекта

- `/api` — бэкенд (Node.js / NestJS)
- `/app` — фронтенд (Vue.js / Quasar)
- `/containers` — Dockerfile для бэкенда и фронтенда
- `/docs` — документация и схема БД

## Основные команды Git

| Команда | Описание |
|---|---|
| `git init` | Инициализировать репозиторий |
| `git add .` | Добавить все изменения |
| `git commit -m "..."` | Зафиксировать изменения |
| `git push` | Отправить на GitHub |
| `git pull` | Получить изменения с GitHub |
| `git status` | Посмотреть состояние файлов |
| `git log` | История коммитов |
| `git branch` | Список веток |
| `git checkout -b name` | Создать новую ветку |