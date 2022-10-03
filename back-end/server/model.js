const pool = require('../db/postgres.js')

module.exports = {
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
