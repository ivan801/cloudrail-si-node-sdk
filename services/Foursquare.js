"use strict";
const Interpreter_1 = require("../servicecode/Interpreter");
const Sandbox_1 = require("../servicecode/Sandbox");
const ErrorType_1 = require("../types/ErrorType");
const DetailErrors_1 = require("../errors/DetailErrors");
const InitSelfTest_1 = require("../servicecode/InitSelfTest");
const SERVICE_CODE = {
    "init": [
        ["create", "$P0.crToFoursquare", "Object"],
        ["create", "$P0.foursquareToCr", "Object"],
        ["callFunc", "addCategory", "$P0", "airport", "4bf58dd8d48988d1ed931735"],
        ["callFunc", "addCategory", "$P0", "amusement_park", "4bf58dd8d48988d182941735"],
        ["callFunc", "addCategory", "$P0", "aquarium", "4fceea171983d5d06c3e9823"],
        ["callFunc", "addCategory", "$P0", "art_gallery", "4bf58dd8d48988d1e2931735"],
        ["callFunc", "addCategory", "$P0", "bakery", "4bf58dd8d48988d16a941735 "],
        ["callFunc", "addCategory", "$P0", "bank", "4bf58dd8d48988d10a951735"],
        ["callFunc", "addCategory", "$P0", "bar", "4bf58dd8d48988d116941735"],
        ["callFunc", "addCategory", "$P0", "beauty_salon", "54541900498ea6ccd0202697"],
        ["callFunc", "addCategory", "$P0", "bicycle_store", "4bf58dd8d48988d115951735"],
        ["callFunc", "addCategory", "$P0", "book_store", "4bf58dd8d48988d114951735"],
        ["callFunc", "addCategory", "$P0", "bowling_alley", "4bf58dd8d48988d1e4931735"],
        ["callFunc", "addCategory", "$P0", "bus_station", "4bf58dd8d48988d1fe931735"],
        ["callFunc", "addCategory", "$P0", "cafe", "4bf58dd8d48988d16d941735"],
        ["callFunc", "addCategory", "$P0", "car_dealer", "4eb1c1623b7b52c0e1adc2ec"],
        ["callFunc", "addCategory", "$P0", "car_rental", "4bf58dd8d48988d1ef941735"],
        ["callFunc", "addCategory", "$P0", "car_repair", "56aa371be4b08b9a8d5734d3"],
        ["callFunc", "addCategory", "$P0", "car_wash", "4f04ae1f2fb6e1c99f3db0ba"],
        ["callFunc", "addCategory", "$P0", "casino", "4bf58dd8d48988d17c941735"],
        ["callFunc", "addCategory", "$P0", "cemetery", "4bf58dd8d48988d15c941735"],
        ["callFunc", "addCategory", "$P0", "church", "4bf58dd8d48988d132941735"],
        ["callFunc", "addCategory", "$P0", "clothing_store", "4bf58dd8d48988d103951735"],
        ["callFunc", "addCategory", "$P0", "convenience_store", "4d954b0ea243a5684a65b473"],
        ["callFunc", "addCategory", "$P0", "courthouse", "4bf58dd8d48988d12b941735"],
        ["callFunc", "addCategory", "$P0", "dentist", "4bf58dd8d48988d178941735"],
        ["callFunc", "addCategory", "$P0", "department_store", "4bf58dd8d48988d1f6941735"],
        ["callFunc", "addCategory", "$P0", "doctor", "4bf58dd8d48988d177941735"],
        ["callFunc", "addCategory", "$P0", "electronics_store", "4bf58dd8d48988d122951735"],
        ["callFunc", "addCategory", "$P0", "embassy", "4bf58dd8d48988d12c951735"],
        ["callFunc", "addCategory", "$P0", "finance", "503287a291d4c4b30a586d65"],
        ["callFunc", "addCategory", "$P0", "fire_station", "4bf58dd8d48988d12c941735"],
        ["callFunc", "addCategory", "$P0", "florist", "4bf58dd8d48988d11b951735"],
        ["callFunc", "addCategory", "$P0", "food", "4d4b7105d754a06374d81259"],
        ["callFunc", "addCategory", "$P0", "funeral_home", "4f4534884b9074f6e4fb0174"],
        ["callFunc", "addCategory", "$P0", "furniture_store", "4bf58dd8d48988d1f8941735"],
        ["callFunc", "addCategory", "$P0", "gas_station", "4bf58dd8d48988d113951735"],
        ["callFunc", "addCategory", "$P0", "grocery_or_supermarket", "4bf58dd8d48988d118951735"],
        ["callFunc", "addCategory", "$P0", "gym", "4bf58dd8d48988d175941735"],
        ["callFunc", "addCategory", "$P0", "hardware_store", "4bf58dd8d48988d112951735"],
        ["callFunc", "addCategory", "$P0", "health", "54541900498ea6ccd0202697"],
        ["callFunc", "addCategory", "$P0", "hindu_temple", "52e81612bcbc57f1066b7a3f"],
        ["callFunc", "addCategory", "$P0", "hospital", "4bf58dd8d48988d196941735"],
        ["callFunc", "addCategory", "$P0", "jewelry_store", "4bf58dd8d48988d111951735"],
        ["callFunc", "addCategory", "$P0", "laundry", "4bf58dd8d48988d1fc941735"],
        ["callFunc", "addCategory", "$P0", "lawyer", "52f2ab2ebcbc57f1066b8b3f"],
        ["callFunc", "addCategory", "$P0", "library", "4bf58dd8d48988d12f941735"],
        ["callFunc", "addCategory", "$P0", "locksmith", "52f2ab2ebcbc57f1066b8b1e"],
        ["callFunc", "addCategory", "$P0", "mosque", "4bf58dd8d48988d138941735"],
        ["callFunc", "addCategory", "$P0", "movie_theater", "4bf58dd8d48988d17f941735"],
        ["callFunc", "addCategory", "$P0", "museum", "4bf58dd8d48988d181941735"],
        ["callFunc", "addCategory", "$P0", "night_club", "4bf58dd8d48988d11f941735"],
        ["callFunc", "addCategory", "$P0", "parks", "4bf58dd8d48988d163941735"],
        ["callFunc", "addCategory", "$P0", "parking", "4c38df4de52ce0d596b336e1"],
        ["callFunc", "addCategory", "$P0", "pet_store", "4bf58dd8d48988d100951735"],
        ["callFunc", "addCategory", "$P0", "pharmacy", "4bf58dd8d48988d10f951735"],
        ["callFunc", "addCategory", "$P0", "physiotherapist", "5744ccdfe4b0c0459246b4af"],
        ["callFunc", "addCategory", "$P0", "police", "4bf58dd8d48988d12e941735"],
        ["callFunc", "addCategory", "$P0", "post_office", "4bf58dd8d48988d172941735"],
        ["callFunc", "addCategory", "$P0", "real_estate_agency", "5032885091d4c4b30a586d66"],
        ["callFunc", "addCategory", "$P0", "restaurant", "4d4b7105d754a06374d81259"],
        ["callFunc", "addCategory", "$P0", "rv_park", "52f2ab2ebcbc57f1066b8b53"],
        ["callFunc", "addCategory", "$P0", "school", "4bf58dd8d48988d13b941735"],
        ["callFunc", "addCategory", "$P0", "shoe_store", "4bf58dd8d48988d107951735"],
        ["callFunc", "addCategory", "$P0", "shopping_mall", "4bf58dd8d48988d1fd941735"],
        ["callFunc", "addCategory", "$P0", "spa", "4bf58dd8d48988d1ed941735"],
        ["callFunc", "addCategory", "$P0", "stadium", "4bf58dd8d48988d184941735"],
        ["callFunc", "addCategory", "$P0", "synagogue", "4bf58dd8d48988d139941735"],
        ["callFunc", "addCategory", "$P0", "taxi_stand", "53fca564498e1a175f32528b"],
        ["callFunc", "addCategory", "$P0", "train_station", "4bf58dd8d48988d129951735"],
        ["callFunc", "addCategory", "$P0", "travel_agency", "4f04b08c2fb6e1c99f3db0bd"],
        ["callFunc", "addCategory", "$P0", "university", "4d4b7105d754a06372d81259"],
        ["callFunc", "addCategory", "$P0", "veterinary_care", "4d954af4a243a5684765b473"],
        ["callFunc", "addCategory", "$P0", "zoo", "4bf58dd8d48988d17b941735"]
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
        ["set", "$L0.url", "https://api.foursquare.com/v2/venues/search?v=20160614&m=foursquare"],
        ["string.concat", "$L1", "$P2", ",", "$P3"],
        ["string.urlEncode", "$L1", "$L1"],
        ["string.concat", "$L0.url", "$L0.url", "&ll=", "$L1"],
        ["string.concat", "$L0.url", "$L0.url", "&radius=", "$P4"],
        ["if!=than", "$P5", null, 2],
        ["string.urlEncode", "$L1", "$P5"],
        ["string.concat", "$L0.url", "$L0.url", "&query=", "$L1"],
        ["if!=than", "$P6", null, 3],
        ["callFunc", "getCategoriesString", "$P0", "$L2", "$P6"],
        ["string.urlEncode", "$L2", "$L2"],
        ["string.concat", "$L0.url", "$L0.url", "&categoryId=", "$L2"],
        ["string.concat", "$L0.url", "$L0.url", "&client_id=", "$P0.clientID", "&client_secret=", "$P0.clientSecret"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "checkHttpResponse", "$P0", "$L2"],
        ["json.parse", "$L3", "$L2.responseBody"],
        ["set", "$L3", "$L3.response.venues"],
        ["create", "$P1", "Array"],
        ["create", "$L4", "Number", 0],
        ["size", "$L5", "$L3"],
        ["if<than", "$L4", "$L5", 5],
        ["get", "$L6", "$L3", "$L4"],
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
        ["get", "$L2", "$P0.crToFoursquare", "$L2"],
        ["if==than", "$L2", null, 2],
        ["create", "$L3", "Error", "Unknown category.", "IllegalArgument"],
        ["throwError", "$L3"],
        ["if!=than", "$L0", 0, 1],
        ["string.concat", "$P1", "$P1", ","],
        ["string.concat", "$P1", "$P1", "$L2"],
        ["math.add", "$L0", "$L0", 1],
        ["jumpRel", -11]
    ],
    "extractPOI": [
        ["create", "$L0", "Array"],
        ["create", "$L1", "Number", 0],
        ["size", "$L2", "$P2.categories"],
        ["if<than", "$L1", "$L2", 7],
        ["get", "$L3", "$P2.categories", "$L1"],
        ["set", "$L3", "$L3.id"],
        ["get", "$L4", "$P0.foursquareToCr", "$L3"],
        ["if!=than", "$L4", null, 1],
        ["push", "$L0", "$L4"],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -8],
        ["create", "$L1", "Location"],
        ["set", "$L1.latitude", "$P2.location.lat"],
        ["set", "$L1.longitude", "$P2.location.lng"],
        ["create", "$L2", "Object"],
        ["set", "$L2.method", "GET"],
        ["string.concat", "$L2.url", "https://api.foursquare.com/v2/venues/", "$P2.id", "/photos"],
        ["string.concat", "$L2.url", "$L2.url", "?client_id=", "$P0.clientID", "&client_secret=", "$P0.clientSecret"],
        ["string.concat", "$L2.url", "$L2.url", "&limit=1&v=20160614&m=foursquare"],
        ["http.requestCall", "$L3", "$L2"],
        ["callFunc", "checkHttpResponse", "$P0", "$L3"],
        ["json.parse", "$L4", "$L3.responseBody"],
        ["get", "$L5", "$L4.response.photos.items"],
        ["size", "$L6", "$L5"],
        ["if==than", "$L6", 0, 2],
        ["set", "$L6", null],
        ["jumpRel", 2],
        ["get", "$L5", "$L5", 0],
        ["string.concat", "$L6", "$L5.prefix", "original", "$L5.suffix"],
        ["create", "$P1", "POI", "$L0", "$L6", "$L1", "$P2.name", "$P2.contact.phone"]
    ],
    "addCategory": [
        ["set", "$P0.crToFoursquare", "$P2", "$P1"],
        ["set", "$P0.foursquareToCr", "$P1", "$P2"]
    ]
};
class Foursquare {
    constructor(redirectReceiver, clientID, clientSecret) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Foursquare");
        this.interpreterStorage["clientID"] = clientID;
        this.interpreterStorage["clientSecret"] = clientSecret;
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
exports.Foursquare = Foursquare;
