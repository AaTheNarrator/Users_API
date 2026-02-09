import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "MiddleWare/Auth";

type AsyncHandler = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => Promise<any>

export default function wrap(callback: AsyncHandler) { 
	return async (req: AuthRequest, res: Response, next: NextFunction) => {
		try {
			await callback(req, res, next);
		} catch(e) {
			next(e);
		}
	} 
}