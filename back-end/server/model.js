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

  getUser: async (email) => {
    const query = `
      SELECT
        *
      FROM
        users
      WHERE
        email = '${email}'`

    let results = await pool.query(query);
    return (results.rows)
  },
  addUser: (info) => {
    const { firstname, lastname, email, aboutme, picture } = info

    const query = `
      INSERT INTO users
        (firstname, lastname, email, aboutme, picture)
      VALUES
        ('${firstname}', '${lastname}', '${email}', '${aboutme}', '${picture}')`

    return pool.query(query)
  },
  updateUser: (info) => {
    const { id, firstname, lastname, email, aboutme, picture } = info

    const query = `
      UPDATE users
      SET
        firstname = '${firstname}',
        lastname = '${lastname}',
        email = '${email}',
        aboutme ='${aboutme}',
        picture = '${picture}'
      WHERE id = '${id}'`

    return pool.query(query)
  },
  getFriendsOfUser: async (id) => {
    const query = `
      (SELECT
        u.firstname,
        u.lastname,
        u.id,
        u.picture
      FROM
        users u
      JOIN
        friends f
      ON
        f.friend1 = '${id}'
      WHERE f.friend2 = u.id)
      UNION
      (SELECT
        u.firstname,
        u.lastname,
        u.id,
        u.picture
      FROM
        users u
      JOIN
        friends f
      ON
        f.friend2 = '${id}'
      WHERE f.friend1 = u.id)
    ORDER BY
      firstname ASC`

    let results = await pool.query(query);
    return (results.rows)

  },
  getGroupsForUser: async (id) => {
    const query = `
      SELECT
        g.*
      FROM
        groups g
      INNER JOIN
        group_members gm
      ON
        gm.user_id = '${id}'
      WHERE
        g.id = gm.group_id`

    let results = await pool.query(query);
    return (results.rows)
  },
  requestToJoinGroup: (info) => {
    const {group_id, user_id, message} = info

    const query = `
      INSERT INTO group_requests
        (group_id, requester_id, message)
      VALUES
        ('${group_id}', '${user_id}', '${message}')`

    return pool.query(query)
  },
  getGroupInfo: async (id) => {
    const query = `
      SELECT
        *
      FROM
        groups
      WHERE
        id = '${id}'`

    console.log(query)

    let results = await pool.query(query);
    return (results.rows)
  },
  getOpenGroupRequest: async (group_id) => {
    const query = `
      SELECT
        u.id,
        u.firstname,
        u.lastname,
        u.picture,
        gr.message
      FROM
        users u
      INNER JOIN
        group_requests gr
      ON
        gr.requester_id = u.id
      WHERE
        gr.group_id = '${group_id}'`

    let results = await pool.query(query);
    return (results.rows)
  },
  createGroup: (info) => {
    const values = [
      info.name,
      info.about,
      info.state,
      info.city,
      info.zip
    ]

    const query = `
      INSERT INTO groups
        (name, about, state, city, zip)
      VALUES
        ($1, $2, $3, $4, $5)`

    return pool.query(query, values)
  },
  getMessages: async (info) => {
    const {user_id, friend_id} = info

    const query = `
      SELECT
       sender_id,
       message,
       createdat
      FROM
        (SELECT
          *
        FROM
          messages
        WHERE
          sender_id = '${user_id}'
        OR
          receiver_id = '${user_id}') as m
      WHERE
        sender_id = '${friend_id}'
      OR
        receiver_id = '${friend_id}'
      `
    let results = await pool.query(query);
    return (results.rows)
  },
  postMessage: (info) => {
    const {sender_id, receiver_id, message} = info

    const query = `
      INSERT INTO messages
        (sender_id, receiver_id, message)
      VALUES
        ('${sender_id}', '${receiver_id}', '${message}')`

    return pool.query(query)
  }
}
