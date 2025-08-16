import Sub from "../models/sub.model.js";

import {workflowClient} from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Sub.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/sub/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })

        res.status(201).json({success: true, data: {subscription, workflowRunId}});
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id) {
            const error = new Error("You are not owner of account.");
            error.status = 401;
            throw error;
        }
        const subscriptions = await Sub.find({user: req.params.id});

        res.status(200).json({success: true, data: subscriptions});
    } catch (error) {
        next(error);
    }
}

export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Sub.find();

        res.status(201).json({success: true, data: subscriptions});
    } catch (error) {
        next(error);
    }
}

export const getSubscriptionId = async (req, res, next) => {
    try {
        const subscription = await Sub.findById(req.params.id);

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}

