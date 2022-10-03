const pool = require('../db/postgres.js')

module.exports = {
  getUserPosts: async (user_id) => {

    const query =
    `WITH gigachad as (
      SELECT p.id as post_id,
            p.group_id as group_id,
            g.name as groupname,
            p.user_id as author_id,
            u.firstName as firstName,
            u.lastName as lastName,
            picture,
            content,
            createdAt as date,
            isEvent,
            p.name as eventName,
            p.state as state,
            p.city as city,
            p.zip as zip,
            startTime,
            startDate,
            endTime,
            endDate,
            payment_amt
    FROM groups g INNER JOIN group_members gm
    ON g.id = gm.group_id
    INNER JOIN posts p ON p.group_id = g.id
    INNER JOIN users u ON p.user_id = u.id
    WHERE gm.user_id = ${user_id})

SELECT post_id,
    group_id,
    groupname,
    author_id,
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
    payment_amt,

    COALESCE(
  (SELECT json_agg(json_build_object('photo_id', id, 'url', url))
  FROM
      (SELECT pp.id,
        url
      FROM post_photos pp
      WHERE pp.post_id = gigachad.post_id) pictures), '[]'::json) AS photos,
      COALESCE(
  (SELECT json_agg(json_build_object('id', user_id, 'firstName', firstName, 'lastName', lastName))
  FROM
      (SELECT l.user_id,
        firstName,
        lastName
      FROM users INNER JOIN post_likes l
      ON users.id = l.user_id
      WHERE l.post_id = gigachad.post_id) likes), '[]'::json) AS postLikes,
      COALESCE(
  (SELECT json_agg(json_build_object('comment_id', id, 'author_id', user_id, 'firstName', firstName, 'lastName', lastName, 'picture', picture, 'message', message, 'date', createdAt,
  'likes', clikes))
  FROM
      (SELECT c.id,
        c.user_id,
        firstName,
        lastName,
        picture,
        message,
        createdAt,
        COALESCE((SELECT json_agg(json_build_object(
          'id', user_id,
          'firstName', firstName,
          'lastName', lastName
        )) cnames
      FROM
          (SELECT cl.user_id,
            firstName,
            lastName
          FROM users INNER JOIN comment_likes cl
          ON cl.user_id = users.id
          WHERE cl.comment_id = c.id) comms), '[]'::json) clikes
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
            p.group_id as group_id,
            p.user_id as author_id,
            u.firstName as firstName,
            u.lastName as lastName,
            picture,
            content,
            createdAt as date,
            isEvent,
            p.name as eventName,
            state,
            city,
            zip,
            startTime,
            startDate,
            endTime,
            endDate,
            payment_amt
      FROM posts p INNER JOIN
      users u ON p.user_id = u.id
      WHERE p.group_id = ${group_id})

  SELECT post_id,
        group_id,
        author_id,
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
        payment_amt,

        COALESCE(
      (SELECT json_agg(json_build_object('photo_id', id, 'url', url))
      FROM
          (SELECT pp.id,
            url
          FROM post_photos pp
          WHERE pp.post_id = gigachad.post_id) pictures), '[]'::json) AS photos,
        COALESCE(
      (SELECT json_agg(json_build_object('id', user_id, 'firstName', firstName, 'lastName', lastName))
      FROM
          (SELECT l.user_id,
            firstName,
            lastName
          FROM users INNER JOIN post_likes l
          ON users.id = l.user_id
          WHERE l.post_id = gigachad.post_id) likes), '[]'::json) AS postLikes,
        COALESCE(
      (SELECT json_agg(json_build_object('comment_id', id, 'author_id', user_id, 'firstName', firstname, 'lastName', lastName, 'picture', picture, 'message', message, 'date', createdAt, 'likes', clikes))
      FROM
          (SELECT c.id,
            c.user_id,
            firstName,
            lastName,
            picture,
            message,
            createdAt,
            COALESCE((SELECT json_agg(json_build_object(
                'id', user_id,
                'firstName', firstName,
                'lastName', lastName
              )) cnames
            FROM
              (SELECT cl.user_id,
                    firstName,
                    lastName
              FROM users INNER JOIN comment_likes cl ON cl.user_id = users.id
              WHERE cl.comment_id = c.id) comms), '[]'::json) clikes
          FROM comments c INNER JOIN users u
          ON c.user_id = u.id
          WHERE c.post_id = gigachad.post_id
          ORDER BY createdAt ASC) comments), '[]' ::json) AS comments
          FROM gigachad
          ORDER BY date DESC`;

    const select = await pool.query(query);
    return select.rows;

  },

  getRsvp: async(post_id) => {
    const query =
    `WITH guestlist as (
      SELECT r.user_id as user_id,
            firstName,
            lastName
      FROM rsvp r INNER JOIN users
      ON r.user_id = users.id
      WHERE post_id = ${post_id})

    SELECT user_id,
    firstName,
    lastName
    FROM guestlist`
    const rsvp = await pool.query(query);
    return rsvp.rows[0];
  },

  createPost: async(body) => {
    let values, query;

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
        body.endDate,
        body.payment_amt
      ]

      query =
      `INSERT INTO posts (user_id, group_id, content, isEvent, name,
        state, city, zip, startTime, startDate, endTime, endDate, payment_amt)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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
    return

  },

  createComment: async (body) => {
    const values = [
      body.post_id,
      body.user_id,
      body.message
    ]

    const query =
    `INSERT INTO comments (post_id, user_id, message)
    VALUES ($1, $2, $3)
    `

    await pool.query(query, values)
    return
  },

  createPostLike: async(body) => {
    const values = [
      body.post_id,
      body.user_id
    ]

    const query =
    `INSERT INTO post_likes (post_id, user_id)
    VALUES ($1, $2)`

    await pool.query(query, values)
    return
  },

  createCommentLike: async(body) => {
    const values = [
      body.comment_id,
      body.user_id
    ]

    const query =
    `INSERT INTO comment_likes (comment_id, user_id)
    VALUES ($1, $2)`

    await pool.query(query, values)
    return

  },

  createRsvp: async(body) => {
    const values = [
      body.post_id,
      body.user_id,
      body.paid
    ]

    const query =
    `INSERT INTO rsvp (post_id, user_id, paid)
    VALUES ($1, $2, $3)
    `

    await pool.query(query, values)
    return

  },

  deletePost: async (post_id) => {
    const query =
    `DELETE FROM posts
    WHERE id = ${post_id}`

    await pool.query(query)
    return
  },

  deleteComment: async(comment_id) => {
    const query =
    `DELETE FROM comments
    WHERE id = ${comment_id}`

    await pool.query(query);
    return
  },

  deleteRsvp: async(post_id, user_id) => {
    const query =
    `DELETE FROM rsvp
    WHERE post_id = ${post_id}
    AND user_id = ${user_id}
    `

    await pool.query(query)
    return
  },

  // --------------------------------------

  getUserByEmail: async (email) => {
    const query = `
      SELECT
        *
      FROM
        users
      WHERE
        email = '${email}'`;
    let results = await pool.query(query);
    return (results.rows[0]);
  },
  getUserByID: async (id) => {
    const query = `
      SELECT
        *
      FROM
        users
      WHERE
        id = '${id}'`;
    let results = await pool.query(query);
    return (results.rows[0]);
  },

  addUser: (info) => {

    const values = [
      info.firstname,
      info.lastname,
      info.email,
      info.aboutme,
      info.picture
    ];
    console.log(values)

    const query = `
      INSERT INTO
        users
        (firstname, lastname, email, aboutme, picture)
      VALUES
        ($1, $2, $3, $4, $5)`;

    return pool.query(query, values);
  },
  updateUser: (info) => {
    const values = [
      info.firstname,
      info.lastname,
      info.email,
      info.aboutme,
      info.picture,
      info.user_id
    ];

    const query = `
      UPDATE
        users
      SET
        firstname = $1,
        lastname = $2,
        email = $3,
        aboutme = $4,
        picture = $5
      WHERE
        id = $6`;

    return pool.query(query, values);
  },
  getFriendsOfUser: async (id) => {
    const query = `
      (SELECT
        u.firstname,
        u.lastname,
        u.id,
        u.picture,
        f.status
      FROM
        users u
      JOIN
        friends f
      ON
        f.friend1 = '${id}'
      AND
        f.status= true
      WHERE f.friend2 = u.id)
      UNION
      (SELECT
        u.firstname,
        u.lastname,
        u.id,
        u.picture,
        f.status
      FROM
        users u
      JOIN
        friends f
      ON
        f.friend2 = '${id}'
      AND
        f.status = true
      WHERE f.friend1 = u.id)
    ORDER BY
      firstname ASC`;

    const results = await pool.query(query);
    return (results.rows);
  },
  getFriendRequestForUser: () => {

  },
  removeFriend: async (info) => {
    const values = [
      info.user_id,
      info.friend_id
    ];

    const query = `
      DELETE FROM
        friends
      WHERE
        friend1 = $1
      AND
        friend2 = $2
      OR
        friend1 = $2
      AND
        friend2 = $1`;

    return pool.query(query, values);
  },
  getGroupsForUser: async (id) => {
    const query = `
      SELECT
        g.*,
        gm.admin
      FROM
        groups g
      INNER JOIN
        group_members gm
      ON
        gm.user_id = '${id}'
      WHERE
        g.id = gm.group_id`;

    let results = await pool.query(query);
    return (results.rows);
  },
  requestToJoinGroup: (info) => {
    const values = [
      info.group_id,
      info.user_id,
      info.message
    ];

    const query = `
      INSERT INTO
        group_requests
        (group_id, requester_id, message)
      VALUES
        ($1, $2, $3)`;

    return pool.query(query, values);
  },
  addMemberToGroup: (info) => {
    const values = [
      info.group_id,
      info.user_id
    ];

    const addMember = `
      INSERT INTO
        group_members
        (group_id, user_id)
      VALUES
        ($1, $2)`;
    const removeRequest = `
      DELETE FROM
        group_requests
      WHERE
        group_id = $1
      AND
        requester_id = $2`;

    return Promise.all([pool.query(addMember, values), pool.query(removeRequest, values)]);
  },
  removeGroupMember: async (info) => {
    const values = [
      info.group_id,
      info.user_id
    ];

    const query = `
      DELETE FROM
        group_members
      WHERE
        group_id = $1
      AND
        user_id = $2`

    return pool.query(query, values);
  },
  getGroupInfo: async (id) => {
    const query = `
    SELECT
		  g.*,
      json_agg(
        json_build_object(
          'id', m.id,
          'firstName', m.firstname,
          'lastName', m.lastname,
          'picture', m.picture,
          'admin', m.admin
        )) as members
    FROM
      groups g
    INNER JOIN
      (SELECT
        u.id,
        u.firstname,
        u.lastname,
        u.picture,
        gm.group_id,
        gm.admin
      FROM
        users u
      INNER JOIN
        group_members gm
      ON
        gm.user_id = u.id) m
    ON
      m.group_id = g.id
    WHERE
      g.id = '${id}'
    GROUP BY
      g.id, g.state, g.name, g.about, g.city, g.zip`;

    let results = await pool.query(query);
    return (results.rows[0]);
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
        gr.group_id = '${group_id}'`;

    let results = await pool.query(query);
    return (results.rows);
  },
  createGroup: async (info) => {
    const groupValues = [
      info.name,
      info.about,
      info.state,
      info.city,
      info.zip
    ];

    const createGroup = `
      INSERT INTO
        groups
        (name, about, state, city, zip)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING
        id`;

    const group_id = await pool.query(createGroup, groupValues)

    const adminValues = [
      group_id.rows[0].id,
      info.user_id
    ];

    const addAdmin = `
      INSERT INTO
        group_members
        (group_id, user_id, admin)
      VALUES
        ($1, $2, true)`;

    return pool.query(addAdmin, adminValues);
  },
  makeGroupAdmin: (info) => {
    const values = [
      info.group_id,
      info.user_id
    ];

    const query = `
      UPDATE
        group_members
      SET
        admin = true
      WHERE
        group_id = $1
      AND
        user_id = $2`;

    return pool.query(query, values);
  },
  deleteGroup: (group_id) => {
    const query = `
      DELETE FROM groups
      WHERE id = ${group_id}`;

    return pool.query(query);
  },
  getMessages: async (info) => {
    const values = [
      info.user_id,
      info.friend_id
     ];

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
          sender_id = $1
        OR
          receiver_id = $1) as m
      WHERE
        sender_id = $2
      OR
        receiver_id = $2`;
    let results = await pool.query(query, values);
    return (results.rows);

  },
  postMessage: (info) => {
    const values = [
      info.sender_id,
      info.receiver_id,
      info.message
    ];

    const query = `
      INSERT INTO
        messages
        (sender_id, receiver_id, message)
      VALUES
        ($1, $2, $3)`;

    return pool.query(query, values);
  }
}
