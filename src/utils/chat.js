export const getConversationId = (user, users) => {
  const loggedUserId = user?.id || user?._id;

  return users[0]?._id === loggedUserId ? users[1]?._id : users[0]?._id;
};

export const getConversationName = (user, users) => {
  const loggedUserId = user?.id || user?._id;

  return users[0]?._id === loggedUserId ? users[1]?.name : users[0]?.name;
};

export const getConversationPicture = (user, users) => {
  const loggedUserId = user?.id || user?._id;

  return users[0]?._id === loggedUserId ? users[1]?.picture : users[0]?.picture;
};
