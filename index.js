'use strict';
let ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert('Oops, no geolocation support');
    }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let km = computeDistance(position.coords, ourCoords);
    let div = document.getElementById('location');
    let distance = document.getElementById('distance');

    div.innerHTML = `You are at latitude: ${latitude}, longitude: ${longitude}`;
    distance.innerHTML = `You are ${km} km from the WickedlySmart HQ`;
}

function displayError(error) {
    const errorTypes = {
        0: 'Unknown error',
        1: 'Permission denied by user',
        2: 'Position is not available',
        3: 'Request timed out'
    };

    let errorMessage = errorTypes[error.code];
    let div = document.getElementById('location');

    if (error.code === 0 || error.code === 2) {
        errorMessage += error.message;
    }

    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    const Radius = 6371; // radius of the Earth in km
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let distance = Math.acos(
        Math.sin(startLatRads) *
        Math.sin(destLatRads) +
        Math.cos(startLatRads) *
        Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)
    ) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    let radians = (degrees * Math.PI) / 180;

    return radians;
}