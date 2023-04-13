import type { IronSessionOptions } from "iron-session";
import type { User } from "../pages/api/user";

export const sessionOptions: IronSessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD as string,
	cookieName: "Mechboards_session",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
	interface IronSessionData {
		user?: User;
	}
}
