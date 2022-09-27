import { postgresPool } from '@libs';
import Boom from '@hapi/boom';
import { Pool } from 'pg';

const pool: Pool = postgresPool;

const findAllCards = async () => {
  try {
    const query = 'SELECT title, link FROM "card"';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const findCardById = async (id: string) => {
  try {
    const query = 'SELECT title, link FROM "card" WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length < 1) {
      throw Boom.notFound('User not found!');
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const createCard = async (title: string, link: string) => {
  try {
    if (!title) {
      throw Boom.badRequest('missing title field');
    }
    if (!link) {
      throw Boom.badRequest('missing link field');
    }
    const values = [title, link];
    const query = `INSERT INTO "cards" (title, link) VALUES ($1, $2)`;
    await pool.query(query, values);
  } catch (error) {
    throw error;
  }
};

const updateCard = async (title?: string, link?: string) => {};

const removeCard = async (id: string) => {};
