import { v4 as uuidV4 } from "uuid";

const _topics = new Map();
export const topic = {
  publish: (name, data) => {
    for (let topic of _topics.values()) {
      if (topic.name !== name) continue;

      topic.callback(data);
    }
  },

  subscribe: (name, callback) => {
    const id = uuidV4();
    _topics.set(id, { id, name, callback });
    return id;
  },

  unsubscribe: (handle) => {
    return _topics.delete(handle);
  }
};
