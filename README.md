# Phase 1 Project: Amiibo Creator
Welcome to Amiibo Creator, a frontend web application for submitting and voting on your favorite Amiibos from the Super Smash Bros. series. This app allows you to submit new Amiibos, vote for your favorites, and filter the Amiibos based on different options. Add your best design and earn votes to prepare your Amiibo for production, as well as getting the character into the upcoming Smash Bros. game!

## Functionality
Amiibo Submission: Create new Amiibos by filling out the form with a name, image URL, and a description of the Amiibo's use.

Voting: Cast your vote for your favorite Amiibos by clicking the "VOTE!" button. The app keeps track of the number of votes each Amiibo receives.

Filtering: Sort and display the Amiibos based on different options such as ascending order, descending order, or the default order.

Authorization: Grant access to the Amiibo creation form by clicking the "Grant Access?" button. This feature adds an element of secrecy to the app.

## Installation and Running the JSON Server
To run the Super Secret AmiiBros. app, follow these steps:

Clone the Repository:

bash
Copy SSH code 
git clone [repository-url]

cd phase-1-project

Install Dependencies:
npm install
Run the JSON Server:
json-server --watch db.json
This will start the JSON server, and your Amiibo data will be served from http://localhost:3000/amiibo.

Open the App:
Open index.html in your web browser to launch the Super Secret AmiiBros. app.

## Acknowledgments
Nintendo: Special thanks to Nintendo for providing the Amiibo images used in this app. All images are sourced from Nintendo websites.

## Contributing
Contribute to Super Secret AmiiBros. by submitting bugs, feature requests, or pull requests. Let's make the AmiiBros community even better!

## Navigate the App (Demo)
![Demo](Phase1ProjectGif.gif)
