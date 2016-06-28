"use strict";
const Interpreter_1 = require("../servicecode/Interpreter");
const Sandbox_1 = require("../servicecode/Sandbox");
const ErrorType_1 = require("../types/ErrorType");
const DetailErrors_1 = require("../errors/DetailErrors");
const InitSelfTest_1 = require("../servicecode/InitSelfTest");
const SERVICE_CODE = {
    "init": [
        ["create", "$P0.crToYelp", "Object"],
        ["create", "$P0.yelpToCr", "Object"],
        ["callFunc", "addCategory", "$P0", "airport", "airports"],
        ["callFunc", "addCategory", "$P0", "amusement_park", "amusementparks"],
        ["callFunc", "addCategory", "$P0", "aquarium", "aquariums"],
        ["callFunc", "addCategory", "$P0", "art_gallery", "galleries"],
        ["callFunc", "addCategory", "$P0", "bakery", "bakeries"],
        ["callFunc", "addCategory", "$P0", "bank", "banks"],
        ["callFunc", "addCategory", "$P0", "bar", "bars"],
        ["callFunc", "addCategory", "$P0", "beauty_salon", "beautysvc"],
        ["callFunc", "addCategory", "$P0", "bicycle_store", "bicycles"],
        ["callFunc", "addCategory", "$P0", "book_store", "bookstores"],
        ["callFunc", "addCategory", "$P0", "bowling_alley", "bowling"],
        ["callFunc", "addCategory", "$P0", "bus_station", "buses"],
        ["callFunc", "addCategory", "$P0", "cafe", "cafes"],
        ["callFunc", "addCategory", "$P0", "car_dealer", "car_dealers"],
        ["callFunc", "addCategory", "$P0", "car_rental", "carrental"],
        ["callFunc", "addCategory", "$P0", "car_wash", "carwash"],
        ["callFunc", "addCategory", "$P0", "casino", "casinos"],
        ["callFunc", "addCategory", "$P0", "cemetery", "funeralservices"],
        ["callFunc", "addCategory", "$P0", "church", "churches"],
        ["callFunc", "addCategory", "$P0", "clothing_store", "fashion"],
        ["callFunc", "addCategory", "$P0", "convenience_store", "convenience"],
        ["callFunc", "addCategory", "$P0", "courthouse", "courthouses"],
        ["callFunc", "addCategory", "$P0", "dentist", "dentists"],
        ["callFunc", "addCategory", "$P0", "department_store", "deptstores"],
        ["callFunc", "addCategory", "$P0", "doctor", "physicians"],
        ["callFunc", "addCategory", "$P0", "electronics_store", "electronics"],
        ["callFunc", "addCategory", "$P0", "embassy", "embassy"],
        ["callFunc", "addCategory", "$P0", "finance", "financialservices"],
        ["callFunc", "addCategory", "$P0", "fire_station", "firedepartments"],
        ["callFunc", "addCategory", "$P0", "florist", "florists"],
        ["callFunc", "addCategory", "$P0", "food", "food"],
        ["callFunc", "addCategory", "$P0", "funeral_home", "funeralservices"],
        ["callFunc", "addCategory", "$P0", "furniture_store", "furniture"],
        ["callFunc", "addCategory", "$P0", "gas_station", "servicestations"],
        ["callFunc", "addCategory", "$P0", "grocery_or_supermarket", "grocery"],
        ["callFunc", "addCategory", "$P0", "gym", "gyms"],
        ["callFunc", "addCategory", "$P0", "hardware_store", "hardware"],
        ["callFunc", "addCategory", "$P0", "health", "health"],
        ["callFunc", "addCategory", "$P0", "hindu_temple", "hindu_temples"],
        ["callFunc", "addCategory", "$P0", "hospital", "hospitals"],
        ["callFunc", "addCategory", "$P0", "jewelry_store", "jewelry"],
        ["callFunc", "addCategory", "$P0", "laundry", "drycleaninglaundry"],
        ["callFunc", "addCategory", "$P0", "lawyer", "lawyers"],
        ["callFunc", "addCategory", "$P0", "library", "libraries"],
        ["callFunc", "addCategory", "$P0", "locksmith", "locksmiths"],
        ["callFunc", "addCategory", "$P0", "mosque", "mosques"],
        ["callFunc", "addCategory", "$P0", "movie_theater", "movietheaters"],
        ["callFunc", "addCategory", "$P0", "museum", "museums"],
        ["callFunc", "addCategory", "$P0", "night_club", "danceclubs"],
        ["callFunc", "addCategory", "$P0", "parks", "parks"],
        ["callFunc", "addCategory", "$P0", "parking", "parking"],
        ["callFunc", "addCategory", "$P0", "pet_store", "petstore"],
        ["callFunc", "addCategory", "$P0", "pharmacy", "pharmacy"],
        ["callFunc", "addCategory", "$P0", "physiotherapist", "physicaltherapy"],
        ["callFunc", "addCategory", "$P0", "police", "policedepartments"],
        ["callFunc", "addCategory", "$P0", "post_office", "postoffices"],
        ["callFunc", "addCategory", "$P0", "real_estate_agency", "realestateagents"],
        ["callFunc", "addCategory", "$P0", "restaurant", "restaurants"],
        ["callFunc", "addCategory", "$P0", "rv_park", "rvparks"],
        ["callFunc", "addCategory", "$P0", "school", "education"],
        ["callFunc", "addCategory", "$P0", "shoe_store", "shoes"],
        ["callFunc", "addCategory", "$P0", "shopping_mall", "shoppingcenters"],
        ["callFunc", "addCategory", "$P0", "spa", "spas"],
        ["callFunc", "addCategory", "$P0", "stadium", "stadiumsarenas"],
        ["callFunc", "addCategory", "$P0", "synagogue", "synagogues"],
        ["callFunc", "addCategory", "$P0", "taxi_stand", "taxis"],
        ["callFunc", "addCategory", "$P0", "train_station", "trainstations"],
        ["callFunc", "addCategory", "$P0", "travel_agency", "travelagents"],
        ["callFunc", "addCategory", "$P0", "university", "collegeuniv"],
        ["callFunc", "addCategory", "$P0", "veterinary_care", "vet"],
        ["callFunc", "addCategory", "$P0", "zoo", "zoos"]
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
        ["set", "$L0.url", "https://api.yelp.com/v2/search"],
        ["create", "$L1", "String", "?"],
        ["string.concat", "$L1", "$L1", "ll=", "$P2", "%2C", "$P3"],
        ["string.concat", "$L1", "$L1", "&radius_filter=", "$P4"],
        ["if!=than", "$P5", null, 2],
        ["string.urlEncode", "$L2", "$P5"],
        ["string.concat", "$L1", "$L1", "&term=", "$L2"],
        ["if!=than", "$P6", null, 3],
        ["callFunc", "getCategoriesString", "$P0", "$L2", "$P6"],
        ["string.urlEncode", "$L2", "$L2"],
        ["string.concat", "$L1", "$L1", "&category_filter=", "$L2"],
        ["create", "$L2", "Array"],
        ["if!=than", "$P6", null, 1],
        ["push", "$L2", "category_filter"],
        ["push", "$L2", "ll"],
        ["push", "$L2", "oauth_consumer_key"],
        ["push", "$L2", "oauth_nonce"],
        ["push", "$L2", "oauth_signature_method"],
        ["push", "$L2", "oauth_timestamp"],
        ["push", "$L2", "oauth_token"],
        ["push", "$L2", "oauth_version"],
        ["push", "$L2", "radius_filter"],
        ["if!=than", "$P5", null, 1],
        ["push", "$L2", "term"],
        ["create", "$L3", "Object"],
        ["string.concat", "$L3.ll", "$P2", ",", "$P3"],
        ["string.concat", "$L3.radius_filter", "$P4", ""],
        ["if!=than", "$P5", null, 1],
        ["set", "$L3.term", "$P5"],
        ["if!=than", "$P6", null, 1],
        ["callFunc", "getCategoriesString", "$P0", "$L3.category_filter", "$P6"],
        ["callFunc", "oAuth1:signRequest", "$P0", "$L0", "$L2", "$L3"],
        ["string.concat", "$L0.url", "$L0.url", "$L1"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "checkHttpResponse", "$P0", "$L2"],
        ["json.parse", "$L3", "$L2.responseBody"],
        ["create", "$P1", "Array"],
        ["create", "$L4", "Number", 0],
        ["size", "$L5", "$L3.businesses"],
        ["if<than", "$L4", "$L5", 5],
        ["get", "$L6", "$L3.businesses", "$L4"],
        ["callFunc", "extractBusiness", "$P0", "$L7", "$L6"],
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
    "oAuth1:signRequest": [
        ["if==than", "$P1.requestHeaders", null, 1],
        ["create", "$P1.requestHeaders", "Object"],
        ["create", "$L0", "Object"],
        ["set", "$L0.oauth_consumer_key", "$P0.consumerKey"],
        ["callFunc", "oAuth1:generateNonce", "$L0.oauth_nonce"],
        ["set", "$L0.oauth_signature_method", "HMAC-SHA1"],
        ["create", "$L1", "Date"],
        ["math.multiply", "$L1", "$L1.Time", 0.001],
        ["math.floor", "$L1", "$L1"],
        ["string.format", "$L0.oauth_timestamp", "%d", "$L1"],
        ["set", "$L0.oauth_token", "$P0.token"],
        ["set", "$L0.oauth_version", "1.0"],
        ["string.urlEncode", "$L2", "$P1.url"],
        ["string.concat", "$L1", "$P1.method", "&", "$L2", "&"],
        ["set", "$L2", ""],
        ["set", "$L3", 0],
        ["size", "$L4", "$P2"],
        ["if<than", "$L3", "$L4", 12],
        ["get", "$L5", "$P2", "$L3"],
        ["if==than", "$L5", "oauth_callback", 1],
        ["set", "$L0.oauth_callback", "$P0.redirectUri"],
        ["get", "$L6", "$L0", "$L5"],
        ["if>than", "$L3", 0, 1],
        ["string.concat", "$L2", "$L2", "&"],
        ["if==than", "$L6", null, 1],
        ["get", "$L6", "$P3", "$L5"],
        ["string.urlEncode", "$L6", "$L6"],
        ["string.concat", "$L2", "$L2", "$L5", "=", "$L6"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -13],
        ["string.urlEncode", "$L2", "$L2"],
        ["string.concat", "$L1", "$L1", "$L2"],
        ["set", "$L2", "$P0.tokenSecret"],
        ["string.concat", "$L2", "$P0.consumerSecret", "&", "$L2"],
        ["crypt.hmac.sha1", "$L2", "$L2", "$L1"],
        ["array.uint8ToBase64", "$L2", "$L2"],
        ["string.urlEncode", "$L2", "$L2"],
        ["set", "$L0.oauth_signature", "$L2"],
        ["set", "$L2", "OAuth "],
        ["if!=than", "$L0.oauth_callback", null, 2],
        ["string.urlEncode", "$L3", "$L0.oauth_callback"],
        ["string.concat", "$L2", "$L2", "oauth_callback", "=\"", "$L3", "\"", ", "],
        ["string.concat", "$L2", "$L2", "oauth_consumer_key", "=\"", "$L0.oauth_consumer_key", "\""],
        ["string.concat", "$L2", "$L2", ", ", "oauth_nonce", "=\"", "$L0.oauth_nonce", "\""],
        ["string.concat", "$L2", "$L2", ", ", "oauth_signature", "=\"", "$L0.oauth_signature", "\""],
        ["string.concat", "$L2", "$L2", ", ", "oauth_signature_method", "=\"", "$L0.oauth_signature_method", "\""],
        ["string.concat", "$L2", "$L2", ", ", "oauth_timestamp", "=\"", "$L0.oauth_timestamp", "\""],
        ["if!=than", "$L0.oauth_token", null, 1],
        ["string.concat", "$L2", "$L2", ", ", "oauth_token", "=\"", "$L0.oauth_token", "\""],
        ["string.concat", "$L2", "$L2", ", ", "oauth_version", "=\"", "$L0.oauth_version", "\""],
        ["set", "$P1.requestHeaders.Authorization", "$L2"]
    ],
    "oAuth1:generateNonce": [
        ["create", "$L0", "Date"],
        ["string.format", "$L0", "%d", "$L0.Time"],
        ["hash.md5", "$L0", "$L0"],
        ["size", "$L1", "$L0"],
        ["set", "$L2", 0],
        ["set", "$P0", ""],
        ["get", "$L3", "$L0", "$L2"],
        ["string.format", "$L4", "%02x", "$L3"],
        ["string.concat", "$P0", "$P0", "$L4"],
        ["math.add", "$L2", "$L2", 1],
        ["if>=than", "$L2", "$L1", -5]
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
        ["get", "$L2", "$P0.crToYelp", "$L2"],
        ["if==than", "$L2", null, 2],
        ["create", "$L3", "Error", "Unknown category.", "IllegalArgument"],
        ["throwError", "$L3"],
        ["if!=than", "$L0", 0, 1],
        ["string.concat", "$P1", "$P1", ","],
        ["string.concat", "$P1", "$P1", "$L2"],
        ["math.add", "$L0", "$L0", 1],
        ["jumpRel", -11]
    ],
    "extractBusiness": [
        ["create", "$L0", "Location"],
        ["set", "$L0.latitude", "$P2.location.coordinate.latitude"],
        ["set", "$L0.longitude", "$P2.location.coordinate.longitude"],
        ["create", "$L1", "Array"],
        ["create", "$L2", "Number", 0],
        ["size", "$L3", "$P2.categories"],
        ["if<than", "$L2", "$L3", 7],
        ["get", "$L4", "$P2.categories", "$L2"],
        ["get", "$L5", "$L4", 1],
        ["get", "$L6", "$P0.yelpToCr", "$L5"],
        ["if!=than", "$L6", null, 1],
        ["push", "$L1", "$L6"],
        ["math.add", "$L2", "$L2", 1],
        ["jumpRel", -8],
        ["create", "$P1", "POI", "$L1", "$P2.image_url", "$L0", "$P2.name", "$P2.phone"]
    ],
    "addCategory": [
        ["set", "$P0.crToYelp", "$P2", "$P1"],
        ["set", "$P0.yelpToCr", "$P1", "$P2"]
    ]
};
class Yelp {
    constructor(redirectReceiver, consumerKey, consumerSecret, token, tokenSecret) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Yelp");
        this.interpreterStorage["consumerKey"] = consumerKey;
        this.interpreterStorage["consumerSecret"] = consumerSecret;
        this.interpreterStorage["token"] = token;
        this.interpreterStorage["tokenSecret"] = tokenSecret;
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
exports.Yelp = Yelp;
