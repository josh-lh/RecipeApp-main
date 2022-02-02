# Recipe app
## Introduction
First off, thanks for reviewing the code, all feedback and criticism is appreciated. A few remarks:
1. First time using mongo. When I do this again in the future, I would probably spend more time learning how to debug mongoclient as I was struggling to get the search regex working despite following documentation. That meant that I had to improvise on the search and pushed search logic to front end instead (not something I would usually do).
2. First time using typescript in a project. It wasn't too bad but please let me know if you spot any glaring issues/things I have missed.
3. First time using cypress, I ran out of time to implement this as cleanly as I would like (see comments in e2e).
4. Not got too much experience at the moment with docker other than using the containers locally where I currently work. In the end I couldn't get docker to work with my updates to api (same issues as discussed in previous email). That being said, you will need to run the makefile in order to build mongo.

## How to run the app

Open a terminal and run the following command to spin up the API and React UI

```
make install docker
```

N.B. when working on this, I would keep mongo image running in docker but then run the api/ui locally. You may need to tweak .env in api and baseurl.ts in ui if not using localhost.


_Navigate to http://localhost:3000 to view the UI_

## How to run the tests

Run the following command in a separate terminal (You must have your UI and API running)

```
npm run e2e
```

## Build an app for a chef to store their favorite recipes.
Ideal tech stack:
- Typescript :heavy_check_mark:
- React :heavy_check_mark:
- Cypress :heavy_check_mark:
- Docker kinda :heavy_check_mark:

## Non-functional requirements
- Run the whole stack with `make install docker`
- Data is persisted when database is stopped and started :heavy_check_mark:
- End to end tests demonstrate acceptance criteria has been implemented :heavy_check_mark:


## Saving favorite recipes :heavy_check_mark:
### User story 1 
As a chef
I want to save my favorite recipes\
So that I can cook them another time

### Acceptance criteria 1
Given I have a new recipe\
When I add the new recipe name\
And ingredients\
And measurements\
And cooking method\
Then the new recipe is saved for later
 
## Searching favorite recipes by name :heavy_check_mark:
### User story 2
As a chef\
I want to search for my favorite recipe\
So that I can cook it

### Acceptance criteria 2
Given I want to look for a recipe\
When I search by the name of the recipe\
Then I find the recipe\
And I can see the ingredients\
And I can see the cooking methods
 
## Searching favorite recipes by ingredients (Optional) :heavy_check_mark:
### User story 3
As a chef\
I want to search for my favorite recipe by ingredient\
So that I can cook it

### Acceptance criteria 3
Given I want to look for a recipe by ingredients\
When I search by the ingredient of the recipe\
Then I find the recipe\
And I can see the ingredients\
And I can see the cooking methods

## Bonus points (Optional)
1. Continuous integration
2. App deployment
