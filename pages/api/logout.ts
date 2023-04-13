import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
	req.session.destroy();
	res.status(200).json({ message: "Logged out successfully" });
}
