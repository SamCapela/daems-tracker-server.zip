// ============================================================
// GAMEDATA.JS — Données statiques du jeu RPG
// Items, Sorts, Monstres
// ============================================================

// ── RARETÉS ─────────────────────────────────────────────────────────────────
export const RARITY = {
  COMMON:    { id: 'common',    label: 'Commun',    color: '#9ca3af', stats: 1 },
  RARE:      { id: 'rare',      label: 'Rare',      color: '#3b82f6', stats: 2 },
  EPIC:      { id: 'epic',      label: 'Épique',    color: '#a855f7', stats: 3 },
  LEGENDARY: { id: 'legendary', label: 'Légendaire',color: '#f59e0b', stats: 4 },
};

// ── EMOJIS pour affichage "icône" ────────────────────────────────────────────
// Chaque objet a un emoji qui sert de visuel placeholder

// ── ITEMS ────────────────────────────────────────────────────────────────────
// Structure : { id, name, slot, level, rarity, emoji, desc, stats: { force, intel, sagesse, endurance, dextérite, hp, arm, magArm, pa, vitesse } }
// slot : head | chest | boots | weapon

export const ITEMS = [
  // ═══════════════════════════════
  // NIVEAU 1 — SET DU NOOBLARD
  // ═══════════════════════════════
  {
    id: 'noob_head', name: 'Bonnet du Nooblard', slot: 'head', level: 1,
    rarity: 'common', emoji: '🧢', price: 20,
    desc: 'Un bonnet tricoté par ta grand-mère. Ça gratte mais ça protège un peu.',
    stats: { hp: 5 }
  },
  {
    id: 'noob_chest', name: 'Veste du Nooblard', slot: 'chest', level: 1,
    rarity: 'common', emoji: '👕', price: 20,
    desc: 'Une veste en coton délavé. Idéale pour le premier donjon.',
    stats: { arm: 2 }
  },
  {
    id: 'noob_boots', name: 'Claquettes du Nooblard', slot: 'boots', level: 1,
    rarity: 'common', emoji: '🩴', price: 20,
    desc: 'Des claquettes avec des chaussettes. Style 0/10, vitesse meh.',
    stats: { vitesse: 1 }
  },
  {
    id: 'noob_weapon', name: 'Couteau du Nooblard', slot: 'weapon', level: 1,
    rarity: 'common', emoji: '🗡️', price: 20,
    desc: 'Un couteau de cuisine rouillé. Ça fait un peu mal quand même.',
    stats: { force: 2 }
  },

  // ═══════════════════════════════
  // NIVEAU 1 — SET DU CLOWN
  // ═══════════════════════════════
  {
    id: 'clown_head', name: 'Chapeau du Clown', slot: 'head', level: 1,
    rarity: 'common', emoji: '🎩', price: 25,
    desc: 'Un chapeau pointu multicolore. Donne +1 en déconcentration ennemie (non, vraiment).',
    stats: { dexterite: 1 }
  },
  {
    id: 'clown_chest', name: 'Pull du Clown', slot: 'chest', level: 1,
    rarity: 'common', emoji: '🃏', price: 25,
    desc: 'Un pull à pompons. Les monstres rigolent, tu en profites pour les taper.',
    stats: { intel: 1 }
  },
  {
    id: 'clown_boots', name: 'Chaussures du Clown', slot: 'boots', level: 1,
    rarity: 'common', emoji: '👟', price: 25,
    desc: 'Des chaussures qui font couic. Inutile mais mignon.',
    stats: { vitesse: 1 }
  },
  {
    id: 'clown_weapon', name: 'Tromblon du Clown', slot: 'weapon', level: 1,
    rarity: 'common', emoji: '🎺', price: 25,
    desc: 'Une trompette transformée en arme. Le son fait des dégâts soniques... en théorie.',
    stats: { intel: 2 }
  },

  // ═══════════════════════════════
  // NIVEAU 1 — SET DE L'AVENTURIER
  // ═══════════════════════════════
  {
    id: 'adv_head', name: 'Casquette de Scout', slot: 'head', level: 1,
    rarity: 'common', emoji: '⛑️', price: 30,
    desc: 'Pour les explorateurs en herbe. Légère et pratique.',
    stats: { dexterite: 1 }
  },
  {
    id: 'adv_chest', name: 'Chemise de Scout', slot: 'chest', level: 1,
    rarity: 'common', emoji: '🦺', price: 30,
    desc: 'Beaucoup de poches. Utile pour ranger tes dents de monstres.',
    stats: { endurance: 1 }
  },
  {
    id: 'adv_boots', name: 'Bottines de Randonnée', slot: 'boots', level: 1,
    rarity: 'common', emoji: '🥾', price: 30,
    desc: 'Imperméables et solides. Parfaites pour traverser les marais.',
    stats: { vitesse: 1 }
  },
  {
    id: 'adv_weapon', name: 'Fronde de l\'Aventurier', slot: 'weapon', level: 1,
    rarity: 'common', emoji: '⚙️', price: 30,
    desc: 'Une fronde bricolée. Lente mais précise.',
    stats: { dexterite: 2 }
  },

  // ═══════════════════════════════
  // NIVEAU 2 — SET DU GUERRIER DÉBUTANT
  // ═══════════════════════════════
  {
    id: 'warr_head', name: 'Heaume de Fer', slot: 'head', level: 2,
    rarity: 'rare', emoji: '⚔️', price: 60,
    desc: 'Un casque en fer forgé. Lourd mais efficace contre les coups de gourdin.',
    stats: { hp: 10, arm: 3 }
  },
  {
    id: 'warr_chest', name: 'Cuirasse de Fer', slot: 'chest', level: 2,
    rarity: 'rare', emoji: '🛡️', price: 60,
    desc: 'Une armure solide avec des rivets dorés. Tu te sens déjà guerrier.',
    stats: { arm: 5, hp: 8 }
  },
  {
    id: 'warr_boots', name: 'Bottes de Guerre', slot: 'boots', level: 2,
    rarity: 'rare', emoji: '👢', price: 60,
    desc: 'Ferrées et lourdes. Le bruit de tes pas terrorise les gobelins.',
    stats: { endurance: 2, vitesse: 1 }
  },
  {
    id: 'warr_weapon', name: 'Épée Longue de Fer', slot: 'weapon', level: 2,
    rarity: 'rare', emoji: '⚔️', price: 80,
    desc: 'Une lame bien équilibrée. La base de tout bon guerrier.',
    stats: { force: 4, dexterite: 1 }
  },

  // ═══════════════════════════════
  // NIVEAU 2 — SET DU MAGE APPRENTI
  // ═══════════════════════════════
  {
    id: 'mage2_head', name: 'Chapeau Pointu Bleu', slot: 'head', level: 2,
    rarity: 'rare', emoji: '🎓', price: 65,
    desc: 'Le chapeau classique du mage en herbe. Brodé d\'étoiles maladroites.',
    stats: { intel: 3, magArm: 2 }
  },
  {
    id: 'mage2_chest', name: 'Robe Azurée', slot: 'chest', level: 2,
    rarity: 'rare', emoji: '🔵', price: 65,
    desc: 'Légère et confortable. Les runes brodées amplifient légèrement les sorts.',
    stats: { intel: 4, magArm: 3 }
  },
  {
    id: 'mage2_boots', name: 'Sandales du Mage', slot: 'boots', level: 2,
    rarity: 'rare', emoji: '🩰', price: 55,
    desc: 'Des sandales enchantées qui flottent légèrement au sol.',
    stats: { vitesse: 3, pa: 1 }
  },
  {
    id: 'mage2_weapon', name: 'Baguette de Bouleau', slot: 'weapon', level: 2,
    rarity: 'rare', emoji: '🪄', price: 80,
    desc: 'La première baguette d\'un vrai mage. Simple mais efficace.',
    stats: { intel: 5, pa: 1 }
  },

  // ═══════════════════════════════
  // NIVEAU 2 — SET DU VOLEUR URBAIN
  // ═══════════════════════════════
  {
    id: 'rogue2_head', name: 'Capuche du Voleur', slot: 'head', level: 2,
    rarity: 'rare', emoji: '🪭', price: 55,
    desc: 'Une capuche sombre qui dissimule ton visage dans l\'ombre.',
    stats: { dexterite: 3, vitesse: 1 }
  },
  {
    id: 'rogue2_chest', name: 'Veste de Cuir Sombre', slot: 'chest', level: 2,
    rarity: 'rare', emoji: '🧥', price: 60,
    desc: 'Du cuir souple et silencieux. Parfait pour se faufiler.',
    stats: { dexterite: 2, arm: 3 }
  },
  {
    id: 'rogue2_boots', name: 'Bottes Silencieuses', slot: 'boots', level: 2,
    rarity: 'rare', emoji: '🥿', price: 55,
    desc: 'Semelles en laine de mouton. Aucun bruit. Aucun.',
    stats: { vitesse: 4, dexterite: 1 }
  },
  {
    id: 'rogue2_weapon', name: 'Dague Jumelles', slot: 'weapon', level: 2,
    rarity: 'rare', emoji: '🔪', price: 80,
    desc: 'Deux dagues légères à lancer ou à poignarder. Double le fun.',
    stats: { force: 3, dexterite: 3 }
  },

  // ═══════════════════════════════
  // NIVEAU 3 — SET DU PALADIN
  // ═══════════════════════════════
  {
    id: 'paladin_head', name: 'Heaume Sacré', slot: 'head', level: 3,
    rarity: 'epic', emoji: '✨', price: 150,
    desc: 'Un heaume béni par un prêtre de rang 4. Brille dans le noir.',
    stats: { hp: 20, arm: 5, sagesse: 2 }
  },
  {
    id: 'paladin_chest', name: 'Armure Sacrée', slot: 'chest', level: 3,
    rarity: 'epic', emoji: '🛡️', price: 180,
    desc: 'Gravée de symboles divins. Réduit les dégâts magiques et physiques.',
    stats: { arm: 8, magArm: 5, hp: 15 }
  },
  {
    id: 'paladin_boots', name: 'Sandales de Justice', slot: 'boots', level: 3,
    rarity: 'epic', emoji: '👡', price: 130,
    desc: 'Forgées dans du marbre blanc céleste. Trop stylées pour être efficaces... mais elles le sont quand même.',
    stats: { vitesse: 3, sagesse: 3, endurance: 2 }
  },
  {
    id: 'paladin_weapon', name: 'Marteau de Lumière', slot: 'weapon', level: 3,
    rarity: 'epic', emoji: '🔨', price: 220,
    desc: 'Un marteau qui brille d\'une lumière dorée. Fait des dégâts saints.',
    stats: { force: 6, sagesse: 4, dexterite: 2 }
  },

  // ═══════════════════════════════
  // NIVEAU 3 — SET DU NÉCROMANCIEN
  // ═══════════════════════════════
  {
    id: 'necro_head', name: 'Crâne de Liche', slot: 'head', level: 3,
    rarity: 'epic', emoji: '💀', price: 160,
    desc: 'Porter un crâne sur la tête c\'est chelou mais ça donne du style.',
    stats: { intel: 6, magArm: 4, hp: 8 }
  },
  {
    id: 'necro_chest', name: 'Robe des Morts', slot: 'chest', level: 3,
    rarity: 'epic', emoji: '🖤', price: 170,
    desc: 'Cousue avec des fils d\'âmes. Amplifie les sorts nécrotiques.',
    stats: { intel: 8, magArm: 6, arm: 2 }
  },
  {
    id: 'necro_boots', name: 'Bottes Osseuses', slot: 'boots', level: 3,
    rarity: 'epic', emoji: '🦴', price: 140,
    desc: 'Fabriquées avec des os de squelettes. Légères et solides.',
    stats: { vitesse: 4, intel: 3, pa: 2 }
  },
  {
    id: 'necro_weapon', name: 'Sceptre des Âmes', slot: 'weapon', level: 3,
    rarity: 'epic', emoji: '🔮', price: 230,
    desc: 'Les âmes piégées dans ce sceptre amplifient chaque sort.',
    stats: { intel: 9, pa: 3, magArm: 3 }
  },

  // ═══════════════════════════════
  // NIVEAU 3 — SET DE L'ARCHÈRE
  // ═══════════════════════════════
  {
    id: 'archer_head', name: 'Capuche de Sylve', slot: 'head', level: 3,
    rarity: 'epic', emoji: '🌿', price: 145,
    desc: 'Faite en feuilles d\'arbre sacré. Camouflage naturel parfait.',
    stats: { dexterite: 6, vitesse: 3, endurance: 2 }
  },
  {
    id: 'archer_chest', name: 'Manteau de Sylve', slot: 'chest', level: 3,
    rarity: 'epic', emoji: '🌲', price: 165,
    desc: 'Léger et résistant. Taillé dans le bois d\'arbre-fée.',
    stats: { dexterite: 5, arm: 4, vitesse: 2 }
  },
  {
    id: 'archer_boots', name: 'Bottes de Chasseresse', slot: 'boots', level: 3,
    rarity: 'epic', emoji: '🦌', price: 140,
    desc: 'Légères comme le vent. Tu cours, tu sautes, tu voles presque.',
    stats: { vitesse: 6, dexterite: 4, pa: 1 }
  },
  {
    id: 'archer_weapon', name: 'Arc de Sylve', slot: 'weapon', level: 3,
    rarity: 'epic', emoji: '🏹', price: 220,
    desc: 'Un arc en bois enchanté qui ne rate jamais sa cible.',
    stats: { dexterite: 8, force: 4, vitesse: 2 }
  },

  // ═══════════════════════════════
  // NIVEAU 4 — SET DU BERSERKER
  // ═══════════════════════════════
  {
    id: 'berserk_head', name: 'Masque de Rage', slot: 'head', level: 4,
    rarity: 'epic', emoji: '😡', price: 320,
    desc: 'Un masque en fer peint en rouge. Met le porteur dans un état de frénésie.',
    stats: { force: 10, hp: 20, endurance: 4 }
  },
  {
    id: 'berserk_chest', name: 'Plastron Sanguin', slot: 'chest', level: 4,
    rarity: 'epic', emoji: '🩸', price: 350,
    desc: 'Une armure tâchée de sang de dragon. Absorbe la douleur.',
    stats: { force: 8, arm: 10, hp: 25 }
  },
  {
    id: 'berserk_boots', name: 'Bottes de Fureur', slot: 'boots', level: 4,
    rarity: 'epic', emoji: '🔥', price: 290,
    desc: 'Ces bottes t\'empêchent de fuir. Tu avances toujours vers l\'ennemi.',
    stats: { force: 6, vitesse: 5, endurance: 5 }
  },
  {
    id: 'berserk_weapon', name: 'Hache à Deux Mains de la Rage', slot: 'weapon', level: 4,
    rarity: 'epic', emoji: '🪓', price: 420,
    desc: 'Une hache géante tachée de l\'essence de 1000 combats.',
    stats: { force: 14, endurance: 5, dexterite: 3 }
  },

  // ═══════════════════════════════
  // NIVEAU 4 — SET DE L'ARCHIMAGE
  // ═══════════════════════════════
  {
    id: 'archmage_head', name: 'Tiare de l\'Archimage', slot: 'head', level: 4,
    rarity: 'legendary', emoji: '👑', price: 500,
    desc: 'La couronne des maîtres de la magie. Augmente drastiquement la puissance des sorts.',
    stats: { intel: 12, magArm: 8, pa: 3, vitesse: 2 }
  },
  {
    id: 'archmage_chest', name: 'Robe de l\'Archimage', slot: 'chest', level: 4,
    rarity: 'legendary', emoji: '🔷', price: 550,
    desc: 'Tissée de magie pure. Tes sorts passent à travers les résistances ennemies.',
    stats: { intel: 14, magArm: 10, pa: 4, hp: 15 }
  },
  {
    id: 'archmage_boots', name: 'Pantoufles de l\'Archimage', slot: 'boots', level: 4,
    rarity: 'legendary', emoji: '✨', price: 400,
    desc: 'Des pantoufles ? Oui, des pantoufles. Mais enchantées par les dieux.',
    stats: { vitesse: 7, intel: 8, pa: 3, magArm: 4 }
  },
  {
    id: 'archmage_weapon', name: 'Orbe du Destin', slot: 'weapon', level: 4,
    rarity: 'legendary', emoji: '🌐', price: 650,
    desc: 'Un orbe qui contient l\'essence de l\'univers. Les sorts sont 50% plus puissants.',
    stats: { intel: 16, pa: 5, magArm: 6, vitesse: 3 }
  },

  // ═══════════════════════════════
  // NIVEAU 4 — SET DU PRÊTRE-ROI
  // ═══════════════════════════════
  {
    id: 'priest4_head', name: 'Mitre Royale', slot: 'head', level: 4,
    rarity: 'epic', emoji: '⛪', price: 380,
    desc: 'La coiffe des grands prêtres. Renforce les soins et la résistance.',
    stats: { sagesse: 10, hp: 18, magArm: 6 }
  },
  {
    id: 'priest4_chest', name: 'Aube Sacrée', slot: 'chest', level: 4,
    rarity: 'epic', emoji: '🌟', price: 400,
    desc: 'Une robe brillante portée lors des grandes cérémonies.',
    stats: { sagesse: 12, hp: 22, magArm: 8 }
  },
  {
    id: 'priest4_boots', name: 'Souliers Bénis', slot: 'boots', level: 4,
    rarity: 'epic', emoji: '🪷', price: 340,
    desc: 'Chaque pas guérit légèrement les alliés autour de toi.',
    stats: { sagesse: 8, vitesse: 4, pa: 2 }
  },
  {
    id: 'priest4_weapon', name: 'Sceptre de la Vie', slot: 'weapon', level: 4,
    rarity: 'epic', emoji: '🌿', price: 480,
    desc: 'Le sceptre des guérisseurs légendaires. Chaque sort de soin est amplifié.',
    stats: { sagesse: 14, hp: 15, pa: 3 }
  },

  // ═══════════════════════════════
  // NIVEAU 5 — SET DU DRAGON-ROI
  // ═══════════════════════════════
  {
    id: 'dragon_head', name: 'Casque du Dragon-Roi', slot: 'head', level: 5,
    rarity: 'legendary', emoji: '🐲', price: 1000,
    desc: 'Forgé avec l\'écaille d\'un dragon rouge ancien. Résiste à tout.',
    stats: { force: 12, arm: 15, hp: 30, dexterite: 3 }
  },
  {
    id: 'dragon_chest', name: 'Armure Draconique', slot: 'chest', level: 5,
    rarity: 'legendary', emoji: '🛡️', price: 1200,
    desc: 'Chaque écaille est une armure en soi. Quasi-indestructible.',
    stats: { arm: 20, magArm: 10, hp: 40, endurance: 5 }
  },
  {
    id: 'dragon_boots', name: 'Griffes du Dragon', slot: 'boots', level: 5,
    rarity: 'legendary', emoji: '🐾', price: 900,
    desc: 'Des bottes munies de griffes draconiques. Tu cours ET tu griffen.',
    stats: { vitesse: 8, force: 6, dexterite: 7, endurance: 3 }
  },
  {
    id: 'dragon_weapon', name: 'Lance-Flammes du Dragon', slot: 'weapon', level: 5,
    rarity: 'legendary', emoji: '🔱', price: 1500,
    desc: 'L\'arme ultime. Crache du feu à chaque attaque.',
    stats: { force: 20, intel: 10, dexterite: 6, vitesse: 4 }
  },

  // ═══════════════════════════════
  // NIVEAU 5 — SET DU FANTÔME CÉLESTE
  // ═══════════════════════════════
  {
    id: 'ghost_head', name: 'Voile du Néant', slot: 'head', level: 5,
    rarity: 'legendary', emoji: '👻', price: 950,
    desc: 'Un voile qui te rend semi-intangible. Les attaques passent parfois à travers.',
    stats: { dexterite: 12, magArm: 12, vitesse: 6, pa: 4 }
  },
  {
    id: 'ghost_chest', name: 'Linceul Astral', slot: 'chest', level: 5,
    rarity: 'legendary', emoji: '🌫️', price: 1100,
    desc: 'Un vêtement qui n\'existe qu\'à moitié dans ce plan. Très cool.',
    stats: { magArm: 15, dexterite: 10, pa: 5, vitesse: 5 }
  },
  {
    id: 'ghost_boots', name: 'Semelles du Néant', slot: 'boots', level: 5,
    rarity: 'legendary', emoji: '💨', price: 880,
    desc: 'Tu glisses sur le sol comme un fantôme. Vitesse inégalée.',
    stats: { vitesse: 12, dexterite: 8, pa: 4, arm: 5 }
  },
  {
    id: 'ghost_weapon', name: 'Lame Astrale', slot: 'weapon', level: 5,
    rarity: 'legendary', emoji: '⚡', price: 1400,
    desc: 'Une lame qui fend le tissu de la réalité. Ignore 20% de l\'armure.',
    stats: { intel: 12, dexterite: 14, force: 8, pa: 5 }
  },

  // ═══════════════════════════════
  // NIVEAU 5 — SET DU GRAND PRÊTRE
  // ═══════════════════════════════
  {
    id: 'highpriest_head', name: 'Auréole du Grand Prêtre', slot: 'head', level: 5,
    rarity: 'legendary', emoji: '😇', price: 1000,
    desc: 'Un cercle de lumière divine flottant au-dessus de ta tête. Ça fait peur aux morts-vivants.',
    stats: { sagesse: 16, hp: 30, magArm: 10, pa: 3 }
  },
  {
    id: 'highpriest_chest', name: 'Vêtement Divin', slot: 'chest', level: 5,
    rarity: 'legendary', emoji: '🌈', price: 1150,
    desc: 'Tissé par les dieux eux-mêmes. Chaque soin soigne doublement.',
    stats: { sagesse: 18, hp: 35, magArm: 12, pa: 4 }
  },
  {
    id: 'highpriest_boots', name: 'Sandales de la Résurrection', slot: 'boots', level: 5,
    rarity: 'legendary', emoji: '☁️', price: 950,
    desc: 'Tu marches littéralement sur des nuages. Et tu ressuscites parfois.',
    stats: { sagesse: 12, vitesse: 6, pa: 5, hp: 20 }
  },
  {
    id: 'highpriest_weapon', name: 'Bâton du Firmament', slot: 'weapon', level: 5,
    rarity: 'legendary', emoji: '⭐', price: 1500,
    desc: 'Le bâton suprême du guérisseur. Les soins sont MASSIFS.',
    stats: { sagesse: 20, pa: 6, hp: 25, magArm: 8 }
  },
];

