import { Comment, Like, Post, User } from '../../../../shared';
import { createPool, Pool } from 'mysql2/promise';

import { Datastore } from '..';
import { LOGGER } from '../../logging';

export class SqlDataStore implements Datastore {
  private db!: Pool;

  public async openDb() {

    // open the database
    try {
      LOGGER.info('Connecting to MySQL database...');
      this.db = createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port:Number(process.env.DB_PORT),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    } catch (e) {
      LOGGER.error('Failed to connect to the database:', e);
      process.exit(1);
    }
    return this;
  }

  async createUser(user: User): Promise<void> {
    await this.db.execute(
      'INSERT INTO users (id, email, password, firstName, lastName, userName) VALUES (?,?,?,?,?,?)',
      [user.id, user.email, user.password, user.firstName, user.lastName, user.userName]
    );
  }

  async updateCurrentUser(user: User): Promise<void> {
    await this.db.execute(
      'UPDATE users SET userName = ?, firstName = ?, lastName = ? WHERE id = ?',
      [user.userName, user.firstName, user.lastName, user.id]
    );
  }

  async getUserById(id: string): Promise<User | undefined> {
    const [rows] = await this.db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return (rows as User[])[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [rows] = await this.db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return (rows as User[])[0];
  }

  async getUserByUsername(userName: string): Promise<User | undefined> {
    const [rows] = await this.db.execute('SELECT * FROM users WHERE userName = ?', [userName]);
    return (rows as User[])[0];
  }

  async listPosts(userId?: string): Promise<Post[]> {
    const [rows] = await this.db.execute(
      `SELECT *, EXISTS(
        SELECT 1 FROM likes WHERE likes.postId = posts.id AND likes.userId = ?
      ) as liked FROM posts ORDER BY postedAt DESC`,
      [userId || ""]
    );
    return rows as Post[];
  }

  async createPost(post: Post): Promise<void> {
    await this.db.execute(
      'INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?,?,?,?,?)',
      [post.id, post.title, post.url, post.postedAt, post.userId]
    );
  }

  async getPost(id: string): Promise<Post | undefined> {
    const [rows] = await this.db.execute(
      `SELECT *, EXISTS(
        SELECT 1 FROM likes WHERE likes.postId = ?
      ) as liked FROM posts WHERE id = ?`,
      [id,id]
    );
    return (rows as Post[])[0];
  }

  async getPostByUrl(url: string): Promise<Post | undefined> {
    const [rows] = await this.db.execute('SELECT * FROM posts WHERE url = ?', [url]);
    return (rows as Post[])[0];
  }

  async deletePost(id: string): Promise<void> {
    await this.db.execute('DELETE FROM posts WHERE id = ?', [id]);
  }

  async createLike(like: Like): Promise<void> {
    await this.db.execute('INSERT INTO likes(userId, postId) VALUES(?,?)', [like.userId, like.postId]);
  }

  async deleteLike(like: Like): Promise<void> {
    await this.db.execute('DELETE FROM likes WHERE userId = ? AND postId = ?', [like.userId, like.postId]);
  }

  async createComment(comment: Comment): Promise<void> {
    await this.db.execute(
      'INSERT INTO Comments(id, userId, postId, comment, postedAt) VALUES(?,?,?,?,?)',
      [comment.id, comment.userId, comment.postId, comment.comment, comment.postedAt]
    );
  }

  async countComments(postId: string): Promise<number> {
    const [rows] = await this.db.execute('SELECT COUNT(*) as count FROM comments WHERE postId = ?', [postId]);
    return (rows as any)[0].count;
  }

  async listComments(postId: string): Promise<Comment[]> {
    const [rows] = await this.db.execute('SELECT * FROM comments WHERE postId = ? ORDER BY postedAt DESC', [postId]);
    return rows as Comment[];
  }

  async deleteComment(id: string): Promise<void> {
    await this.db.execute('DELETE FROM comments WHERE id = ?', [id]);
  }

  async getLikes(postId: string): Promise<number> {
    const [rows] = await this.db.execute('SELECT COUNT(*) as count FROM likes WHERE postId = ?', [postId]);
    return (rows as any)[0].count;
  }

  async exists(like: Like): Promise<boolean> {
    const [rows] = await this.db.execute('SELECT 1 FROM likes WHERE postId = ? and userId = ?', [like.postId, like.userId]);
    return (rows as any).length > 0;
  }
}
