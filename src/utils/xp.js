// Système XP en mémoire (persiste tant que le bot tourne)
// Pour une persistance réelle, utilisez une BDD comme SQLite ou MongoDB Atlas (free)

const xpData = new Map();

function getUser(userId, guildId) {
  const key = `${guildId}-${userId}`;
  if (!xpData.has(key)) {
    xpData.set(key, { xp: 0, level: 1, messages: 0 });
  }
  return xpData.get(key);
}

function xpForLevel(level) {
  return level * level * 100;
}

function addXP(userId, guildId, amount = 10) {
  const user = getUser(userId, guildId);
  user.xp += amount;
  user.messages += 1;

  let leveledUp = false;
  while (user.xp >= xpForLevel(user.level)) {
    user.xp -= xpForLevel(user.level);
    user.level += 1;
    leveledUp = true;
  }

  return { ...user, leveledUp };
}

function getLeaderboard(guildId, limit = 10) {
  const entries = [];
  for (const [key, data] of xpData.entries()) {
    if (key.startsWith(guildId)) {
      const userId = key.replace(`${guildId}-`, '');
      entries.push({ userId, ...data });
    }
  }
  return entries.sort((a, b) => b.level - a.level || b.xp - a.xp).slice(0, limit);
}

module.exports = { getUser, addXP, xpForLevel, getLeaderboard };