// ── SORTS ────────────────────────────────────────────────────────────────────
// Structure : { id, name, class, level_base, emoji, desc, effects, cooldown_base, type }
// type : damage | heal | buff | debuff
// effects : description textuelle des effets par niveau (niveau 1 à 5)
// Les valeurs réelles sont calculées côté client avec la formule : base + (spellLevel-1)*growth

export const SPELLS = [
  // ════════════════════════════════════════════════════
  // GUERRIER (Warrior)
  // ════════════════════════════════════════════════════
  {
    id: 'warrior_slash', name: 'Taillade', class: 'warrior',
    emoji: '⚔️', type: 'damage',
    desc: 'Un coup d\'épée puissant qui tranche l\'ennemi.',
    dmgStat: 'force', dmgBase: 15, dmgGrowth: 8,
    cooldown_base: 8000, cooldown_reduction: 300,
    effects: ['15 dégâts physiques', '23 dégâts', '31 dégâts', '39 dégâts', '47 dégâts + saignement'],
  },
  {
    id: 'warrior_shield_bash', name: 'Coup de Bouclier', class: 'warrior',
    emoji: '🛡️', type: 'damage',
    desc: 'Fracasse l\'ennemi avec ton bouclier, l\'étourdissant brièvement.',
    dmgStat: 'force', dmgBase: 10, dmgGrowth: 5,
    cooldown_base: 12000, cooldown_reduction: 400,
    effects: ['10 dégâts + Étourdissement 1s', '15 dégâts + Étourdissement 1.5s', '20 dégâts + Étourdissement 2s', '25 dégâts + Étourdissement 2.5s', '30 dégâts + Étourdissement 3s + -ARM'],
  },
  {
    id: 'warrior_war_cry', name: 'Cri de Guerre', class: 'warrior',
    emoji: '😤', type: 'buff',
    desc: 'Un cri puissant qui booste ton attaque pendant quelques secondes.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 20000, cooldown_reduction: 500,
    effects: ['+20% Force 5s', '+30% Force 6s', '+40% Force 7s', '+50% Force 8s', '+60% Force 10s + Immunité à la peur'],
  },
  {
    id: 'warrior_berserker_rage', name: 'Furie du Berserker', class: 'warrior',
    emoji: '😡', type: 'buff',
    desc: 'Tu entres dans une rage incontrôlée. Plus tu prends de dégâts, plus tu es fort.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 30000, cooldown_reduction: 800,
    effects: ['+5% Force par % de vie perdue, 8s', '+6%... 10s', '+7%... 12s', '+8%... 15s', '+10%... 20s + invincibilité 2s'],
  },
  {
    id: 'warrior_whirlwind', name: 'Tourbillon', class: 'warrior',
    emoji: '🌀', type: 'damage',
    desc: 'Tu tournes sur toi-même en frappant tout autour.',
    dmgStat: 'force', dmgBase: 20, dmgGrowth: 10,
    cooldown_base: 15000, cooldown_reduction: 500,
    effects: ['20 dégâts (zone)', '30 dégâts', '40 dégâts', '50 dégâts', '60 dégâts + repousse les ennemis'],
  },
  {
    id: 'warrior_charge', name: 'Charge', class: 'warrior',
    emoji: '💨', type: 'damage',
    desc: 'Tu charges l\'ennemi à toute vitesse et le renverse.',
    dmgStat: 'force', dmgBase: 25, dmgGrowth: 12,
    cooldown_base: 18000, cooldown_reduction: 600,
    effects: ['25 dégâts + Chute', '37 dégâts + Chute', '49 dégâts + Chute 1.5s', '61 dégâts + Chute 2s', '73 dégâts + Chute 3s + Trauma'],
  },
  {
    id: 'warrior_iron_skin', name: 'Peau de Fer', class: 'warrior',
    emoji: '⚙️', type: 'buff',
    desc: 'Tu durcis ta peau comme du métal, réduisant les dégâts reçus.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 25000, cooldown_reduction: 700,
    effects: ['-20% dégâts reçus 6s', '-25%... 7s', '-30%... 8s', '-35%... 10s', '-40%... 12s + Renvoi de dégâts 10%'],
  },
  {
    id: 'warrior_execute', name: 'Exécution', class: 'warrior',
    emoji: '💀', type: 'damage',
    desc: 'Un coup dévastateur sur un ennemi affaibli. Plus efficace sous 30% de vie.',
    dmgStat: 'force', dmgBase: 40, dmgGrowth: 20,
    cooldown_base: 22000, cooldown_reduction: 700,
    effects: ['40 dégâts (x2 si ennemi <30%PV)', '60 dégâts', '80 dégâts', '100 dégâts', '120 dégâts (x3 si ennemi <30%PV)'],
  },
  {
    id: 'warrior_battle_shout', name: 'Clameur de Bataille', class: 'warrior',
    emoji: '📣', type: 'buff',
    desc: 'Un cri qui augmente la vitesse d\'attaque de toute la team.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 35000, cooldown_reduction: 1000,
    effects: ['+15% vitesse team 8s', '+20%... 10s', '+25%... 12s', '+30%... 15s', '+40%... 20s + +15% dégâts'],
  },
  {
    id: 'warrior_last_stand', name: 'Dernier Rempart', class: 'warrior',
    emoji: '🏳️', type: 'buff',
    desc: 'Face à la mort, tu trouves une force insoupçonnée.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 60000, cooldown_reduction: 2000,
    effects: ['Quand PV <20%, +50% stats 5s', '...+60% 6s', '...+70% 7s', '...+80% 8s', '...+100% stats 10s + immunité mort 1s'],
  },

  // ════════════════════════════════════════════════════
  // VOLEUR (Rogue)
  // ════════════════════════════════════════════════════
  {
    id: 'rogue_backstab', name: 'Coup dans le Dos', class: 'rogue',
    emoji: '🗡️', type: 'damage',
    desc: 'Une attaque traîtresse dans le dos de l\'ennemi. Énorme dégâts si en position.',
    dmgStat: 'dexterite', dmgBase: 30, dmgGrowth: 15,
    cooldown_base: 10000, cooldown_reduction: 400,
    effects: ['30 dégâts (+50% si dos)', '45 dégâts', '60 dégâts', '75 dégâts', '90 dégâts (+100% si dos)'],
  },
  {
    id: 'rogue_poison', name: 'Lame Empoisonnée', class: 'rogue',
    emoji: '☠️', type: 'damage',
    desc: 'Enduire ta lame de poison pour des dégâts continus.',
    dmgStat: 'dexterite', dmgBase: 8, dmgGrowth: 4,
    cooldown_base: 12000, cooldown_reduction: 400,
    effects: ['8 dégâts/s pendant 5s', '12 dégâts/s 5s', '16 dégâts/s 6s', '20 dégâts/s 7s', '24 dégâts/s 8s + affaiblissement'],
  },
  {
    id: 'rogue_shadow_step', name: 'Pas de l\'Ombre', class: 'rogue',
    emoji: '🌑', type: 'buff',
    desc: 'Tu te téléportes derrière l\'ennemi instantanément.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 15000, cooldown_reduction: 500,
    effects: ['Téléportation + 15% esquive 3s', '...+20% 4s', '...+25% 5s', '...+30% 5s', '...+35% 6s + invisible 1s'],
  },
  {
    id: 'rogue_smoke_bomb', name: 'Bombe Fumigène', class: 'rogue',
    emoji: '💨', type: 'debuff',
    desc: 'Lance une bombe qui aveugle l\'ennemi.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 18000, cooldown_reduction: 600,
    effects: ['Aveugle ennemi 2s', '2.5s', '3s', '3.5s', '4s + réduit sa précision 50%'],
  },
  {
    id: 'rogue_fan_blades', name: 'Éventail de Lames', class: 'rogue',
    emoji: '🔪', type: 'damage',
    desc: 'Lancer plusieurs dagues en éventail.',
    dmgStat: 'dexterite', dmgBase: 12, dmgGrowth: 6,
    cooldown_base: 14000, cooldown_reduction: 400,
    effects: ['3×12 dégâts', '3×18 dégâts', '4×18 dégâts', '4×24 dégâts', '5×24 dégâts + empoisonnement'],
  },
  {
    id: 'rogue_evasion', name: 'Évasion', class: 'rogue',
    emoji: '🌪️', type: 'buff',
    desc: 'Active un état d\'esquive totale pendant quelques secondes.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 25000, cooldown_reduction: 800,
    effects: ['100% esquive 2s', '2.5s', '3s', '3.5s', '4s + contre-attaque si esquive'],
  },
  {
    id: 'rogue_garrote', name: 'Garrot', class: 'rogue',
    emoji: '🧵', type: 'damage',
    desc: 'Étrangle l\'ennemi pour des dégâts massifs et le réduire au silence.',
    dmgStat: 'dexterite', dmgBase: 35, dmgGrowth: 15,
    cooldown_base: 20000, cooldown_reduction: 600,
    effects: ['35 dégâts + silence 2s', '50 dégâts + silence 2.5s', '65 dégâts + silence 3s', '80 dégâts + silence 3.5s', '95 dégâts + silence 5s + saignement'],
  },
  {
    id: 'rogue_mark', name: 'Marque de la Proie', class: 'rogue',
    emoji: '🎯', type: 'debuff',
    desc: 'Marque l\'ennemi pour augmenter les dégâts que la team lui inflige.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 22000, cooldown_reduction: 700,
    effects: ['+20% dégâts sur cible 6s', '+25% 8s', '+30% 10s', '+35% 12s', '+50% 15s + expose armure'],
  },
  {
    id: 'rogue_sprint', name: 'Sprint', class: 'rogue',
    emoji: '💨', type: 'buff',
    desc: 'Sprinte à toute allure pour esquiver ou repositionner.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 12000, cooldown_reduction: 300,
    effects: ['+100% vitesse 2s', '3s', '4s', '5s', '6s + immunité aux dégâts de zone'],
  },
  {
    id: 'rogue_death_mark', name: 'Marque de Mort', class: 'rogue',
    emoji: '💀', type: 'damage',
    desc: 'Un sort maudit qui exécute l\'ennemi après un délai.',
    dmgStat: 'dexterite', dmgBase: 100, dmgGrowth: 50,
    cooldown_base: 60000, cooldown_reduction: 2000,
    effects: ['Tue ennemi à 100 dégâts max après 5s', '150... 4s', '200... 3s', '250... 2s', '300 dégâts instantané'],
  },

  // ════════════════════════════════════════════════════
  // MAGE (Mage)
  // ════════════════════════════════════════════════════
  {
    id: 'mage_fireball', name: 'Boule de Feu', class: 'mage',
    emoji: '🔥', type: 'damage',
    desc: 'Lance une boule de feu explosive sur l\'ennemi.',
    dmgStat: 'intel', dmgBase: 25, dmgGrowth: 12,
    cooldown_base: 10000, cooldown_reduction: 350,
    effects: ['25 dégâts de feu', '37 dégâts', '49 dégâts', '61 dégâts', '73 dégâts + brûlure 3s'],
  },
  {
    id: 'mage_frost_bolt', name: 'Trait de Givre', class: 'mage',
    emoji: '❄️', type: 'damage',
    desc: 'Un rayon de glace qui ralentit l\'ennemi.',
    dmgStat: 'intel', dmgBase: 20, dmgGrowth: 10,
    cooldown_base: 9000, cooldown_reduction: 300,
    effects: ['20 dégâts + ralentit 30% 2s', '30 dégâts + 40% 2s', '40 dégâts + 50% 3s', '50 dégâts + 60% 3s', '60 dégâts + gel 2s'],
  },
  {
    id: 'mage_arcane_blast', name: 'Explosion Arcanique', class: 'mage',
    emoji: '💥', type: 'damage',
    desc: 'Une explosion d\'énergie pure qui ignore les résistances.',
    dmgStat: 'intel', dmgBase: 35, dmgGrowth: 15,
    cooldown_base: 14000, cooldown_reduction: 400,
    effects: ['35 dégâts arcaniques (ignore ARM)', '50 dégâts', '65 dégâts', '80 dégâts', '95 dégâts + affaiblissement magique'],
  },
  {
    id: 'mage_mana_shield', name: 'Bouclier de Mana', class: 'mage',
    emoji: '🔵', type: 'buff',
    desc: 'Crée un bouclier qui absorbe les dégâts en consommant du mana.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 20000, cooldown_reduction: 600,
    effects: ['Absorbe 50 dégâts', '75 dégâts', '100 dégâts', '125 dégâts', '150 dégâts + renvoi 20% dégâts'],
  },
  {
    id: 'mage_chain_lightning', name: 'Foudre en Chaîne', class: 'mage',
    emoji: '⚡', type: 'damage',
    desc: 'Un éclair qui rebondit sur plusieurs ennemis.',
    dmgStat: 'intel', dmgBase: 30, dmgGrowth: 14,
    cooldown_base: 16000, cooldown_reduction: 500,
    effects: ['30 dégâts (rebondit 2×)', '44 dégâts (3×)', '58 dégâts (4×)', '72 dégâts (5×)', '86 dégâts (6×) + paralysie'],
  },
  {
    id: 'mage_time_warp', name: 'Distorsion Temporelle', class: 'mage',
    emoji: '⏳', type: 'buff',
    desc: 'Ralentit le temps autour de toi, réduisant tous les cooldowns.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 35000, cooldown_reduction: 1000,
    effects: ['-30% cooldowns 5s', '-40%... 6s', '-50%... 7s', '-60%... 8s', '-70%... 10s + hâte permanente'],
  },
  {
    id: 'mage_meteor', name: 'Météore', class: 'mage',
    emoji: '☄️', type: 'damage',
    desc: 'Fait tomber un météore sur l\'ennemi. Lent mais dévastateur.',
    dmgStat: 'intel', dmgBase: 80, dmgGrowth: 35,
    cooldown_base: 30000, cooldown_reduction: 900,
    effects: ['80 dégâts de feu (zone)', '115 dégâts', '150 dégâts', '185 dégâts', '220 dégâts + stun 2s'],
  },
  {
    id: 'mage_polymorph', name: 'Métamorphose', class: 'mage',
    emoji: '🐑', type: 'debuff',
    desc: 'Transforme l\'ennemi en mouton pendant quelques secondes.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 25000, cooldown_reduction: 800,
    effects: ['Mouton 2s', '2.5s', '3s', '3.5s', '5s + vulnérabilité magique après'],
  },
  {
    id: 'mage_ice_nova', name: 'Nova de Glace', class: 'mage',
    emoji: '🌨️', type: 'damage',
    desc: 'Une explosion de glace qui gèle tout autour de toi.',
    dmgStat: 'intel', dmgBase: 45, dmgGrowth: 20,
    cooldown_base: 22000, cooldown_reduction: 700,
    effects: ['45 dégâts + gel 1.5s (zone)', '65 dégâts + 2s', '85 dégâts + 2.5s', '105 dégâts + 3s', '125 dégâts + gel 4s + fragilisation'],
  },
  {
    id: 'mage_arcane_mastery', name: 'Maîtrise Arcanique', class: 'mage',
    emoji: '🌟', type: 'buff',
    desc: 'Active un état de pure maîtrise magique.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 60000, cooldown_reduction: 2000,
    effects: ['+50% dégâts magiques 8s', '+65%... 10s', '+80%... 12s', '+95%... 15s', '+120% dégâts + sorts gratuits 10s'],
  },

  // ════════════════════════════════════════════════════
  // PRÊTRE (Priest)
  // ════════════════════════════════════════════════════
  {
    id: 'priest_heal', name: 'Soin', class: 'priest',
    emoji: '💚', type: 'heal',
    desc: 'Soigne une bonne partie de tes PV perdus.',
    dmgStat: 'sagesse', dmgBase: 30, dmgGrowth: 15,
    cooldown_base: 10000, cooldown_reduction: 350,
    effects: ['Soin de 30 PV', '45 PV', '60 PV', '75 PV', '90 PV + régénération 5 PV/s 5s'],
  },
  {
    id: 'priest_holy_light', name: 'Lumière Sacrée', class: 'priest',
    emoji: '☀️', type: 'damage',
    desc: 'Un rayon de lumière sacrée qui brûle les monstres maléfiques.',
    dmgStat: 'sagesse', dmgBase: 20, dmgGrowth: 10,
    cooldown_base: 9000, cooldown_reduction: 300,
    effects: ['20 dégâts sacrés', '30 dégâts', '40 dégâts', '50 dégâts', '60 dégâts + aveugle 1s'],
  },
  {
    id: 'priest_shield', name: 'Bouclier Divin', class: 'priest',
    emoji: '🌟', type: 'buff',
    desc: 'Crée un bouclier protecteur qui absorbe les prochains dégâts.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 15000, cooldown_reduction: 500,
    effects: ['Absorbe 40 dégâts 4s', '60 dégâts 5s', '80 dégâts 6s', '100 dégâts 7s', '120 dégâts 8s + réflexion 15%'],
  },
  {
    id: 'priest_mass_heal', name: 'Soin de Masse', class: 'priest',
    emoji: '💗', type: 'heal',
    desc: 'Soigne tous les participants au combat simultanément.',
    dmgStat: 'sagesse', dmgBase: 15, dmgGrowth: 8,
    cooldown_base: 20000, cooldown_reduction: 600,
    effects: ['Soin 15 PV tous', '23 PV', '31 PV', '39 PV', '47 PV tous + bouclier 20 PV'],
  },
  {
    id: 'priest_smite', name: 'Châtiment', class: 'priest',
    emoji: '⚡', type: 'damage',
    desc: 'La colère divine s\'abat sur l\'ennemi.',
    dmgStat: 'sagesse', dmgBase: 35, dmgGrowth: 18,
    cooldown_base: 14000, cooldown_reduction: 400,
    effects: ['35 dégâts sacrés + debuff ARM', '53 dégâts', '71 dégâts', '89 dégâts', '107 dégâts + réduit ARM 20%'],
  },
  {
    id: 'priest_regen', name: 'Régénération', class: 'priest',
    emoji: '🌿', type: 'heal',
    desc: 'Active une régénération continue de tes points de vie.',
    dmgStat: 'sagesse', dmgBase: 5, dmgGrowth: 3,
    cooldown_base: 18000, cooldown_reduction: 500,
    effects: ['5 PV/s pendant 10s', '8 PV/s... 10s', '11 PV/s... 12s', '14 PV/s... 12s', '17 PV/s 15s + +ARM pendant regen'],
  },
  {
    id: 'priest_dispel', name: 'Dissipation', class: 'priest',
    emoji: '✨', type: 'debuff',
    desc: 'Supprime tous les effets négatifs et soigne légèrement.',
    dmgStat: 'sagesse', dmgBase: 20, dmgGrowth: 10,
    cooldown_base: 22000, cooldown_reduction: 700,
    effects: ['Retire debuffs + 20 PV', '+ 30 PV', '+ 40 PV', '+ 50 PV', '+ 60 PV + immunité debuff 3s'],
  },
  {
    id: 'priest_divine_wrath', name: 'Courroux Divin', class: 'priest',
    emoji: '🌩️', type: 'damage',
    desc: 'Invoque la foudre divine sur l\'ennemi pour des dégâts massifs.',
    dmgStat: 'sagesse', dmgBase: 60, dmgGrowth: 28,
    cooldown_base: 28000, cooldown_reduction: 800,
    effects: ['60 dégâts (stun 1s)', '88 dégâts (stun 1.5s)', '116 dégâts (2s)', '144 dégâts (2s)', '172 dégâts (stun 3s + vulnérabilité)'],
  },
  {
    id: 'priest_sanctuary', name: 'Sanctuaire', class: 'priest',
    emoji: '⛪', type: 'buff',
    desc: 'Crée un sanctuaire temporaire qui soigne et protège.',
    dmgStat: 'sagesse', dmgBase: 10, dmgGrowth: 5,
    cooldown_base: 35000, cooldown_reduction: 1000,
    effects: ['10 PV/s + -25% dégâts reçus 8s', '15 PV/s... 10s', '20 PV/s... 12s', '25 PV/s... 15s', '30 PV/s + immunité 15s'],
  },
  {
    id: 'priest_resurrection', name: 'Résurrection', class: 'priest',
    emoji: '💫', type: 'buff',
    desc: 'La capacité ultime : si tu meurs, tu reviens avec une partie de ta vie.',
    dmgStat: null, dmgBase: 0, dmgGrowth: 0,
    cooldown_base: 120000, cooldown_reduction: 3000,
    effects: ['Reviens avec 20% PV si tu meurs (1 fois)', '25% PV', '30% PV', '40% PV', '50% PV + immunité 3s après résurrection'],
  },
];

