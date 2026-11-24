type UserSettings = {
  notifications?: boolean;
};

type UserProfile = {
  id: number;
  username: string;
  settings?: UserSettings;
};

const users: UserProfile[] = [
  { id: 1, username: "amina", settings: { notifications: true } },  // notifications set
  { id: 2, username: "brian" },                                     // no settings
  { id: 3, username: "chebet", settings: {} },                      // settings, no notifications
  { id: 4, username: "daudi", settings: { notifications: false } }, // explicitly off
];

function isNotified(user: UserProfile): boolean {
  // ?. stops if settings is missing; ?? turns undefined into false
  return user.settings?.notifications ?? false;
}

for (const user of users) {
  console.log(`User ${user.id} (${user.username}): notifications = ${isNotified(user)}`);
}
