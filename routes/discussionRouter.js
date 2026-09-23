import { Router } from "express";
import {
  getDiscussions, getDiscussion, createDiscussion,
  deleteDiscussion, addReply, deleteReply, togglePin, toggleClose,
} from "../controllers/discussionController.js";

const router = Router();

router.route("/").get(getDiscussions).post(createDiscussion);
router.route("/:id").get(getDiscussion).delete(deleteDiscussion);
router.post("/:id/reply",                addReply);
router.delete("/:id/reply/:replyId",     deleteReply);
router.patch("/:id/pin",                 togglePin);
router.patch("/:id/close",               toggleClose);

export default router;