// ── MONSTRES ─────────────────────────────────────────────────────────────────
export const MONSTERS = [
  {
    id: 'mushroom', name: 'Champignon Géant', level: 1,
    emoji: '🍄', hp: 500, maxHp: 500,
    desc: 'Un champignon mutant et agressif. Pas très impressionnant.',
    reward: { xp: 50, gold: { min: 5, max: 15 }, chestChance: 0.3 },
    respawn: 30,
  },
  {
    id: 'slime', name: 'Slime Verdâtre', level: 1,
    emoji: '🟢', hp: 400, maxHp: 400,
    desc: 'Une masse de gelée verte qui se régénère. Ennuyeux mais pas dangereux.',
    reward: { xp: 40, gold: { min: 3, max: 10 }, chestChance: 0.25 },
    respawn: 25,
  },
  {
    id: 'goblin', name: 'Gobelin Maraudeur', level: 2,
    emoji: '👺', hp: 1200, maxHp: 1200,
    desc: 'Un petit gobelin malin et rapide. Il pique dans les poches.',
    reward: { xp: 120, gold: { min: 15, max: 40 }, chestChance: 0.4 },
    respawn: 45,
  },
  {
    id: 'skeleton', name: 'Squelette Guerrier', level: 2,
    emoji: '💀', hp: 1000, maxHp: 1000,
    desc: 'Les os d\'un guerrier mort-vivant. Cliquète mais fait mal.',
    reward: { xp: 100, gold: { min: 10, max: 30 }, chestChance: 0.35 },
    respawn: 40,
  },
  {
    id: 'gnome', name: 'Gnome Explosif', level: 3,
    emoji: '🧙', hp: 2500, maxHp: 2500,
    desc: 'Un gnome maniaque qui lance des bombes artisanales. Imprévisible.',
    reward: { xp: 250, gold: { min: 40, max: 100 }, chestChance: 0.5 },
    respawn: 60,
  },
  {
    id: 'troll', name: 'Troll des Marais', level: 3,
    emoji: '👹', hp: 3500, maxHp: 3500,
    desc: 'Un troll massif qui se régénère. Il faut frapper fort et vite.',
    reward: { xp: 350, gold: { min: 60, max: 130 }, chestChance: 0.55 },
    respawn: 70,
  },
  {
    id: 'witch', name: 'Sorcière Corrompue', level: 3,
    emoji: '🧙‍♀️', hp: 2800, maxHp: 2800,
    desc: 'Une sorcière qui lance des sorts de malédiction. Dangereuse pour les équipiers.',
    reward: { xp: 280, gold: { min: 50, max: 120 }, chestChance: 0.5 },
    respawn: 60,
  },
  {
    id: 'golem', name: 'Golem de Pierre', level: 4,
    emoji: '🪨', hp: 6000, maxHp: 6000,
    desc: 'Un colosse de pierre animé. Lent mais ses coups font très mal.',
    reward: { xp: 600, gold: { min: 100, max: 200 }, chestChance: 0.65 },
    respawn: 90,
  },
  {
    id: 'vampire', name: 'Comte Vampyr', level: 4,
    emoji: '🧛', hp: 5000, maxHp: 5000,
    desc: 'Un vampire aristocrate qui se soigne en attaquant. Éliminer vite.',
    reward: { xp: 500, gold: { min: 80, max: 180 }, chestChance: 0.6 },
    respawn: 80,
  },
  {
    id: 'yeti', name: 'Yéti des Neiges', level: 4,
    emoji: '🦣', hp: 7000, maxHp: 7000,
    desc: 'Une créature immense des montagnes gelées. Il gèle tout sur son passage.',
    reward: { xp: 700, gold: { min: 120, max: 250 }, chestChance: 0.7 },
    respawn: 100,
  },
  {
    id: 'lich', name: 'Liche Ancienne', level: 5,
    emoji: '🪦', hp: 15000, maxHp: 15000,
    desc: 'Un archimage mort-vivant d\'une puissance inimaginable. Il faut être nombreux.',
    reward: { xp: 1500, gold: { min: 300, max: 600 }, chestChance: 0.8 },
    respawn: 180,
  },
  {
    id: 'hydra', name: 'Hydre des Profondeurs', level: 5,
    emoji: '🐉', hp: 20000, maxHp: 20000,
    desc: 'Une créature à plusieurs têtes. Chaque tête coupée en repousse deux. Coordination requise.',
    reward: { xp: 2000, gold: { min: 400, max: 800 }, chestChance: 0.85 },
    respawn: 240,
  },
  {
    id: 'demon_lord', name: 'Seigneur Démon', level: 5,
    emoji: '😈', hp: 18000, maxHp: 18000,
    desc: 'Un démon de rang supérieur invoqué des profondeurs. Nécessite toute la communauté.',
    reward: { xp: 1800, gold: { min: 350, max: 700 }, chestChance: 0.85 },
    respawn: 210,
  },
  {
    id: 'dragon', name: 'Dragon Rouge Ancien', level: 5,
    emoji: '🔥', hp: 50000, maxHp: 50000,
    desc: '⚠️ BOSS LÉGENDAIRE — Le dragon le plus puissant de tous les royaumes. Il faut toute la communauté pour l\'abattre. Loot exceptionnel garanti.',
    reward: { xp: 5000, gold: { min: 1000, max: 2000 }, chestChance: 1.0 },
    respawn: 600,
  },
];

