# NgDemo

  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.2.

  

## Development setup

  

Run `npm install` to download all dependecies.

  

Run `npm run api` for a mock backend server. The api will automatically run on `http://localhost:3000/`.

  

Run `ng serve` for a frontend dev server. Navigate to `http://localhost:4200/`.

  ## Implemented Features
  

 - [x] Upon starting the application, the User List page should show up
 - [x] User List page should show a list of users.
 - [x] User List page should support pagination (10 users per page).
 - [ ] User List page should support ordering by any of the a.m. minimum
       attributes
 - [x] User List page should support filtering by any of the a.m.
       minimum attributes.
 - [x] Every record on the User List page should have an Edit button.
       Clicking on the button should lead to the Edit User page.
 - [x] Edit User page should allow editing of the existing user. First
       name, Last name, email, status fields should be editable. The
       appropriate API method should be called on the Save button click
       event.
 - [x] Every record on the User List page should have a Delete button.
       Clicking on the button should display a modal asking the user,
       firmed, the DELETE API endpoint should be called, and the user
       list updated accordingly.
 - [x] Create User page should allow creating a new user with min. set
       of attributes.
 - [ ] Every record on the User List page should have an Assign button.
       Clicking on the button should lead to the Assign Permission page.
 - [ ] Assign Permission page should allow to add or remove permissions
       for the selected user and call appropriate API

## Further info

  
This aplication uses json-server for backend