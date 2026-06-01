const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

function xpForLevel(level) {
  return level * level * 100;
}

async function getUser(userId, guildId) {
  const { data } = await supabase
    .from('xp')
    .select('*')
    .eq('guild_id', guildId)
    .eq('user_id', userId)
    .single();

  if (!data) {
    const { data: newUser } = await supabase
      .from('xp')
      .insert({ guild_id: guildId, user_id: userId })
      .select()
      .single();
    return newUser;
  }

  return data;
}

async function addXP(userId, guildId, amount = 10) {
  const user = await getUser(userId, guildId);

  user.xp += amount;
  user.messages += 1;

  let leveledUp = false;
  while (user.xp >= xpForLevel(user.level)) {
    user.xp -= xpForLevel(user.level);
    user.level += 1;
    leveledUp = true;
  }

  await supabase
    .from('xp')
    .update({ xp: user.xp, level: user.level, messages: user.messages })
    .eq('guild_id', guildId)
    .eq('user_id', userId);

  return { ...user, leveledUp };
}

async function getLeaderboard(guildId, limit = 10) {
  const { data } = await supabase
    .from('xp')
    .select('*')
    .eq('guild_id', guildId)
    .order('level', { ascending: false })
    .order('xp', { ascending: false })
    .limit(limit);

  return (data || []).map(row => ({ userId: row.user_id, ...row }));
}

module.exports = { getUser, addXP, xpForLevel, getLeaderboard };