#In class assignment
To get started Clone this repo. Then run `npm install`, and, `createdb  crud_database_development`, and `sequelize db:migrate`, and then open the repository with `subl .` then run `nodemon`.
Look in the `index.js` file and use [this mornings](https://github.com/sf-wdi-17/notes/blob/master/lectures/week-03/_4_thursday/dawn/intro_crud_with_sequelize.md) _notes for reference.

1. Clone this repository and change into the direcory it creates by running the commands

```bash
$ git clone https://github.com/sf-wdi-17/intro_crud_with_express.git
$ cd intro_crud_with_express
```

2. If we look inside of the `package.json` file we'll see that all of the dependencies that we'll need are inside.

```js
{
  "name": "crud",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.12.2",
    "ejs": "^2.3.1",
    "express": "^4.12.3",
    "method-override": "^2.3.2",
    "pg": "^4.3.0",
    "pg-hstore": "^2.3.2",
    "sequelize": "^2.0.5",
    "sequelize-cli": "^1.5.0"
  }
}
```

Since all of the dependencies that we'll need are already there, we simply need to run

```bash
$ npm install
```

to download all of the repositories appropriately.

3. Next we'll need to create the database that we're going to be using. If we look in the `config/config.json` file, we'll see

```js
  ...
  "development": {
    "database": "crud_database_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
  ...
```

that the name of the database is `crud_database_development`. To create this database, we run the command

```bash
$ createdb crud_database_development
```

4. Once the database has been created, we'll need to run a migration in order to have our database reflect the `Classmate` model specified in the `models/classmate.js` file.

```js
  var Classmate = sequelize.define("Classmate", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
```

To run the migrate we use the following command:

```bash
$ sequelize db:migrate
```

5. To populate our database with some inital data, we'll need to run the `init.js` file provided. To do this, run the following commmand

```bash
$ node init.js
```

**Note:** The file will hang. To exit type `CONTROL-C`. If you see this, you're all good.

```bash
Executing (default): INSERT INTO "Classmates" ("id","first_name","last_name","age","updatedAt","createdAt") VALUES (DEFAULT,'Mike','Desa',24,'2015-04-03 04:21:37.113 +00:00','2015-04-03 04:21:37.113 +00:00') RETURNING *;
Executing (default): INSERT INTO "Classmates" ("id","first_name","last_name","age","updatedAt","createdAt") VALUES (DEFAULT,'Brett','Levinson',31,'2015-04-03 04:21:37.124 +00:00','2015-04-03 04:21:37.124 +00:00') RETURNING *;
```

6. Next, we'll want to open up the directory with sublime.

```bash
$ subl .
```

