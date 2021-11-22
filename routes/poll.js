import express from "express";
import Pusher from "pusher";
import Vote from "../vote.js";
const route = express.Router();

const pusher = new Pusher({
  appId: "1301615",
  key: "52798692e648a67f720a",
  secret: "1c33b15a22c6022309b2",
  cluster: "ap2",
  useTLS: true,
});

route.get("/", async (req, res) => {
  try {
    let vot = await Vote.find({});
    res.status(200).json(vot);
  } catch (err) {
    console.log(err.message);
  }
});

route.post("/", async (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1,
  };
  const { os, points } = newVote;
  try {
    await Vote.collection.insertOne(newVote);
    pusher.trigger("os-poll", "os-vote", {
      points: points,
      os: os,
    });

    return res.json({ success: true, message: "Thank you for voting" });
  } catch (err) {
    console.log(err.message);
  }
});

export default route;
