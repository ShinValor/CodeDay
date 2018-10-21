# PieceMeal

#### Introduction
Anyone who cooks or bakes knows that often times it will takes a while to find a recipe which contains ingredients one currently has at home. Sometimes you also have to spend some time looking up substitutions for ingredients because you just can’t find a recipe that includes only ingredients that you have on hand. Imagine if you could just click on any item in the ingredient list and a small bubble would pop up, listing a few possible substitutions! This is the main idea behind our project. To our knowledge, nothing of the sort currently exists; we are attempting to build a solution which has not yet been created. We have two possible models for version one. The first requires the user to search for a recipe from within our web app, which would fetch a matching option from the API. Then, from within our web app the user would be able to see substitutions for the ingredients, as described above. The second model is a ‘bookmarklet’ script which injects our code into any webpage, thus enabling our feature to work with any recipe a user may choose. We also have thought of various additions that could be added to possible future versions, such as information on cooking terms (for example, if you click on ‘saute’ a bubble will pop up and explain what that means), an option for the user to add substitutions that may be missing from our database, a way for a user to sign into an account and save recipes to create a virtual cookbook, etc. 
 
#### User-Types 
There is really only one user type for our project- the cook. (We would also probably maintain an Administrator to keep control of the database. Other than that there are no other user types because the user isn’t interacting with anyone else; every user of our app is in the same type of user position.) 
 
#### User Stories 
As a cook I can easily find substitutes for ingredients I may not have at home. As a user I can stay within my recipe page without having to look up any substitutions. In the case of the API model, user can look up recipes based on keywords. 

#### Future Development 
As a user I can learn what a cooking term means easily by clicking on it. As a user I can save all my favorite recipes to my virtual cookbook and retrieve them at any time. 

### Specifications
React.js
Express.js
Node.js
Spoonacular API
Ingredients Substitution Chart
Postgresql
(Maybe Websockets) IDK HOW REACT WORKS 


### React
To be continued ...


### Express
To be continued ...


### Node
To be continued ...


### API:
https://spoonacular.com/food-api


### Ingredients substitutions
https://www.myrecipes.com/how-to/ingredient-substitutions


### Postgresql Database

#### Create your DB user
```
sudo su - postgres
createuser -P -s -e UBUNTU_USERNAME
```
Exit after this one time step, you won't need the sudo commands to create more databases and database users.

#### Creating Databases for my projects:
The postgres server runs in the background and can serve multiple databases for your different projects. Anytime you start a new project, the first thing you'll want to do is setup a database. You can use the following commands to create users and databases using postgres' command line utilities createuser and createdb.

#### Createuser
While you don't need a separate user for each project, it is a good idea to create separate users. You can do that as follows:
```
$ createuser -P -s -e db_username
```
This command creates a new postgres user called db_username with super privileges and prompts for a password. You can find out about more options using the man createuser command.

#### Createdb
Each project will need a separate database. You can create the database as follows:
```
$ createdb -h localhost -U db_username MYAPPNAME_development
```
This command creates a database named MYAPPNAME_development that is owned by db_username and can only be accessed via localhost

You should change MYAPPNAME to your project name
It is good practice to add `_development` or `_production` so that we know if the database contains dev data or customer data.
You will need the database name, username, and password to connect your apps to the database.

#### Import Database
```
psql -U username dbname < dbexport.pgsql 
```

#### Export Database
```
psql -U username dbname > dbexport.pgsql
```


### Contributors
- Ho Ming Poon
- Sora Greenberger
- Excel Espina