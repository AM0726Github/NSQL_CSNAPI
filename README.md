# NSQL_CSNAPI

Backend server and routes with NoSQL Database 

## Video

[![Click link to view video](./Assets/WalkTrough/ScreenShot.gif](https://drive.google.com/file/d/1DVEB6yDok6_ol0Hp_xr-YIsxhuGf7QOv/view)

View video walktrough: [Download Local File](https://github.com/AM0726Github/NSQL_CSNAPI/tree/main/Assets/WalkTrough/NSQL_CSNAPI_Walktrough.mp4)

* [UserStory](#UserStory)
* [Installation](#installation)
* [Usage](#usage)

## UserStory

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation

1. Do `git clone`

This program requires the following packages from npm: 
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)

2. Install Modules

```
npm i
```

## Usage

```
npm start
```
## Made By [Alik Margaryan](https://github.com/AM0726Github)