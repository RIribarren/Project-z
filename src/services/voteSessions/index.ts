import { postgresPool } from '@libs';
import Boom from '@hapi/boom';
import { Pool } from 'pg';
import { query } from 'express';
import UserService from '../users/index';

const pool: Pool = postgresPool;

const user = new UserService();

export const findAllVoteSessions = async () => {
  try {
    const query = 'SELECT * FROM "voteSession"';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const createVoteSession = async (
  title: string,
  description: string,
  facilitator_id: number
) => {
  try {
    if (!title) {
      throw Boom.badRequest('missing title field');
    }
    if (!description) {
      throw Boom.badRequest('missing description field');
    }

    const values = [title, description, facilitator_id];
    const query = `INSERT INTO "voteSession" (title, description, facilitator_id) VALUES ($1, $2, $3)`;
    await pool.query(query, values);
  } catch (error) {
    throw error;
  }
};

export const findVoteSessionById = async (id: number) => {
  try {
    const query = 'SELECT * FROM "voteSession" WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length < 1) {
      throw Boom.notFound('Vote session not found!');
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const updateVoteSession = async (id: number, title?: string, description?: string) => {
  try {
    const values: (string | number)[] = [id];
    if (title) values.push(title);
    if (description) values.push(description);

    if (title || description) {
      // Find a more readable alternative to this approach
      const query = `UPDATE "voteSession" SET ${title ? 'title = $2' : ''}${
        title && description ? ', description = $3' : description ? ' description = $2' : ''
      } WHERE id=$1`;
      const { rowCount } = await pool.query(query, values);
      if (rowCount === 0) {
        throw Boom.notFound('Vote session not found!');
      }
    } else {
      throw Boom.badRequest('missing fields');
    }
  } catch (error) {
    throw error;
  }
};

export const removeVoteSession = async (id: number) => {
  try {
    const values = [id];
    const query = `DELETE FROM "voteSession" WHERE id=$1`;
    const { rowCount } = await pool.query(query, values);
    if (rowCount === 0) {
      throw Boom.notFound('Vote session not found!');
    }
  } catch (error) {
    throw error;
  }
};

export const updateFacilitatorByVoteSession = async (id: number, facilitator_id: number) => {
  try {
    const values = [id, facilitator_id];
    const facilitator = await user.findById(facilitator_id.toString());
    if (!facilitator) {
      throw Boom.notFound('facilitator not found!');
    }
    const query = `UPDATE "voteSession" SET facilitator_id=$2 WHERE id=$1`;
    const { rowCount } = await pool.query(query, values);
    if (rowCount === 0) {
      throw Boom.notFound('Vote session not found!');
    }
  } catch (error) {
    throw error;
  }
};
