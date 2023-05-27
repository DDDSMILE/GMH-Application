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
  const address = [
    {
      person_a: {
        name: "person_a",
        lat: 16.070219226894224,
        long: 108.21175224334318,
      },
    },
    {
      supplier: [
        { name: "b", lat: 16.06635934370604, long: 108.19149809971044 },
        { name: "c", lat: 16.061203059711115, long: 108.1759485105243 },
        { name: "a", lat: 16.052001221989833, long: 108.2102114880597 },
      ],
    },
    {
      person_b: {
        name: "person_b",
        lat: 16.08370380445022,
        long: 108.22860544450404,
      },
    },
  ];

  // Tính khoảng cách giữa hai điểm sử dụng công thức Haversine
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Đường kính trái đất (đơn vị: km)

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
  }

  // Chuyển đổi từ độ sang radian
  function toRad(value) {
    return (value * Math.PI) / 180;
  }

  const personA = address[0].person_a;
  const suppliers = address[1].supplier;
  const personB = address[2].person_b;

  const speed = 40; // Vận tốc (đơn vị: km/h)

  // 1. Tính quãng đường ngắn nhất từ person_a đến person_b
  const distancePersonAToPersonB = calculateDistance(
    personA.lat,
    personA.long,
    personB.lat,
    personB.long
  );

  // 2. Tính quãng đường ngắn nhất từ person_a đến các điểm a, b, c và thời gian đi
  const distances = [];
  const times = [];

  suppliers.forEach((supplier) => {
    const distance = calculateDistance(
      personA.lat,
      personA.long,
      supplier.lat,
      supplier.long
    );
    const time = distance / speed;
    distances.push(distance);
    times.push(time);
  });

  // Sắp xếp theo thứ tự tăng dần của quãng đường
  const sortedIndices = distances
    .map((_, index) => index)
    .sort((a, b) => distances[a] - distances[b]);
  const sortedDistances = sortedIndices.map((index) => distances[index]);
  const sortedTimes = sortedIndices.map((index) => times[index]);
  const sortedSuppliers = sortedIndices.map((index) => suppliers[index]);

  // 3. Xuất ra quãng đường từ person_a đến a, a đến b, b đến c, c đến person_b
  console.log("Kết quả:");
  console.log("-------");

  // Quãng đường từ person_a đến person_b
  console.log(
    `- person_a đến person_b: ${distancePersonAToPersonB} km, Thời gian: ${
      (distancePersonAToPersonB / speed) * 60
    } phút`
  );

  // Quãng đường từ person_a đến các điểm a, b, c và thời gian đi
  let previousPoint = personA;
  sortedSuppliers.forEach((supplier, index) => {
    const distance = sortedDistances[index];
    const time = sortedTimes[index];
    console.log(
      `- ${previousPoint.name} đến ${
        supplier.name
      }: ${distance} km, Thời gian: ${time * 60} phút`
    );
    previousPoint = supplier;
  });
  // Quãng đường từ c đến person_b
  const distanceCToPersonB = calculateDistance(
    previousPoint.lat,
    previousPoint.long,
    personB.lat,
    personB.long
  );
  console.log(
    `- ${
      previousPoint.name
    } đến person_b: ${distanceCToPersonB} km, Thời gian: ${
      (distanceCToPersonB / speed) * 60
    } phút`
  );
};

shortedDistance();

cron.schedule("0 1 * * *", () => {
  console.log("Start crape data at 1:00 AM");
  // updatedDishes();
  // updatedSuppliers();
  // backupCollections();
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
