# hbsRegPost
Регистрация с помощью хбс (2ф1н3д)
-``npm init -y ``

- ``git init ( если не клонируется репозиторий)``
- ``npx create-gitignore Node``
- -`` npx eslint --init``
--настройка eslint![[Снимок экрана 2021-12-04 в 14.59.25.png]]
--``touch app.js``
-``mkdir - p src/{db,routes, views}``
--``npm i hbs express morgan sequelize pg pg-hstore``
-``npm i -D sequelize-cli nodemon``
///настраиваем sequelize --->
- идем в документацию секвалайза 
- -идем в миграции 
- копируем название файла и создаем в корне проекта ``.sequelizerc``
- вставляем из документации :
 ``
 const path = require('path'); 
 module.exports = {
 'config': path.resolve('src', 'db', 'config', 'database.json'),
 'models-path': path.resolve('src', 'db', 'models'), 
 'seeders-path': path.resolve('src', 'db', 'seeders'),
 'migrations-path': path.resolve('src', 'db', 'migrations') 
 };
``
-``npx sequelize init ``
-``npx sequelize model:generate --name Post --attributes title:string``
--заходим в postgres 
-создаем базу данных --> ``CREATE DATABASE p2w1d3``
-создаем юзера, если его нет !!! --> ``CREATE USER имя юзера WITH ENCRYPTED PASSWORD 'пароль'``
-выдаем привелегии юзеру на базу данных ``GRANT ALL PRIVILEGES ON DATABASE имя бызы TO имя юзера ``
-поправляем ``config.json``
-идем в модель и в миграцию  для синхронизации , сплитим
![[Снимок экрана 2021-12-04 в 15.19.47.png]]
-npx sequelize db:migrate
// работаем с сервером
-переходи в app.js
![[Снимок экрана 2021-12-04 в 15.21.39.png]]
--создаем hbs-ки в папке views
-создавай layout.hbs
-создавай базовый шаблон разметки
-подключай bootstrap

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```
скрипты:
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
```
![[Снимок экрана 2021-12-04 в 15.42.37.png]]
--server.use(express.json())--> (для фечей) для данных. с заголовками (application/json)(мидлвары , которые срабатывают на данные такого заголовка) 
--server.use(express.urlecoded({extended:true}))--> (для форм дефолтных) 
для заголовков (мидлвары , которые срабатывают на данные такого заголовка) application/x-www-form-urlencoded 

--создаем роутеры
``posts.router``
![[Снимок экрана 2021-12-04 в 15.59.22.png]]
``index.router``
![[Снимок экрана 2021-12-04 в 16.01.11.png]]
Подключаем в app.js и импортируем роуты
![[Снимок экрана 2021-12-04 в 16.03.31.png]]

--начинай писатьт. в хбс
-создавай папку partials
-в апп js подключай partials
![[Снимок экрана 2021-12-04 в 16.24.59.png]]
-в layout подключи parcials
- вставляем и редакируем форму бутстрапа в post.hbs
![[Снимок экрана 2021-12-04 в 16.33.03.png]]
--создаем папку public в корне бнаписав название ``public/js/main.js``
-подключаем мидлвару чтения саттики ``server.use(express.static(path.join(process.ev.PWD, 'public'``
-подключаем в``layout `` скрипт public-a
--в main.js нужно найти форму  , по ее name (лучше искатьт через консоль браузера)
-дом узел лежит в переменной , начинающейся на 	$переменная
-!!прочесть про оператор опциональной последоваттельности
-дата арибуы --> data-пишемЧтоХотим , ищутся с помощью 
[' data-пишемЧтоХотим']
-добавление карточки на фронте , без бызы![[Снимок экрана 2021-12-04 в 17.37.13.png]]
-добаавляем учитывая базу
![](Снимок%20экрана%202021-12-04%20в%2018.35.30.png)
-Меняем роуты
![](Снимок%20экрана%202021-12-04%20в%2018.37.38.png)
сверяем app.js![](Снимок%20экрана%202021-12-04%20в%2018.37.57.png)