// ── FONCTIONS UTILITAIRES ─────────────────────────────────────────────────────

export function getItemById(id) {
  return ITEMS.find(i => i.id === id) || null;
}

export function getSpellById(id) {
  return SPELLS.find(s => s.id === id) || null;
}

export function getMonsterById(id) {
  return MONSTERS.find(m => m.id === id) || null;
}

export function getItemsByLevel(level) {
  return ITEMS.filter(i => i.level === level);
}

// Rareté d'un item
export function getItemRarity(item) {
  return RARITY[item.rarity.toUpperCase()] || RARITY.COMMON;
}

// Loot d'item selon niveau joueur — probabilités pondérées
// Plus le gap est grand, plus l'item bas niveau est probable
export function rollItemForPlayer(playerLevel) {
  // Poids par niveau : niveau 1 = très probable, niveau joueur = rare
  const weights = [];
  for (let lvl = 1; lvl <= playerLevel; lvl++) {
    // Poids exponentiel décroissant : niveau 1 = 100, niveau 5 = 5
    const weight = Math.pow(0.35, lvl - 1) * 100;
    weights.push({ level: lvl, weight });
  }

  const totalWeight = weights.reduce((s, w) => s + w.weight, 0);
  let rand = Math.random() * totalWeight;

  let chosenLevel = 1;
  for (const w of weights) {
    rand -= w.weight;
    if (rand <= 0) { chosenLevel = w.level; break; }
  }

  const itemsOfLevel = getItemsByLevel(chosenLevel);
  if (!itemsOfLevel.length) return null;
  return itemsOfLevel[Math.floor(Math.random() * itemsOfLevel.length)];
}

