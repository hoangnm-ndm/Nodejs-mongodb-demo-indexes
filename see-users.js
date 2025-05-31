// seed-users.js
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

// Kết nối MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/index-demo");

// Định nghĩa schema
const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	age: Number,
});

// Tạo index thủ công cho email
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

async function seedUsers() {
	await User.deleteMany({});

	const users = [];
	console.time("test");
	for (let i = 0; i < 1000; i++) {
		users.push({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			age: faker.number.int({ min: 18, max: 60 }),
		});
	}

	console.timeEnd("test");

	await User.insertMany(users);
	console.log("Đã thêm 1000 user mẫu");

	const indexes = await User.collection.getIndexes();
	console.log("Index hiện tại:", indexes);

	mongoose.disconnect();
}

seedUsers().catch((err) => console.error("❌ Lỗi:", err));
