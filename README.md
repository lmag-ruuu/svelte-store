**Local Development**
--------------------

### Prerequisites
--------------------

* Package managers: [npm](https://www.npmjs.com/), [pnpm](https://pnpm.js.org/) or [yarn](https://yarnpkg.com/)
* Local database:
	+ Redis: [Dragonfly Docker](https://github.com/dragonflyoss/Dragonfly) or [Upstash](https://upstash.com/)
	+ PostgreSQL: [Supabase](https://supabase.io/)
* Environment variables:
	+ `REDIS_URL` for authentication
	+ `DATABASE_URL` for database

### Installing dependencies
-----------------------------

* `pnpm i` (or `npm install` or `yarn install`) to install project dependencies

### Running migrations
---------------------------

* `pnpm db:commit` (or `npm run db:commit` or `yarn db:commit`) to run database migrations

### Starting the project
-------------------------

* `pnpm dev` (or `npm run dev` or `yarn dev`) to start the project in development mode

### Environment variables
------------------------

* `REDIS_URL`: URL of the Redis database for authentication
* `DATABASE_URL`: URL of the PostgreSQL database for the application
