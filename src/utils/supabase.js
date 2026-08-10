const { createClient } = require('@supabase/supabase-js');

// Client Supabase partagé : évite de recréer une connexion à chaque
// commande / vérification Twitch (optimisation).
module.exports = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
