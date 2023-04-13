import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { hash } from "bcrypt";

export default async function register(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { firstName, lastName, email, password } = req.body;

	if (req.method !== "POST") {
		res.status(405).json({ message: "Method not allowed" });
		return;
	}
	const client = await clientPromise;
	const db = client.db("mechboards");
	const users = db.collection("users");
	try {
		const userExist = await users.findOne({ email });

		if (userExist) {
			res.status(400).json({ message: "User already exists" });
			return;
		}
		const hashedPassword = await hash(password, 10);

		const result = await users.insertOne({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});
		res.status(200).json({ message: "User Registered successfully" });
		return;
	} catch (e) {
		return res.status(500).json({ message: (e as Error).message });
	}
}
