import {
  Comment,
  CountCommentsResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentResponse,
  ERRORS,
  ListCommentsResponse,
} from '../../../shared';
import crypto from 'crypto';

import { Datastore } from '../datastore';
import { ExpressHandlerWithParams } from '../types';

export class CommentHandler {
  private db: Datastore;

  constructor(db: Datastore) {
    this.db = db;
  }

  public create: ExpressHandlerWithParams<
    { postId: string },
    CreateCommentRequest,
    CreateCommentResponse
  > = async (req, res) => {
    if (!req.params.postId) return res.status(400).send({ error: ERRORS.POST_ID_MISSING });
    if (!req.body.comment) return res.status(400).send({ error: ERRORS.COMMENT_MISSING });

    if (!(await this.db.getPost(req.params.postId, res.locals.userId))) {
      return res.status(404).send({ error: ERRORS.POST_NOT_FOUND });
    }

    const commentForInsertion: Comment = {
      id: crypto.randomUUID(),
      postedAt: Date.now(),
      postId: req.params.postId,
      userId: res.locals.userId,
      comment: req.body.comment,
    };
    await this.db.createComment(commentForInsertion);
    return res.sendStatus(200);
  };

  public delete: ExpressHandlerWithParams<{ id: string }, null, DeleteCommentResponse> = async (
    req,
    res
  ) => {
    if (!req.params.id) return res.status(404).send({ error: ERRORS.COMMENT_ID_MISSING });
    await this.db.deleteComment(req.params.id);
    return res.sendStatus(200);
  };

  public list: ExpressHandlerWithParams<{ postId: string }, null, ListCommentsResponse> = async (
    req,
    res
  ) => {
    if (!req.params.postId) {
      return res.status(400).send({ error: ERRORS.POST_ID_MISSING });
    }
    const comments = await this.db.listComments(req.params.postId);
    return res.send({ comments });
  };

  public count: ExpressHandlerWithParams<{ postId: string }, null, CountCommentsResponse> = async (
    req,
    res
  ) => {
    if (!req.params.postId) {
      return res.status(400).send({ error: ERRORS.POST_ID_MISSING });
    }
    const count = await this.db.countComments(req.params.postId);
    return res.send({ count });
  };
}
