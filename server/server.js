import { app } from "./app.js";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";

import cron from "node-cron";
import puppeteer from "puppeteer";
import { DishesModel } from "./models/dishes.model.js";
import {
  drinkKeyWords,
  foodKeyWords,
  fruitWords,
  urls,
  vegetablesWords,
} from "./utils/crapeData.js";
import { SuppliersModel } from "./models/suppliers.model.js";
import mongoose from "mongoose";

config({
  path: "./config/config.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

connectDatabase();

/* CRAWL DATA & UPDATE DATA */
const updatedDishes = async () => {
  try {
    let updatedDishes = [];

    for (const url of urls) {
      const browser = await puppeteer.launch({
        headless: "new",
        timeout: 0,
      });
      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: "load",
      });

      await page.setViewport({ width: 1280, height: 200000 });

      await page.waitForSelector(".title-menu");

      const products = await page.$$eval(".item-restaurant-row", (elements) =>
        elements.map((e) => ({
          name: e.querySelector(".item-restaurant-name").innerText,
          photo: e.querySelector("img").src,
          price:
            parseFloat(
              e.querySelector(".current-price").innerText.replace(",", ".")
            ) * 1000,
        }))
      );

      const name_supplier = await page.evaluate(
        () => document.querySelector(".name-restaurant").innerText
      );

      const result = products.map((product, id) => {
        if (foodKeyWords.some((key1) => product.name.includes(key1))) {
          product.type = "thực phẩm";
        } else if (drinkKeyWords.some((key2) => product.name.includes(key2))) {
          product.type = "đồ uống";
        } else if (
          vegetablesWords.some((key3) => product.name.includes(key3))
        ) {
          product.type = "rau củ";
        } else if (fruitWords.some((key4) => product.name.includes(key4))) {
          product.type = "trái cây";
        } else {
          product.type = "khác";
        }
        return {
          ...product,
          name_supplier: name_supplier,
        };
      });

      updatedDishes.push(...result, result);

      await browser.close();
    }

    const flatDishes = updatedDishes.flat(2);

    // Check if jsonData is an array
    if (!Array.isArray(flatDishes)) {
      throw new Error("JSON data must be an array");
    }

    await DishesModel.updateMany(flatDishes);
  } catch (error) {
    console.log(error);
  }
};

const updatedSuppliers = async () => {
  try {
    let suppliers = [];

    for (const url of urls) {
      const browser = await puppeteer.launch({
        headless: "new",
        timeout: 0,
      });

      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: "load",
      });

      await page.setViewport({ width: 1280, height: 200000 });

      await page.waitForSelector(".title-menu");

      const name_supplier = await page.evaluate(
        () => document.querySelector(".name-restaurant").innerText
      );

      const address_supplier = await page.evaluate(
        () => document.querySelector(".address-restaurant").innerText
      );

      const photo_supplier = await page.evaluate(
        () => document.querySelector(".detail-restaurant-img img").src
      );

      const open_time = await page.evaluate(
        () => document.querySelector(".time").innerText
      );

      suppliers.push({
        name: name_supplier,
        address: address_supplier,
        photo: photo_supplier,
        open_time: open_time,
      });

      await browser.close();
    }

    // Check if jsonData is an array
    if (!Array.isArray(suppliers)) {
      throw new Error("JSON data must be an array");
    }

    await SuppliersModel.updateMany(suppliers);
  } catch (error) {
    console.log(error);
  }
};

const backupCollections = async () => {
  const collectionNames = [
    "Admin",
    "Shipper",
    "User",
    "Dishes",
    "Orders",
    "Suppliers",
  ];
  const backupFolder = "D:/project/GMH/backup";
  for (const collectionName of collectionNames) {
    const Model = mongoose.model(collectionName);
    try {
      const data = await Model.find({});
      const jsonData = JSON.stringify(data, null, 2);
      const filePath = path.join(backupFolder, `${collectionName}.json`);
      fs.writeFileSync(filePath, jsonData);
      console.log(
        `Đã backup collection "${collectionName}" vào file ${collectionName}.json`
      );
    } catch (error) {
      console.error(`Lỗi backup collection "${collectionName}":`, error);
    }
  }
};

const shortedDistance = () => {
  // Hàm tính khoảng cách giữa hai điểm sử dụng công thức Haversine
  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Bán kính Trái Đất trong kilômét
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  const speed = 40; // Vận tốc (km/h)

  const mapboxApiToken =
    "pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbGk2dmt6bmczZzNiM2VudGRkc2xhY2dxIn0.j5FbXoxE7wJOwi9STKSLBw";
  async function getCoordinatesFromAddress(address) {
    // Gọi Mapbox API để lấy tọa độ từ địa chỉ
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${mapboxApiToken}`
    );
    const data = await response.json();
    const [lng, lat] = data.features[0].center;
    return { lat, lng };
  }

  const addresses = {
    person_a:
      "787 Trần Cao Vân, Thanh Khê Đông, Thanh Khê, Đà Nẵng 550000, Việt Nam",
    supplier: [
      "Ngã Ba Huế, Hoà An, Thanh Khê, Đà Nẵng 550000, Việt Nam",

      "Hòa Khê, Thanh Khê, Đà Nẵng 550000, Việt Nam",

      "Trần Cao Vân, Thanh Khê Tây, Liên Chiểu, Đà Nẵng 550000, Việt Nam",
    ],
    person_b: "48 Xuân Đán 1, Xuân Hà, Thanh Khê, Đà Nẵng 550000, Việt Nam",
  };

  async function calculateTotalDistanceAndTime() {
    const personALocation = await getCoordinatesFromAddress(addresses.person_a);
    const personBLocation = await getCoordinatesFromAddress(addresses.person_b);

    const supplierLocations = [];
    for (let i = 0; i < addresses.supplier.length; i++) {
      const supplierLocation = await getCoordinatesFromAddress(
        addresses.supplier[i]
      );
      supplierLocations.push(supplierLocation);
    }
    const sortedAddresses = [
      personALocation,
      ...supplierLocations,
      personBLocation,
    ];

    console.log(supplierLocations);
    const distances = [];
    const times = [];

    for (let i = 0; i < sortedAddresses.length - 1; i++) {
      const distance = calculateDistance(
        sortedAddresses[i].lat,
        sortedAddresses[i].lng,
        sortedAddresses[i + 1].lat,
        sortedAddresses[i + 1].lng
      );
      distances.push(distance);

      const time = Math.round((distance / speed) * 60);
      times.push(time);
    }

    const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);
    const totalTime = times.reduce((acc, curr) => acc + curr, 0);

    console.log("Distances:", distances);
    console.log("Times:", times);
    console.log("Total Distance:", totalDistance.toFixed(2));
    console.log("Total Time:", totalTime);

    // Return totalDistance and totalTime if needed in your application
    return { totalDistance: totalDistance.toFixed(2), totalTime };
  }
};

// shortedDistance();

cron.schedule("0 1 * * *", () => {
  console.log("Start crape data at 1:00 AM");
  // updatedDishes();
  // updatedSuppliers();
  // backupCollections();
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
