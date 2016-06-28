<p align="center">
  <img width="200px" src="http://cloudrail.github.io/img/cloudrail_logo_github.png"/>
</p>

# CloudRail SI for node.js

Integrate Multiple Services With Just One API

<p align="center">
  <img width="300px" src="http://cloudrail.github.io/img/cloudrail_si_github.png"/>
</p>

CloudRail is a free software library which abstracts multiple APIs from different providers into a single and universal interface.

<p align="center">
  <img width="800px" src="http://cloudrail.github.io/img/available_interfaces_v2.png"/>
</p>

Full documentation can be found at https://docs.cloudrail.com/

With CloudRail, you can easily integrate external APIs into your application. CloudRail is an abstracted interface that takes several services and then gives a developer-friendly API that uses common functions between all providers. This means that, for example, upload() works in exactly the same way for Dropbox as it does for Google Drive, OneDrive, and other Cloud Storage Services, and getEmail() works similarly the same way across all social networks.

## Current Interfaces
Interface | Included Services
--- | ---
Cloud Storage | Dropbox, Google Drive, OneDrive, Box
Social Profiles | Facebook, GitHub, Google+, LinkedIn, Slack, Twitter, Windows Live, Yahoo, Instagram
Payment | PayPal, Stripe
Email | Maljet, Sendgrid
SMS | Twilio, Nexmo
Point of Interest | Google Places, Foursquare, Yelp
---
### Cloud Storage Interface:

* Dropbox
* Box
* Google Drive
* Microsoft OneDrive

#### Features:

* Download files from Cloud Storage.
* Upload files to Cloud Storage.
* Get Meta Data of files, folders and perform all standard operations (copy, move, etc) with them.
* Retrieve user information.

