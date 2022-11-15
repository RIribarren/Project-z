import { postgresPool } from '@libs';
import Boom from '@hapi/boom';
import { Pool } from 'pg';

const pool: Pool = postgresPool;

export const findAllCards = async () => {
  try {
    const query = 'SELECT title, link, id FROM "card"';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const findCardById = async (id: number) => {
  try {
    const query = 'SELECT title, link FROM "card" WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length < 1) {
      throw Boom.notFound('Card not found!');
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const createCard = async (title: string, link: string) => {
  try {
    if (!title) {
      throw Boom.badRequest('missing title field');
    }
    if (!link) {
      throw Boom.badRequest('missing link field');
    }
    const values = [title, link];
    const query = `INSERT INTO "card" (title, link) VALUES ($1, $2)`;
    await pool.query(query, values);
  } catch (error) {
    throw error;
  }
};

export const updateCard = async (id: number, title?: string, link?: string) => {
  try {
    const values: (string | number)[] = [id];
    if (title) values.push(title);
    if (link) values.push(link);

    if (title || link) {
      // Find a more readable alternative to this approach
      const query = `UPDATE "card" SET ${title ? 'title = $2' : ''}${
        title && link ? ', link = $3' : link ? ' link = $2' : ''
      } WHERE id=$1`;

      await pool.query(query, values);
    } else {
      throw Boom.badRequest('missing fields');
    }
  } catch (error) {
    throw error;
  }
};

export const removeCard = async (id: number) => {
  try {
    const values = [id];
    const query = `DELETE FROM "card" WHERE id=$1`;
    await pool.query(query, values);
  } catch (error) {
    throw error;
  }
};