// 3 sorts aléatoires pour le level up — peut inclure un sort déjà connu (upgrade)
export function rollSpellsForLevelUp(knownSpellIds = []) {
  const allSpells = [...SPELLS];
  
  // Séparer sorts connus (upgrade) et inconnus (nouveau)
  const knownSpells   = allSpells.filter(s => knownSpellIds.includes(s.id));
  const unknownSpells = allSpells.filter(s => !knownSpellIds.includes(s.id));

  const pool = [];
  // 40% de chance pour chaque slot d'être un upgrade
  for (let i = 0; i < 3; i++) {
    const isUpgrade = Math.random() < 0.4 && knownSpells.length > 0;
    if (isUpgrade) {
      pool.push(knownSpells[Math.floor(Math.random() * knownSpells.length)]);
    } else if (unknownSpells.length > 0) {
      const idx = Math.floor(Math.random() * unknownSpells.length);
      pool.push(unknownSpells[idx]);
    }
  }

  // Dédupliquer
  const seen = new Set();
  return pool.filter(s => { if (seen.has(s.id)) return false; seen.add(s.id); return true; });
}

// Calcul des stats effectives d'un joueur
export function computePlayerStats(playerData) {
  const base = {
    force: 1, intel: 1, sagesse: 1, endurance: 1, dexterite: 1,
    hp: 50, arm: 0, magArm: 0, pa: 10, vitesse: 0,
  };

  // Bonus HP de l'endurance
  base.hp += (base.endurance - 1) * 10;

  // Appliquer les équipements équipés
  const equipped = playerData.equippedItems || {};
  for (const slot of ['head', 'chest', 'boots', 'weapon']) {
    const itemId = equipped[slot];
    if (!itemId) continue;
    const item = getItemById(itemId);
    if (!item) continue;
    for (const [stat, val] of Object.entries(item.stats || {})) {
      if (base[stat] !== undefined) base[stat] += val;
    }
  }

  return base;
}

// Calcul des dégâts d'un sort en fonction du niveau du sort et des stats joueur
export function computeSpellDamage(spell, spellLevel, playerStats) {
  if (!spell.dmgStat || spell.type === 'buff') return 0;
  const statValue = playerStats[spell.dmgStat] || 1;
  const base = spell.dmgBase + (spellLevel - 1) * spell.dmgGrowth;
  return Math.floor(base + statValue * 1.5);
}

// Calcul du cooldown en fonction du niveau du sort et de la vitesse joueur
export function computeCooldown(spell, spellLevel, playerStats) {
  const speedBonus = (playerStats.vitesse || 0) * 100; // 100ms par point de vitesse
  const spellReduction = (spellLevel - 1) * (spell.cooldown_reduction || 0);
  return Math.max(2000, spell.cooldown_base - spellReduction - speedBonus);
}
