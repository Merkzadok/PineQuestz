import express from "express";
import guestUser from "../controller/user/guest-user.controller";

const guestRouter = express.Router();

guestRouter.post("/", guestUser);

export default guestRouter;
