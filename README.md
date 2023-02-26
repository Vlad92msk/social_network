[comment]: <> (# Angular NestJS PostgreSQL GraphQL Typeorm Docker)

[comment]: <> (Простое backend приложение на базе NestJS, где в качестве базы данных выступает PostgreSQL, для управления базой)

[comment]: <> (используется TypeORM, в качестве языка запроса у backend используется GraphQL. Все это упаковано в docker-compose)

[comment]: <> (<table width="100%">)

[comment]: <> (  <tr>)

[comment]: <> (    <td align="center" valign="middle" width="17%">)

[comment]: <> (      <a href="https://angular.io/">)

[comment]: <> (        <img height="50" alt="Angular" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png"/>)

[comment]: <> (      </a>)

[comment]: <> (      <br />)

[comment]: <> (      Angular)

[comment]: <> (    </td>)

[comment]: <> (    <td align="center" valign="middle" width="17%">)

[comment]: <> (      <a href="https://nestjs.com/">)

[comment]: <> (        <img height="50" alt="NestJS" src="https://hsto.org/getpro/habr/post_images/d11/98b/ac8/d1198bac8e4ced0d89d5e5983061f418.png"/>)

[comment]: <> (      </a>)

[comment]: <> (      <br />)

[comment]: <> (      NestJS)

[comment]: <> (    </td>)

[comment]: <> (    <td align="center" valign="middle" width="17%">)

[comment]: <> (      <a href="https://www.postgresql.org/">)

[comment]: <> (      <img height="50" alt="PostgresSQL" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png"/>)

[comment]: <> (      </a>)

[comment]: <> (      <br />)

[comment]: <> (      PostgresSQL)

[comment]: <> (    </td>)

[comment]: <> (    <td align="center" valign="middle" width="17%">)

[comment]: <> (      <a href="https://graphql.org/">)

[comment]: <> (      <img height="50" alt="GraphQL" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png"/>)

[comment]: <> (      </a>)

[comment]: <> (      <br />)

[comment]: <> (      GraphQL)

[comment]: <> (    </td>)

[comment]: <> (    <td align="center" valign="middle" width="17%">)

[comment]: <> (      <a href="https://typeorm.io/">)

[comment]: <> (      <img height="50" alt="TypeORM" src="https://www.zoneofit.com/wp-content/uploads/2021/06/type-orm.png"/>)

[comment]: <> (      </a>)

[comment]: <> (      <br />)

[comment]: <> (      TypeORM)

[comment]: <> (    </td>)

[comment]: <> (    <td align="center" valign="middle" width="17%">)

[comment]: <> (      <a href="https://www.docker.com/">)

[comment]: <> (      <img height="50" alt="Docker" src="https://d1.awsstatic.com/acs/characters/Logos/Docker-Logo_Horizontel_279x131.b8a5c41e56b77706656d61080f6a0217a3ba356d.png"/>)

[comment]: <> (      </a>)

[comment]: <> (      <br />)

[comment]: <> (      Docker)

[comment]: <> (    </td>)

[comment]: <> (  </tr>)

[comment]: <> (</table>)

[comment]: <> (## Метод установки и запуска)

[comment]: <> (Скопируйте к себе репозиторий)

[comment]: <> (```shell)

[comment]: <> (git clone https://github.com/mogilevtsevdmitry/angular-nestjs-postgresql-typeorm-graphql-docker.git)

[comment]: <> (```)

[comment]: <> (Создайте в корне репозитория .env файл, например:)

[comment]: <> (```dotenv)

[comment]: <> (API_PORT=3001)

[comment]: <> (API_HOST=http://localhost:)

[comment]: <> (TYPEORM_CONNECTION=postgres)

[comment]: <> (TYPEORM_USERNAME=admin)

[comment]: <> (TYPEORM_PASSWORD=123456)

[comment]: <> (TYPEORM_DATABASE=lesson1)

[comment]: <> (TYPEORM_PORT=5432)

[comment]: <> (TYPEORM_HOST=localhost)

[comment]: <> (```)

[comment]: <> (### С использованием Docker)

[comment]: <> (Убедитесь что у вас установлен Docker &#40;Docker не поддерживается семейством операционных систем Windows, за исключением)

[comment]: <> (Windows-Professional или Корпоративная, т.к. для работы необходим Hyper-V, о чем сказано на сайте)

[comment]: <> (в [документации]&#40;https://docs.microsoft.com/ru-ru/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#check-requirements&#41;)

[comment]: <> (Microsoft&#41;)

[comment]: <> (Выполните команду:)

[comment]: <> (```shell)

[comment]: <> (docker-compose up)

[comment]: <> (# -d - для запуска в фоне)

[comment]: <> (# --build - для повторной пересборки контейнеров)

[comment]: <> (```)

[comment]: <> (### Без Docker)

[comment]: <> (- Установите к себе PostgreSQL с официального [сайта]&#40;https://www.postgresql.org/&#41;)

[comment]: <> (- Создайте экземпляр сервера и базу данных, добавьте пользователя и пароль как указано в .env файле)

[comment]: <> (- Убедитесь что postgreSQL запущен и работает)

[comment]: <> (- Выполните установку зависимостей)

[comment]: <> (### Backend)

[comment]: <> (```shell)

[comment]: <> (cd server/)

[comment]: <> (# yarn package manager)

[comment]: <> (yarn install)

[comment]: <> (yarn start)

[comment]: <> (# npm package manager)

[comment]: <> (npm install)

[comment]: <> (npm run start)

[comment]: <> (```)

[comment]: <> (### Frontend)

[comment]: <> (```shell)

[comment]: <> (cd frontend/)

[comment]: <> (# yarn package manager)

[comment]: <> (yarn install)

[comment]: <> (yarn start)

[comment]: <> (# npm package manager)

[comment]: <> (npm install)

[comment]: <> (npm run start)

[comment]: <> (```)
