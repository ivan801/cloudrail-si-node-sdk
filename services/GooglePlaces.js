"use strict";
const Interpreter_1 = require("../servicecode/Interpreter");
const Sandbox_1 = require("../servicecode/Sandbox");
const ErrorType_1 = require("../types/ErrorType");
const DetailErrors_1 = require("../errors/DetailErrors");
const InitSelfTest_1 = require("../servicecode/InitSelfTest");
const SERVICE_CODE = {
    "init": [
        ["create", "$P0.crToPlaces", "Object"],
        ["create", "$P0.placesToCr", "Object"],
        ["callFunc", "addCategory", "$P0", "airport", "airport"],
        ["callFunc", "addCategory", "$P0", "amusement_park", "amusement_park"],
        ["callFunc", "addCategory", "$P0", "aquarium", "aquarium"],
        ["callFunc", "addCategory", "$P0", "art_gallery", "art_gallery"],
        ["callFunc", "addCategory", "$P0", "bakery", "bakery"],
        ["callFunc", "addCategory", "$P0", "bank", "bank"],
        ["callFunc", "addCategory", "$P0", "bar", "bar"],
        ["callFunc", "addCategory", "$P0", "beauty_salon", "beauty_salon"],
        ["callFunc", "addCategory", "$P0", "bicycle_store", "bicycle_store"],
        ["callFunc", "addCategory", "$P0", "book_store", "book_store"],
        ["callFunc", "addCategory", "$P0", "bowling_alley", "bowling_alley"],
        ["callFunc", "addCategory", "$P0", "bus_station", "bus_station"],
        ["callFunc", "addCategory", "$P0", "cafe", "cafe"],
        ["callFunc", "addCategory", "$P0", "car_dealer", "car_dealer"],
        ["callFunc", "addCategory", "$P0", "car_rental", "car_rental"],
        ["callFunc", "addCategory", "$P0", "car_wash", "car_wash"],
        ["callFunc", "addCategory", "$P0", "casino", "casino"],
        ["callFunc", "addCategory", "$P0", "cemetery", "cemetery"],
        ["callFunc", "addCategory", "$P0", "church", "church"],
        ["callFunc", "addCategory", "$P0", "clothing_store", "clothing_store"],
        ["callFunc", "addCategory", "$P0", "convenience_store", "convenience_store"],
        ["callFunc", "addCategory", "$P0", "courthouse", "courthouse"],
        ["callFunc", "addCategory", "$P0", "dentist", "dentist"],
        ["callFunc", "addCategory", "$P0", "department_store", "department_store"],
        ["callFunc", "addCategory", "$P0", "doctor", "doctor"],
        ["callFunc", "addCategory", "$P0", "electronics_store", "electronics_store"],
        ["callFunc", "addCategory", "$P0", "embassy", "embassy"],
        ["callFunc", "addCategory", "$P0", "finance", "finance"],
        ["callFunc", "addCategory", "$P0", "fire_station", "fire_station"],
        ["callFunc", "addCategory", "$P0", "florist", "florist"],
        ["callFunc", "addCategory", "$P0", "food", "food"],
        ["callFunc", "addCategory", "$P0", "funeral_home", "funeral_home"],
        ["callFunc", "addCategory", "$P0", "furniture_store", "furniture_store"],
        ["callFunc", "addCategory", "$P0", "gas_station", "gas_station"],
        ["callFunc", "addCategory", "$P0", "grocery_or_supermarket", "grocery_or_supermarket"],
        ["callFunc", "addCategory", "$P0", "gym", "gym"],
        ["callFunc", "addCategory", "$P0", "hardware_store", "hardware_store"],
        ["callFunc", "addCategory", "$P0", "health", "health"],
        ["callFunc", "addCategory", "$P0", "hindu_temple", "hindu_temple"],
        ["callFunc", "addCategory", "$P0", "hospital", "hospital"],
        ["callFunc", "addCategory", "$P0", "jewelry_store", "jewelry_store"],
        ["callFunc", "addCategory", "$P0", "laundry", "laundry"],
        ["callFunc", "addCategory", "$P0", "lawyer", "lawyer"],
        ["callFunc", "addCategory", "$P0", "library", "library"],
        ["callFunc", "addCategory", "$P0", "locksmith", "locksmith"],
        ["callFunc", "addCategory", "$P0", "mosque", "mosque"],
        ["callFunc", "addCategory", "$P0", "movie_theater", "movie_theater"],
        ["callFunc", "addCategory", "$P0", "museum", "museum"],
        ["callFunc", "addCategory", "$P0", "night_club", "night_club"],
        ["callFunc", "addCategory", "$P0", "parks", "parks"],
        ["callFunc", "addCategory", "$P0", "parking", "parking"],
        ["callFunc", "addCategory", "$P0", "pet_store", "pet_store"],
        ["callFunc", "addCategory", "$P0", "pharmacy", "pharmacy"],
        ["callFunc", "addCategory", "$P0", "physiotherapist", "physiotherapist"],
        ["callFunc", "addCategory", "$P0", "police", "police"],
        ["callFunc", "addCategory", "$P0", "post_office", "post_office"],
        ["callFunc", "addCategory", "$P0", "real_estate_agency", "real_estate_agency"],
        ["callFunc", "addCategory", "$P0", "restaurant", "restaurant"],
        ["callFunc", "addCategory", "$P0", "rv_park", "rv_park"],
        ["callFunc", "addCategory", "$P0", "school", "school"],
        ["callFunc", "addCategory", "$P0", "shoe_store", "shoe_store"],
        ["callFunc", "addCategory", "$P0", "shopping_mall", "shopping_mall"],
        ["callFunc", "addCategory", "$P0", "spa", "spa"],
        ["callFunc", "addCategory", "$P0", "stadium", "stadium"],
        ["callFunc", "addCategory", "$P0", "synagogue", "synagogue"],
        ["callFunc", "addCategory", "$P0", "taxi_stand", "taxi_stand"],
        ["callFunc", "addCategory", "$P0", "train_station", "train_station"],
        ["callFunc", "addCategory", "$P0", "travel_agency", "travel_agency"],
        ["callFunc", "addCategory", "$P0", "university", "university"],
        ["callFunc", "addCategory", "$P0", "veterinary_care", "veterinary_care"],
        ["callFunc", "addCategory", "$P0", "zoo", "zoo"]
    ],
    "getNearbyPOIs": [
        ["callFunc", "checkNull", "$P0", "$P2", "Latitude"],
        ["callFunc", "checkNull", "$P0", "$P3", "Longitude"],
        ["callFunc", "checkNull", "$P0", "$P4", "Radius"],
        ["callFunc", "checkLessThan", "$P0", "$P2", -90, "Latitude"],
        ["callFunc", "checkLessThan", "$P0", "$P3", -180, "Longitude"],
        ["callFunc", "checkLessThan", "$P0", "$P4", 0, "Radius"],
        ["callFunc", "checkGreaterThan", "$P0", "$P2", 90, "Latitude"],
        ["callFunc", "checkGreaterThan", "$P0", "$P3", 180, "Longitude"],
        ["callFunc", "checkGreaterThan", "$P0", "$P4", 40000, "Radius"],
        ["if!=than", "$P6", null, 1],
        ["callFunc", "checkIsEmpty", "$P0", "$P6", "Categories"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["create", "$L1", "String", "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"],
        ["string.concat", "$L1", "$L1", "key=", "$P0.apiKey"],
        ["string.concat", "$L2", "$P2", ",", "$P3"],
        ["string.urlEncode", "$L2", "$L2"],
        ["string.concat", "$L1", "$L1", "&location=", "$L2"],
        ["string.concat", "$L1", "$L1", "&radius=", "$P4"],
        ["if!=than", "$P5", null, 2],
        ["string.urlEncode", "$L2", "$P5"],
        ["string.concat", "$L1", "$L1", "&keyword=", "$L2"],
        ["if!=than", "$P6", null, 3],
        ["callFunc", "getCategoriesString", "$P0", "$L2", "$P6"],
        ["string.urlEncode", "$L2", "$L2"],
        ["string.concat", "$L1", "$L1", "&types=", "$L2"],
        ["set", "$L0.url", "$L1"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "checkHttpResponse", "$P0", "$L2"],
        ["json.parse", "$L3", "$L2.responseBody"],
        ["create", "$P1", "Array"],
        ["create", "$L4", "Number", 0],
        ["size", "$L5", "$L3.results"],
        ["if<than", "$L4", "$L5", 5],
        ["get", "$L6", "$L3.results", "$L4"],
        ["callFunc", "extractPOI", "$P0", "$L7", "$L6"],
        ["push", "$P1", "$L7"],
        ["math.add", "$L4", "$L4", 1],
        ["jumpRel", -6]
    ],
    "checkNull": [
        ["if==than", "$P1", null, 3],
        ["string.concat", "$L0", "$P2", " is not allowed to be null."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkLessThan": [
        ["if<than", "$P1", "$P2", 3],
        ["string.concat", "$L0", "$P3", " is not allowed to be less than ", "$P2", "."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkGreaterThan": [
        ["if>than", "$P1", "$P2", 3],
        ["string.concat", "$L0", "$P3", " is not allowed to be greater than ", "$P2", "."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkIsEmpty": [
        ["size", "$L0", "$P2"],
        ["if==than", "$L0", 0, 3],
        ["string.concat", "$L0", "$P3", " is not allowed to be empty."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkHttpResponse": [
        ["if>=than", "$P1.code", 400, 3],
        ["json.parse", "$L0", "$P1.responseBody"],
        ["create", "$L1", "Error", "$L0.error.description", "Http"],
        ["throwError", "$L1"]
    ],
    "getCategoriesString": [
        ["create", "$P1", "String"],
        ["create", "$L0", "Number", 0],
        ["size", "$L1", "$P2"],
        ["if<than", "$L0", "$L1", 10],
        ["get", "$L2", "$P2", "$L0"],
        ["get", "$L2", "$P0.crToPlaces", "$L2"],
        ["if==than", "$L2", null, 2],
        ["create", "$L3", "Error", "Unknown category.", "IllegalArgument"],
        ["throwError", "$L3"],
        ["if!=than", "$L0", 0, 1],
        ["string.concat", "$P1", "$P1", "|"],
        ["string.concat", "$P1", "$P1", "$L2"],
        ["math.add", "$L0", "$L0", 1],
        ["jumpRel", -11]
    ],
    "extractPOI": [
        ["create", "$L0", "Array"],
        ["create", "$L1", "Number", 0],
        ["size", "$L2", "$P2.types"],
        ["if<than", "$L1", "$L2", 6],
        ["get", "$L3", "$P2.types", "$L1"],
        ["get", "$L4", "$P0.placesToCr", "$L3"],
        ["if!=than", "$L4", null, 1],
        ["push", "$L0", "$L4"],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -7],
        ["create", "$L1", "Location"],
        ["set", "$L1.latitude", "$P2.geometry.location.lat"],
        ["set", "$L1.longitude", "$P2.geometry.location.lng"],
        ["if!=than", "$P2.photos", null, 3],
        ["get", "$L2", "$P2.photos", 0],
        ["get", "$L3", "$L2.photo_reference"],
        ["string.concat", "$L4", "https://maps.googleapis.com/maps/api/place/photo?key=", "$P0.apiKey", "&photoreference=", "$L3", "&maxheight=", "$L2.height"],
        ["create", "$P1", "POI", "$L0", "$L4", "$L1", "$P2.name", null]
    ],
    "addCategory": [
        ["set", "$P0.crToPlaces", "$P2", "$P1"],
        ["set", "$P0.placesToCr", "$P1", "$P2"]
    ]
};
class GooglePlaces {
    constructor(redirectReceiver, apiKey) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("GooglePlaces");
        this.interpreterStorage["apiKey"] = apiKey;
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    getNearbyPOIs(latitude, longitude, radius, searchTerm, categories, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getNearbyPOIs", this.interpreterStorage, null, latitude, longitude, radius, searchTerm, categories).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    saveAsString() {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    }
    loadAsString(savedState) {
        let sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        let ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    }
    resumeLogin(executionState, callback) {
        let sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        let ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(() => callback(), err => callback(err));
    }
}
exports.GooglePlaces = GooglePlaces;
