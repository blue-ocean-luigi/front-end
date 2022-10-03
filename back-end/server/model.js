const pool = require('../db/postgres.js')

module.exports = {
  getUserPosts: async (user_id) => {

    const query =
    `WITH gigachad as (
      SELECT p.id as post_id,
            g.id as group_id,
            g.name as groupname,
            p.user_id as author,
            u.firstName as firstName,
            u.lastName as lastName,
            picture,
            p.content as content,
            p.createdAt as date,
            isEvent,
            p.name as eventName,
            p.state as state,
            p.city as city,
            p.zip as zip,
            startTime,
            startDate,
            endTime,
            endDate
    FROM groups g INNER JOIN group_members gm
    ON g.id = gm.group_id
    INNER JOIN posts p ON p.group_id = g.id
    INNER JOIN users u ON p.user_id = u.id
    WHERE gm.user_id = ${user_id})

SELECT post_id,
    group_id,
    groupname,
    author as author_id,
    firstName,
    lastName,
    picture,
    content,
    date,
    isEvent,
    eventName,
    state,
    city,
    zip,
    startTime,
    startDate,
    endTime,
    endDate,

    COALESCE(
  (SELECT json_agg(json_build_object('photo_id', id, 'url', url))
  FROM
      (SELECT pp.id,
        url
      FROM post_photos pp
      WHERE pp.post_id = gigachad.post_id) pictures), '[]'::json) AS photos,
      COALESCE(
  (SELECT json_agg(json_build_object('comment_id', id, 'author_id', user_id, 'firstName', firstName, 'lastName', lastName, 'picture', picture, 'message', message, 'date', createdAt))
  FROM
      (SELECT c.id,
        c.user_id,
        firstName,
        lastName,
        picture,
        message,
        createdAt
      FROM comments c INNER JOIN users u
      ON c.user_id = u.id
      WHERE c.post_id = gigachad.post_id
      ORDER BY createdAt ASC) comment), '[]'::json) AS comments
      FROM gigachad
      ORDER BY date DESC`;


    const select = await pool.query(query)
    return select.rows;
  },

  getGroupPosts: async(group_id) => {
    const query =
    `WITH gigachad as (
      SELECT p.id as post_id,
            g.id as group_id,
            g.name as groupname,
            p.user_id as author,
            u.firstName as firstName,
            u.lastName as lastName,
            picture,
            p.content as content,
            p.createdAt as date,
            isEvent,
            p.name as eventName,
            p.state as state,
            p.city as city,
            p.zip as zip,
            startTime,
            startDate,
            endTime,
            endDate
      FROM posts p INNER JOIN groups g
      ON p.group_id = g.id
      INNER JOIN users u ON p.user_id = u.id
      WHERE p.group_id = ${group_id})

  SELECT post_id,
        group_id,
        groupname,
        author as author_id,
        firstName,
        lastName,
        picture,
        content,
        date,
        isEvent,
        eventName,
        state,
        city,
        zip,
        startTime,
        startDate,
        endTime,
        endDate,

        COALESCE(
      (SELECT json_agg(json_build_object('photo_id', id, 'url', url))
      FROM
          (SELECT pp.id,
            url
          FROM post_photos pp
          WHERE pp.post_id = gigachad.post_id) pictures), '[]'::json) AS photos,
        COALESCE(
      (SELECT json_agg(json_build_object('comment_id', id, 'author_id', user_id, 'firstName', firstname, 'lastName', lastName, 'picture', picture, 'message', message, 'date', createdAt))
      FROM
          (SELECT c.id,
            c.user_id,
            firstName,
            lastName,
            picture,
            message,
            createdAt
          FROM comments c INNER JOIN users u
          ON c.user_id = u.id
          WHERE c.post_id = gigachad.post_id
          ORDER BY createdAt ASC) comments), '[]' ::json) AS comments
          FROM gigachad
          ORDER BY date DESC`;

    const select = await pool.query(query);
    return select.rows;

  },

  createPost: async(body) => {
    let values, qery;


    if (body.isEvent === false) {
      values = [
        body.user_id,
        body.group_id,
        body.content,
        body.isEvent
      ]

      query =
      `INSERT INTO posts (user_id, group_id, content, isEvent)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `

    } else {

      values = [
        body.user_id,
        body.group_id,
        body.content,
        body.isEvent,
        body.name,
        body.state,
        body.city,
        body.zip,
        body.startTime,
        body.startDate,
        body.endTime,
        body.endDate
      ]

      query =
      `INSERT INTO posts (user_id, group_id, content, isEvent, name,
        state, city, zip, startTime, startDate, endTime, endDate)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id
      `
    }

    let post_id = await pool.query(query, values);
    post_id = post_id.rows[0].id

    if (body.photos && body.photos.length > 0) {
      const photoQuery =
      `INSERT INTO post_photos (post_id, url)
        SELECT $1, unnest($2::text[])
      `

      await pool.query(photoQuery, [post_id, body.photos])
    }
    return post_id

  },

  createComment: async (body) => {
    const values = [
      body.post_id,
      body.user_id,
      body.message
    ]
    console.log(values)
    const query =
    `INSERT INTO comments (post_id, user_id, message)
    VALUES ($1, $2, $3)
    RETURNING id
    `

    const comment_id = await pool.query(query, values)
    return comment_id.rows[0].id
  },

  deletePost: async (post_id) => {
    const query =
    `DELETE FROM posts
    WHERE id = ${post_id}`

    await pool.query(query)
    return
  }
}

