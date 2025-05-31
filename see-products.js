import { faker } from "@faker-js/faker";
import fs from "fs";

const NUM_PRODUCTS = 1000;
const products = [];

const brands = ["Apple", "Samsung", "Xiaomi", "Sony", "Asus", "HP", "Dell", "Lenovo"];
const categories = ["Laptop", "Smartphone", "Tablet", "Smartwatch", "Monitor"];

const colors = ["Black", "White", "Silver", "Blue", "Red"];
const storages = ["64GB", "128GB", "256GB", "512GB", "1TB"];

function generateVariants() {
	const color = faker.helpers.arrayElement(colors);
	const storage = faker.helpers.arrayElement(storages);
	return {
		color,
		storage,
		variantSku: faker.string.uuid(),
		stock: faker.number.int({ min: 0, max: 500 }),
		price: faker.number.int({ min: 300, max: 2000 }) * 1000,
	};
}

for (let i = 0; i < NUM_PRODUCTS; i++) {
	const brand = faker.helpers.arrayElement(brands);
	const category = faker.helpers.arrayElement(categories);
	const name = `${brand} ${category} ${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()}`;
	const basePrice = faker.number.int({ min: 300, max: 2000 }) * 1000;
	const discount = faker.number.int({ min: 0, max: 30 });
	const finalPrice = Math.round(basePrice * (1 - discount / 100));

	const product = {
		name,
		description: faker.commerce.productDescription(),
		sku: `SKU-${brand.substring(0, 3).toUpperCase()}-${faker.string.alphanumeric(8).toUpperCase()}`,
		image: faker.image.urlLoremFlickr({ category: "technology" }),
		brand,
		category,
		price: {
			original: basePrice,
			discountPercent: discount,
			current: finalPrice,
		},
		variants: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, generateVariants),
		stock: faker.number.int({ min: 0, max: 1000 }),
		sold: faker.number.int({ min: 0, max: 5000 }),
		ratings: {
			average: faker.number.float({ min: 2.0, max: 5.0, precision: 0.1 }),
			count: faker.number.int({ min: 0, max: 1000 }),
		},
		isAvailable: faker.datatype.boolean(),
		createdAt: faker.date.past(),
	};

	products.push(product);
}

// Ghi ra file JSON
fs.writeFileSync("products.json", JSON.stringify(products, null, 2), "utf-8");
console.log("✅ Generated 1000 fake products!");