[Full Documentation](https://docs.cloudrail.com/docs/cloud-storage)
#### Code Example:

```` javascript
const services = require("cloudrail-si").services;
// let cs = new services.Box(redirectReceiver, "[clientIdentifier]", "[clientSecret]", "[redirectUri]", "[state]");
// let cs = new services.OneDrive(context, "[clientIdentifier]", "[clientSecret]", "[redirectUri]", "[state]");
// let cs = new services.GoogleDrive(context, "[clientIdentifier]", "[clientSecret]", "[redirectUri]", "[state]");
let cs = new services.Dropbox(context, "[clientIdentifier]", "[clientSecret]", "[redirectUri]", "[state]");

cs.createFolder("/TestFolder", (err) => { // <---
    if (err) throw err;
    let fileStream = fs.createReadStream("UserData.csv");
    let size = fs.statSync("UserData.csv").size;
    cs.upload("/TestFolder/Data.csv", fileStream, size, false, (err) => { // <---
        if (err) throw err;
        console.log("Upload successfully finished");
    });
});

````
---
### Social Media Profiles Interface:

* Facebook
* Github
* Google Plus
* LinkedIn
* Slack
* Twitter
* Windows Live
* Yahoo
* Instagram

#### Features

* Get profile information, including full names, emails, genders, date of birth, and locales.
* Retrieve profile pictures.
* Login using the Social Network.

[Full Documentation](https://docs.cloudrail.com/docs/profile)
#### Code Example:

```` javascript
const services = require("cloudrail-si").services;
// let profile = new services.GooglePlus(redirectReceiver, "[clientIdentifier]", "[clientSecret]", "[redirectUri]", "[state]");
// let profile = new services.GitHub(redirectReceiver, "[clientIdentifier]", "[clientSecret]", "[redirectUri]", "[state]");
// let profile = new services.Slack(redirectReceiver, "[clientIdentifier]", "[clientSecret]", "[redirectUri]", "[state]");
// let profile = new services.Instagram(redirectReceiver, "[clientIdentifier]", "[clientSecret]", "[redirectUri]", "[state]");
// ...
let profile = new services.Facebook(redirectReceiver, "[clientIdentifier]", "[clientSecret]", "[redirectUri]", "[state]");

profile.getFullName((err, fullName) => {
    if (err) throw err;
    console.log("User's full name is " + fullName);
});

profile.getEmail((err, email) => {
    if (err) throw err;
    console.log("User's email address is " + email);
});
````
---
### Payment Interface:

* PayPal
* Stripe

#### Features

* Perform charges
* Refund previously made charges
* Manage subscriptions

[Full Documentation](https://docs.cloudrail.com/docs/payment)
#### Code Example

```` javascript
const services = require("cloudrail-si").services;
const types = require("cloudrail-si").types;
// let payment = new services.Stripe(null, "[secretKey]");
let payment = new services.PayPal(null, true, "[clientIdentifier]", "[clientSecret]");

let source = new types.CreditCard(null, 6, 2021, "xxxxxxxxxxxxxxxx", "visa", "<FirstName>", "<LastName>", null);
payment.createCharge(500, "USD", source, (err, charge) => {
    if (err) throw err;
    console.log("Successfully charged " + charge.amount + " " + charge.currency);
});
````
---
### Email Interface:

* Mailjet
* Sendgrid

#### Features

* Send Email

[Full Documentation](https://docs.cloudrail.com/docs/email)

#### Code Example

````javascript
const services = require("cloudrail-si").services;
// let email = new services.Mailjet(null, "[clientID]", "[clientSecret]");
let email = new services.Sendgrid(null, "[username]", "[password]");

email.sendEmail("info@cloudrail.com", "CloudRail", ["foo@bar.com", "bar@foo.com"], "Welcome", "Hello from CloudRail", null, null, null, (err) => {
    if (err) throw err;
    console.log("Email successfully sent");
});
````
---
### SMS Interface:

* Twilio
* Nexmo

#### Features

* Send SMS

[Full Documentation](https://docs.cloudrail.com/docs/sms)

#### Code Example

````javascript
const services = require("cloudrail-si").services;
// let sms = new services.Nexmo(null, "[clientIdentifier]", "[clientSecret]");
let sms = new services.Twilio(null, "[clientIdentifier]", "[clientSecret]");

sms.sendSMS("CloudRail", "+4912345678", "Hello from CloudRail", (err) => {
    if (err) throw err;
    console.log("SMS successfully sent");
});
````
---
### Points of Interest Interface:

* Google Places
* Foursquare
* Yelp

#### Features

* Get a list of POIs nearby
* Filter by categories or search term

[Full Documentation](https://docs.cloudrail.com/docs/points-of-interest)
#### Code Example

```` javascript
const services = require("cloudrail-si").services;
// let poi = new services.Foursquare(null, "[clientID]", "[clientSecret]");
// let poi = new services.Yelp(null, "[consumerKey]", "[consumerSecret]", "[token]", "[tokenSecret]");
let poi = new services.GooglePlaces(null, "[apiKey]");

poi.getNearbyPOIs(49.4557091, 8.5279138, 1000, "restaurant", null, (err, pois) => {
    if (err) throw err;
    console.log("Amount of locations called 'restaurant' in a 1 km radius around the given coordinates: " + pois.length);
});
````
---
More interfaces are coming soon.

## Advantages of Using CloudRail

* Consistent Interfaces: As functions work the same across all services, you can perform tasks between services simply.

* Easy Authentication: CloudRail includes easy ways to authenticate, to remove one of the biggest hassles of coding for external APIs.

* Switch services instantly: One line of code is needed to set up the service you are using. Changing which service is as simple as changing the name to the one you wish to use.

* Simple Documentation: There is no searching around Stack Overflow for the answer. The CloudRail documentation at https://docs.cloudrail.com/ is regularly updated, clean, and simple to use.

* No Maintenance Times: The CloudRail Libraries are updated when a provider changes their API.

* Direct Data: Everything happens directly in the Library. No data ever passes a CloudRail server.

## NPM

````
npm install cloudrail-si
````

## Typescript

(this only concerns Typescript users)

The package includes an *index.d.ts* file. To use the typings provided, include services and types like so:

```` javascript
/// <reference path="node_modules/cloudrail-si/index.d.ts" />

import {PointsOfInterest} from "cloudrail-si/interfaces/PointsOfInterest";
import {Foursquare} from "cloudrail-si/services/Foursquare";
import {POI} from "cloudrail-si/types/POI";

let poi:PointsOfInterest = new Foursquare(null, "[clientID]", "[clientSecret]");

poi.getNearbyPOIs(49.4557091, 8.5279138, 1000, "restaurant", null, (err:Error, pois:POI[]) => {
    if (err) console.log(err);
    console.log("Amount of locations called 'restaurant' in a 1 km radius around the given coordinates: " + pois.length);
});
````

## Examples

Check out https://github.com/CloudRail/cloudrail-si-node-sdk/tree/master/examples for examples of how to e.g. implement a redirectReceiver and more complex use cases.

## Get Updates

To keep updated with CloudRail, including any new providers that are added, just add your email address to https://cloudrail.com/updates/.

## Pricing

CloudRail is **free to use**. For all projects; **commercial and non-commercial**. We want APIs to be accessible to all developers. We want APIs to be easier to manage. This is only possible if there are free, powerful tools out there to do this. The only favor we are asking for, is to spread the word about this library. Thank you!

CloudRail also has enterprise licensing options. Please contact us for more information: support@cloudrail.com

## Other Platforms

CloudRail is also available for other platforms like Android, iOS and Java. You can find all libraries on https://cloudrail.github.io

## Questions?

Get in touch at any time by emailing us: support@cloudrail.com

or

Tag a question with cloudrail on [StackOverflow](http://stackoverflow.com/questions/tagged/cloudrail)