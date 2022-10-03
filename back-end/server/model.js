const pool = require('../db/postgres.js')

module.exports = {
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
