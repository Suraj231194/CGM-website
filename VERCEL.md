# Vercel deployment

Deploy this repository as a Vercel project from the repository root. The PHP function uses `vercel-php@0.8.0` (PHP 8.4). The committed `public/build` directory contains the Vite assets served by Vercel.

Set these production environment variables in Vercel:

```text
APP_NAME=biogenixCGM
APP_ENV=production
APP_DEBUG=false
APP_KEY=<generate with php artisan key:generate --show>
APP_URL=https://<your-vercel-domain>
DB_CONNECTION=mysql
DB_HOST=<external-database-host>
DB_PORT=3306
DB_DATABASE=<database-name>
DB_USERNAME=<database-user>
DB_PASSWORD=<database-password>
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=sync
LOG_CHANNEL=stderr
```

Use an external MySQL or PostgreSQL database. For PostgreSQL, set `DB_CONNECTION=pgsql` and `DB_PORT=5432`. Run `php artisan migrate --force` and `php artisan db:seed --force` against that database before using the site. Create an administrator account with a unique password after seeding; the demo users are only created in local and test environments. SQLite in a Vercel function is not persistent.

The app currently stores admin product, payment QR, and support ticket images on the local `public` disk. Vercel function storage is temporary, so those uploads require persistent object storage before they can be used reliably in production.
