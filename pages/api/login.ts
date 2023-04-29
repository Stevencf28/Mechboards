import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";
import { sessionOptions } from "../../lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(login, sessionOptions);

async function login(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		res.status(405).json({ message: "Method not allowed" });
		return;
	}
	try {
		const { email, password } = req.body;

		const client = await clientPromise;
		const db = client.db("mechboards");
		const users = db.collection("users");

		const user = await users.findOne({ email });
		if (!user) {
			res.status(401).json({ message: "Invalid email or password" });
			return;
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			res.status(401).json({ message: "Invalid email or password" });
			return;
		}

		// Set session data
		req.session.user = {
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isLoggedIn: true,
			userType: user.userType,
		};

		await req.session.save();
		res.status(200).json({ user });
		return;
	} catch (e) {
		res.status(500).json({ message: (e as Error).message });
	}
}
