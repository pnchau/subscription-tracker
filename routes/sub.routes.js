import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
    createSubscription,
    getSubscriptionId,
    getSubscriptions,
    getUserSubscriptions
} from "../controllers/sub.controller.js";

const subRouter = Router();

subRouter.get('/', getSubscriptions);

subRouter.get('/:id', authorize, getSubscriptionId);

subRouter.post('/', authorize, createSubscription);

subRouter.put('/', (req, res) => res.send({title: "UPDATE subscriptions"}));

subRouter.delete('/', (req, res) => res.send({title: "DELETE subscriptions"}));

subRouter.get('/user/:id', authorize, getUserSubscriptions);

subRouter.put('/:id/cancel', (req, res) => res.send({title: "CANCEL subscriptions"}));

subRouter.put('/upcoming-renewals', (req, res) => res.send({title: "GET upcoming renewals"}));


export default subRouter;