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

    function filterSame(arr) {
      var uniqueNames = [];
      var uniqueNameSet = new Set();

      arr.filter(function (item) {
        if (!uniqueNameSet.has(item.name)) {
          uniqueNames.push(item);
          uniqueNameSet.add(item.name);
        }
      });

      return uniqueNames;
    }

    const lastDishes = filterSame(flatDishes);

    // Check if jsonData is an array
    if (!Array.isArray(lastDishes)) {
      throw new Error("JSON data must be an array");
    }

    await DishesModel.insertMany(lastDishes);
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

    await SuppliersModel.insertMany(suppliers);
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

cron.schedule("0 1 * * *", () => {
  console.log("Start crape data at 1:00 AM");
  // updatedDishes();
  // updatedSuppliers();
  // backupCollections();
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
