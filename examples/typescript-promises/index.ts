/**
 * Demonstrates how simple a non-OAuth service can be used. Uses the bundled d.ts file for Typescript.
 * (withPromises == false) shows how to do it the classical way with callbacks and
 * (withPromises == true) shows the more modern approach with Promises
 */

/// <reference path="node_modules/cloudrail-si/index.d.ts" />
/// <reference path="bluebird.d.ts" />

import {Foursquare} from "cloudrail-si/services/Foursquare";
import {POI} from "cloudrail-si/types/POI";
import {Location} from "cloudrail-si/types/Location";
import {PointsOfInterest} from "cloudrail-si/interfaces/PointsOfInterest";
import * as Promise from "bluebird";

const withPromises = true;

if (!withPromises) {
    let service:PointsOfInterest = new Foursquare(undefined, "xxx", "xxx"); // Replace "xxx" with valid credentials

    service.getNearbyPOIs(49.4557091, 8.5279138, 3000, "sparkasse", ["bank"], (err:Error, pois:POI[]) => {
        if (err) console.log(err);
        else printPOIs(pois);
    });
} else {
    let service:any = new Foursquare(undefined, "xxx", "xxx"); // Replace "xxx" with valid credentials

    Promise.promisifyAll(service);

    service.getNearbyPOIsAsync(49.4557091, 8.5279138, 3000, "sparkasse", ["bank"]).then((pois:POI[]) => {
        printPOIs(pois);
    }).catch((err:Error) => {
        console.log(err);
    });
}

function printPOIs(pois:POI[]):void {
    pois.forEach((poi:POI) => {
        let location:Location = poi.location;
        console.log(poi.name + " at " + location.longitude + "/" + location.latitude);
    });
}