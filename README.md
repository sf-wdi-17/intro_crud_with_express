**NOTE:** There is a completed version of the code on the `complete` branch. It can be found [HERE](https://github.com/sf-wdi-17/intro_crud_with_express/tree/complete).

#In class assignment
To get started Clone this repo. Then run `npm install`, and, `createdb  crud_database_development`, and `sequelize db:migrate`, and then open the repository with `subl .` then run `nodemon`.
Look in the `index.js` file and use [this mornings](https://github.com/sf-wdi-17/notes/blob/master/lectures/week-03/_4_thursday/dawn/intro_crud_with_sequelize.md) _notes for reference.

**1.** Clone this repository and change into the direcory it creates by running the commands

```bash
$ git clone https://github.com/sf-wdi-17/intro_crud_with_express.git
$ cd intro_crud_with_express
```

**2.** If we look inside of the `package.json` file we'll see that all of the dependencies that we'll need are inside.

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

**3.** Next we'll need to create the database that we're going to be using. If we look in the `config/config.json` file, we'll see

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

**4.** Once the database has been created, we'll need to run a migration in order to have our database reflect the `Classmate` model specified in the `models/classmate.js` file.

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

**5.** To populate our database with some inital data, we'll need to run the `init.js` file provided. To do this, run the following commmand

```bash
$ node init.js
```

**Note:** The file will hang. To exit type `CONTROL-C`. If you see this, you're all good.

```bash
Executing (default): INSERT INTO "Classmates" ("id","first_name","last_name","age","updatedAt","createdAt") VALUES (DEFAULT,'Mike','Desa',24,'2015-04-03 04:21:37.113 +00:00','2015-04-03 04:21:37.113 +00:00') RETURNING *;
Executing (default): INSERT INTO "Classmates" ("id","first_name","last_name","age","updatedAt","createdAt") VALUES (DEFAULT,'Brett','Levinson',31,'2015-04-03 04:21:37.124 +00:00','2015-04-03 04:21:37.124 +00:00') RETURNING *;
```

**6.** Next, we'll want to open up the directory with sublime.

```bash
$ subl .
```

## A Summary of the files
In the `index.js` file, there are 5 `GET` routes. Each `GET` route has an associated view in the `views` folder.

### GET /classmates
This route will be used to display all of the classmates that are currently in our data base. The `/classmates` route renders the `views/classmates.ejs` view. The ejs view iterates over an array `peers` that is provided when the view is rendered, creates a div with each mates first name.

```html
<!DOCTYPE HTML>
<html>
<body>
  <h1>Classmates:</h1>
  <% peers.forEach(function(mate) { %>
  <div>
    <%= mate.first_name %>
  </div>
  <% }) %>
</body>
</html>
```

At the moment, the `peers` array we provide the `res.render` function is empty.

```js
app.get('/classmates', function(req,res) {
  res.render('classmates', {peers: []});
});
```
We'll want to modify this route to use the `db.Classmate.all()` method to grab all of the classmates and then pass the results on to the `res.render` method. Doing so yields the following.

```js
app.get('/classmates', function(req,res) {
  db.Classmate.all().then(function(mates){
    res.render('classmates', {peers: mates});
  })
});
```

**Note:** The big differences here are that we use the `.then` promise with the `.all` method, and in that promise, we render the `classmates` view with all of the `mates` that we found with the `.all` method.

#### Open up a Browser and go to localhost:3000/classmates
We should see a list of some classmates first names

### GET /classmates/new
This route will be used to a form creating a new classmate. For the sake of simplicity, the the form that is rendered will only have two fields, `first_name` _and `age`. The route simply renders the `views/new.ejs` file.

```html
<!DOCTYPE HTML>
<html>
<body>
  <h1>Classmates new:</h1>
  <!-- Note that when submitted, the form
       sends a POST request to the /classmates
       route -->
  <form method="POST" action="/classmates">
    <input type="text" name="first_name">
    <input type="number" name="age">
    <button type="submit">Submit</button>
  </form>

</body>
</html>
```

The corresponding route in our `index.js` file is

```js
app.get('/classmates/new', function(req,res) {

  res.render('new');
});
```
It doesn't need to be changed at all. However, we will need to update the `POST` request so that we can add a classmate to the database appropriately. To do this we'll need to use the `db.Classmate.create` method. Current;y the `POST` request in place, simply redirects any request that comes in to the `/classmates` path.

```js
app.post('/classmates', function(req,res) {

  res.redirect('/classmates');
});
```

Will become

```js
app.post('/classmates', function(req,res) {
  var name = req.body.first_name;
  var age = req.body.age;

  db.Classmate.create({first_name: name, age: age})
              .then(function(mate) {
                res.redirect('/classmates');
              });
});
```
#### Go to localhost:3000/classmates/new
We should see a form, and when filled out and submitted, we should be redirected to the `localhost:/classmates` page, where we should see the newly added classmate on our list.

### GET /classmates/:id
This route will be used to display the classmate with a given `id`. It renders the view in the `views/classmate.ejs` template file. The `classmate.ejs` template file displays the classmates first name and provides a buttonthat can be used to delete the classmate.

```html
<!DOCTYPE HTML>
<html>
<body>
  <h1>Classmate:</h1>
  <div>
    <%= mate.first_name %>
  </div>
  <form method="POST" action="/classmates/<%= id %>?_method=DELETE">
      <button type="submit">Delete Classmate</button>
    </form>
</body>
</html>
```
The corresponding `GET` route for `/classmates/:id` changes from simply rendering the `classmate` template with an empty `mate` and `id` set to the request URL id Parameter, to finding the mate with the `id` provided in the URL. The old route goes from

```js
app.get('/classmates/:id', function(req,res) {

  res.render('classmate', {mate: {},id: req.params.id });
});
```
to using `db.Classmate.find` to find the appropriate classmate, and then render then render the view appropirately.

```js
app.get('/classmates/:id', function(req,res) {
  var mateId = req.params.id;
  db.Classmate.find(mateId)
              .then(function(buddy) {
                res.render('classmate', {mate: buddy,id: mateId});
              });
});
```

#### Now we should be able to go localhost:3000/classmates/2
And we should see the mates first name with a delete button

### GET /classmates/:id/edit
This route renders the `views/edit.ejs` template. It provides a form, much like the one found in the `views/new.ejs` template. The main difference between the two is that the form on the `view/edit.ejs` template uses the method override attribute for `PUT`.

```html
<!DOCTYPE HTML>
<html>
<body>
  <h1>Classmates edit:</h1>
  <form method="POST" action="/classmates/<%=id%>?_method=PUT">
    <input type="text" name="first_name">
    <input type="number" name="age">
    <button type="submit">Submit</button>
  </form>

</body>
</html>
```
We'll want to populate the edit form with the values that are currently in our database, to do this we'll have to modify our get route approptiately. So instea of 
```js
app.get('/classmates/:id/edit', function(req,res) {

  res.render('edit', {id: req.params.id});
});
```
we'll need something much like the `GET` route for `/classmates/:id`, where we use `db.Classmate.find` to find the user, and then pass the appropriate values onto the `res.render` function.
```js
app.get('/classmates/:id/edit', function(req,res) {
  var mateId = req.params.id;
  db.Classmate.find(mateId)
              .then(function(buddy) {
                res.render('edit', {mate: buddy,id: mateId});
              });
});
```
Then in our we'll need to update our `PUT` `/classmates/:id` to first find the classmate with the given URL param `id` and the `.updateAttributes` method inside of our `db.Classmate.find` promise. Doing this would change the put route from
```js
app.put('/classmates/:id', function(req,res) {

  res.redirect('/classmates');
});
```
to something like this
```js
app.put('/classmates/:id', function(req,res) {
  var mateId = req.params.id;
  var name = req.body.first_name;
  var age = req.body.age;
  db.Classmate.find(mateId)
              .then(function(mate){
                mate.updateAttributes({
                  first_name: name,
                  age: age})
                .then(function(savedMate) {
                  res.redirect('/classmates/'+mateId);
                });
              });
});
```
#### Finally checkout localhost:3000/classmates/2/edit
Everything should be good

### Only one thing left DELETE /classmate/:id
The delete route is much like the PUT route. It goes from
```js
app.delete('/classmates/:id', function(req,res) {

  res.redirect('/classmates');
});
```
to
```js
app.delete('/classmates/:id', function(req,res) {
  var mateId = req.params.id;
  db.Classmate.find(mateId)
              .then(function(mate){
                mate.destroy()
                .then(function() {
                  res.redirect('/classmates');
                });
              });
});
```

Now everything should work.
