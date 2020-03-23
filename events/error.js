exports.run = (client, error) => {
// Witty comment here
  client.users.get(`232614905533038593`).send(`Error: ${error.message}`, { split: true });
};
