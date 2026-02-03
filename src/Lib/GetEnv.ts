import "dotenv/config";

export default function getEnv() {
	if(
		!process.env.DATABASE_URL ||
		!process.env.PORT ||
		!process.env.MODE ||
		!process.env.JWT_SECRET_KEY
	) throw new Error("Parameter is missing!");;

	return {
		database_url: process.env.DATABASE_URL,
		port: process.env.PORT,
		mode: process.env.MODE,
		jwt_secret_key: process.env.JWT_SECRET_KEY
	}
}

