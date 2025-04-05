# Laravel React CRUD Application

A full-stack CRUD application built with Laravel (PHP) backend and React (TypeScript) frontend, using Inertia.js for seamless integration.

## Features

- User authentication (login, registration, password reset)
- Post management (CRUD operations)
- User profile settings
- Responsive UI with dark/light mode support
- Form validation
- CSRF protection

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 18, TypeScript
- **Integration**: Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL (configured in .env)
- **Build**: Vite

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   composer install
   npm install
   ```
3. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```
4. Generate application key:
   ```bash
   php artisan key:generate
   ```
5. Configure database in `.env`:
   ```
   DB_DATABASE=laravel_react_crud
   DB_USERNAME=root
   DB_PASSWORD=
   ```
6. Run migrations:
   ```bash
   php artisan migrate
   ```
7. Build assets:
   ```bash
   npm run build
   ```

## Development

- Start Laravel development server:
  ```bash
  php artisan serve
  ```
- Start Vite dev server (for HMR):
  ```bash
  npm run dev
  ```
- Run tests:
  ```bash
  php artisan test
  ```

## Project Structure

- `app/Http/Controllers` - Laravel controllers
- `resources/js` - React components and pages
- `routes/web.php` - Main application routes
- `database/migrations` - Database schema

## License

MIT
