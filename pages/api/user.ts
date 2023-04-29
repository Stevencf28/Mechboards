import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export type User = {
	id: string | ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	isLoggedIn: boolean;
	userType: string;
};

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	if (req.session.user) {
		// in a real world application you might read the user id from the session and then do a database request
		// to get more information on the user if needed
		res.json({
			...req.session.user,
			isLoggedIn: true,
		});
	} else {
		res.json({
			id: "",
			firstName: "",
			lastName: "",
			email: "",
			isLoggedIn: false,
			userType: "customer",
		});
	}
}
