// ============================================================
// GAMEDATA.JS v2 — Base de données statique du jeu RPG
// ============================================================

export const RARITY = {
  COMMON:    { id: 'common',    label: 'Commun',    color: '#9ca3af', statCount: 1 },
  RARE:      { id: 'rare',      label: 'Rare',      color: '#3b82f6', statCount: 2 },
  EPIC:      { id: 'epic',      label: 'Épique',    color: '#a855f7', statCount: 3 },
  LEGENDARY: { id: 'legendary', label: 'Légendaire',color: '#f59e0b', statCount: 4 },
};

// ── ITEMS ────────────────────────────────────────────────────────────────────
export const ITEMS = [
  // NIVEAU 1 — COMMUN
  { id:'noob_head',    name:'Bonnet du Nooblard',      slot:'head',   level:1, rarity:'common',    emoji:'🧢', price:20,  desc:'Un bonnet tricoté par ta grand-mère.', stats:{hp:5} },
  { id:'noob_chest',   name:'Veste du Nooblard',        slot:'chest',  level:1, rarity:'common',    emoji:'👕', price:20,  desc:'Une veste en coton délavé.', stats:{arm:2} },
  { id:'noob_boots',   name:'Claquettes du Nooblard',   slot:'boots',  level:1, rarity:'common',    emoji:'🩴', price:20,  desc:'Des claquettes avec des chaussettes.', stats:{vitesse:1} },
  { id:'noob_weapon',  name:'Couteau du Nooblard',      slot:'weapon', level:1, rarity:'common',    emoji:'🗡️',price:20,  desc:'Un couteau de cuisine rouillé.', stats:{force:2} },
  { id:'clown_head',   name:'Chapeau du Clown',         slot:'head',   level:1, rarity:'common',    emoji:'🎩', price:25,  desc:'Un chapeau pointu multicolore.', stats:{dexterite:1} },
  { id:'clown_chest',  name:'Pull du Clown',            slot:'chest',  level:1, rarity:'common',    emoji:'🃏', price:25,  desc:'Un pull à pompons.', stats:{intel:1} },
  { id:'clown_boots',  name:'Chaussures du Clown',      slot:'boots',  level:1, rarity:'common',    emoji:'👟', price:25,  desc:'Des chaussures qui font couic.', stats:{vitesse:1} },
  { id:'clown_weapon', name:'Tromblon du Clown',        slot:'weapon', level:1, rarity:'common',    emoji:'🎺', price:25,  desc:'Une trompette transformée en arme.', stats:{intel:2} },
  { id:'adv_head',     name:'Casquette de Scout',       slot:'head',   level:1, rarity:'common',    emoji:'⛑️',price:30,  desc:'Légère et pratique pour les explorateurs.', stats:{dexterite:1} },
  { id:'adv_chest',    name:'Chemise de Scout',         slot:'chest',  level:1, rarity:'common',    emoji:'🦺', price:30,  desc:'Beaucoup de poches utiles.', stats:{endurance:1} },
  { id:'adv_boots',    name:'Bottines de Randonnée',    slot:'boots',  level:1, rarity:'common',    emoji:'🥾', price:30,  desc:'Imperméables et solides.', stats:{vitesse:1} },
  { id:'adv_weapon',   name:"Fronde de l'Aventurier",  slot:'weapon', level:1, rarity:'common',    emoji:'⚙️',price:30,  desc:'Une fronde bricolée. Lente mais précise.', stats:{dexterite:2} },
  // NIVEAU 2 — RARE
  { id:'warr_head',    name:'Heaume de Fer',            slot:'head',   level:2, rarity:'rare',      emoji:'⚔️',price:60,  desc:'Un casque en fer forgé. Lourd mais efficace.', stats:{hp:10,arm:3} },
  { id:'warr_chest',   name:'Cuirasse de Fer',          slot:'chest',  level:2, rarity:'rare',      emoji:'🛡️',price:60,  desc:'Une armure solide avec des rivets dorés.', stats:{arm:5,hp:8} },
  { id:'warr_boots',   name:'Bottes de Guerre',         slot:'boots',  level:2, rarity:'rare',      emoji:'👢', price:60,  desc:'Ferrées et lourdes.', stats:{endurance:2,vitesse:1} },
  { id:'warr_weapon',  name:'Épée Longue de Fer',       slot:'weapon', level:2, rarity:'rare',      emoji:'⚔️',price:80,  desc:'Une lame bien équilibrée.', stats:{force:4,dexterite:1} },
  { id:'mage2_head',   name:'Chapeau Pointu Bleu',      slot:'head',   level:2, rarity:'rare',      emoji:'🎓', price:65,  desc:'Le chapeau classique du mage.', stats:{intel:3,magArm:2} },
  { id:'mage2_chest',  name:'Robe Azurée',              slot:'chest',  level:2, rarity:'rare',      emoji:'🔵', price:65,  desc:'Légère. Les runes amplifient les sorts.', stats:{intel:4,magArm:3} },
  { id:'mage2_boots',  name:'Sandales du Mage',         slot:'boots',  level:2, rarity:'rare',      emoji:'🩰', price:55,  desc:'Des sandales enchantées qui flottent.', stats:{vitesse:3,pa:1} },
  { id:'mage2_weapon', name:'Baguette de Bouleau',      slot:'weapon', level:2, rarity:'rare',      emoji:'🪄', price:80,  desc:'La première baguette du mage.', stats:{intel:5,pa:1} },
  { id:'rogue2_head',  name:'Capuche du Voleur',        slot:'head',   level:2, rarity:'rare',      emoji:'🪭', price:55,  desc:'Une capuche sombre dissimulatrice.', stats:{dexterite:3,vitesse:1} },
  { id:'rogue2_chest', name:'Veste de Cuir Sombre',     slot:'chest',  level:2, rarity:'rare',      emoji:'🧥', price:60,  desc:'Du cuir souple et silencieux.', stats:{dexterite:2,arm:3} },
  { id:'rogue2_boots', name:'Bottes Silencieuses',      slot:'boots',  level:2, rarity:'rare',      emoji:'🥿', price:55,  desc:'Semelles en laine. Aucun bruit.', stats:{vitesse:4,dexterite:1} },
  { id:'rogue2_weapon',name:'Dague Jumelles',           slot:'weapon', level:2, rarity:'rare',      emoji:'🔪', price:80,  desc:'Deux dagues légères.', stats:{force:3,dexterite:3} },
  // NIVEAU 3 — ÉPIQUE
  { id:'paladin_head', name:'Heaume Sacré',             slot:'head',   level:3, rarity:'epic',      emoji:'✨', price:150, desc:'Un heaume béni qui brille dans le noir.', stats:{hp:20,arm:5,sagesse:2} },
  { id:'paladin_chest',name:'Armure Sacrée',            slot:'chest',  level:3, rarity:'epic',      emoji:'🛡️',price:180, desc:'Réduit dégâts magiques et physiques.', stats:{arm:8,magArm:5,hp:15} },
  { id:'paladin_boots',name:'Sandales de Justice',      slot:'boots',  level:3, rarity:'epic',      emoji:'👡', price:130, desc:'Forgées dans le marbre blanc céleste.', stats:{vitesse:3,sagesse:3,endurance:2} },
  { id:'paladin_weapon',name:'Marteau de Lumière',      slot:'weapon', level:3, rarity:'epic',      emoji:'🔨', price:220, desc:'Un marteau qui brille. Dégâts saints.', stats:{force:6,sagesse:4,dexterite:2} },
  { id:'necro_head',   name:'Crâne de Liche',           slot:'head',   level:3, rarity:'epic',      emoji:'💀', price:160, desc:'Porter un crâne sur la tête, c\'est stylé.', stats:{intel:6,magArm:4,hp:8} },
  { id:'necro_chest',  name:'Robe des Morts',           slot:'chest',  level:3, rarity:'epic',      emoji:'🖤', price:170, desc:"Cousue avec des fils d'âmes..", stats:{intel:8,magArm:6,arm:2} },
  { id:'necro_boots',  name:'Bottes Osseuses',          slot:'boots',  level:3, rarity:'epic',      emoji:'🦴', price:140, desc:'Os de squelettes. Légères et solides.', stats:{vitesse:4,intel:3,pa:2} },
  { id:'necro_weapon', name:'Sceptre des Âmes',         slot:'weapon', level:3, rarity:'epic',      emoji:'🔮', price:230, desc:'Les âmes piégées amplifient chaque sort.', stats:{intel:9,pa:3,magArm:3} },
  { id:'archer_head',  name:'Capuche de Sylve',         slot:'head',   level:3, rarity:'epic',      emoji:'🌿', price:145, desc:'Feuilles arbre sacré. Camouflage naturel.', stats:{dexterite:6,vitesse:3,endurance:2} },
  { id:'archer_chest', name:'Manteau de Sylve',         slot:'chest',  level:3, rarity:'epic',      emoji:'🌲', price:165, desc:'Léger et résistant. Bois enchanté.', stats:{dexterite:5,arm:4,vitesse:2} },
  { id:'archer_boots', name:'Bottes de Chasseresse',    slot:'boots',  level:3, rarity:'epic',      emoji:'🦌', price:140, desc:'Légères comme le vent. Tu voles presque.', stats:{vitesse:6,dexterite:4,pa:1} },
  { id:'archer_weapon',name:'Arc de Sylve',             slot:'weapon', level:3, rarity:'epic',      emoji:'🏹', price:220, desc:'Un arc enchanté qui ne rate jamais.', stats:{dexterite:8,force:4,vitesse:2} },
  // NIVEAU 4 — ÉPIQUE / LÉGENDAIRE
  { id:'berserk_head', name:'Masque de Rage',           slot:'head',   level:4, rarity:'epic',      emoji:'😡', price:320, desc:'Masque en fer rouge. Met le porteur en frénésie.', stats:{force:10,hp:20,endurance:4} },
  { id:'berserk_chest',name:'Plastron Sanguin',         slot:'chest',  level:4, rarity:'epic',      emoji:'🩸', price:350, desc:'Tâché de sang de dragon. Absorbe la douleur.', stats:{force:8,arm:10,hp:25} },
  { id:'berserk_boots',name:'Bottes de Fureur',         slot:'boots',  level:4, rarity:'epic',      emoji:'🔥', price:290, desc:'Ces bottes t\'empêchent de fuir.', stats:{force:6,vitesse:5,endurance:5} },
  { id:'berserk_weapon',name:'Hache à Deux Mains',      slot:'weapon', level:4, rarity:'epic',      emoji:'🪓', price:420, desc:'Une hache géante de 1000 combats.', stats:{force:14,endurance:5,dexterite:3} },
  { id:'archmage_head',name:"Tiare de l'Archimage",     slot:'head',   level:4, rarity:'legendary', emoji:'👑', price:500, desc:'La couronne des maîtres de magie.', stats:{intel:12,magArm:8,pa:3,vitesse:2} },
  { id:'archmage_chest',name:"Robe de l'Archimage",     slot:'chest',  level:4, rarity:'legendary', emoji:'🔷', price:550, desc:'Tissée de magie pure. Ignore les résistances.', stats:{intel:14,magArm:10,pa:4,hp:15} },
  { id:'archmage_boots',name:"Pantoufles de l'Archimage",slot:'boots', level:4, rarity:'legendary', emoji:'✨', price:400, desc:'Des pantoufles enchantées par les dieux.', stats:{vitesse:7,intel:8,pa:3,magArm:4} },
  { id:'archmage_weapon',name:'Orbe du Destin',         slot:'weapon', level:4, rarity:'legendary', emoji:'🌐', price:650, desc:"L'essence de l'univers. Sorts 50% plus puissants.", stats:{intel:16,pa:5,magArm:6,vitesse:3} },
  { id:'priest4_head', name:'Mitre Royale',             slot:'head',   level:4, rarity:'epic',      emoji:'⛪', price:380, desc:'Coiffe des grands prêtres.', stats:{sagesse:10,hp:18,magArm:6} },
  { id:'priest4_chest',name:'Aube Sacrée',              slot:'chest',  level:4, rarity:'epic',      emoji:'🌟', price:400, desc:'Robe brillante des grandes cérémonies.', stats:{sagesse:12,hp:22,magArm:8} },
  { id:'priest4_boots',name:'Souliers Bénis',           slot:'boots',  level:4, rarity:'epic',      emoji:'🪷', price:340, desc:'Chaque pas guérit légèrement les alliés.', stats:{sagesse:8,vitesse:4,pa:2} },
  { id:'priest4_weapon',name:'Sceptre de la Vie',       slot:'weapon', level:4, rarity:'epic',      emoji:'🌿', price:480, desc:'Sceptre des guérisseurs légendaires.', stats:{sagesse:14,hp:15,pa:3} },
  // NIVEAU 5 — LÉGENDAIRE
  { id:'dragon_head',  name:'Casque du Dragon-Roi',     slot:'head',   level:5, rarity:'legendary', emoji:'🐲', price:1000,desc:'Écaille de dragon rouge ancien. Résiste à tout.', stats:{force:12,arm:15,hp:30,dexterite:3} },
  { id:'dragon_chest', name:'Armure Draconique',        slot:'chest',  level:5, rarity:'legendary', emoji:'🛡️',price:1200,desc:'Chaque écaille est une armure. Quasi-indestructible.', stats:{arm:20,magArm:10,hp:40,endurance:5} },
  { id:'dragon_boots', name:'Griffes du Dragon',        slot:'boots',  level:5, rarity:'legendary', emoji:'🐾', price:900, desc:'Des bottes à griffes. Tu cours ET tu griffes.', stats:{vitesse:8,force:6,dexterite:7,endurance:3} },
  { id:'dragon_weapon',name:'Lance-Flammes du Dragon',  slot:'weapon', level:5, rarity:'legendary', emoji:'🔱', price:1500,desc:"L'arme ultime. Crache du feu à chaque attaque.", stats:{force:20,intel:10,dexterite:6,vitesse:4} },
  { id:'ghost_head',   name:'Voile du Néant',           slot:'head',   level:5, rarity:'legendary', emoji:'👻', price:950, desc:'Rend semi-intangible.', stats:{dexterite:12,magArm:12,vitesse:6,pa:4} },
  { id:'ghost_chest',  name:'Linceul Astral',           slot:'chest',  level:5, rarity:'legendary', emoji:'🌫️',price:1100,desc:"N'existe qu'à moitié. Très cool.", stats:{magArm:15,dexterite:10,pa:5,vitesse:5} },
  { id:'ghost_boots',  name:'Semelles du Néant',        slot:'boots',  level:5, rarity:'legendary', emoji:'💨', price:880, desc:'Tu glisses comme un fantôme.', stats:{vitesse:12,dexterite:8,pa:4,arm:5} },
  { id:'ghost_weapon', name:'Lame Astrale',             slot:'weapon', level:5, rarity:'legendary', emoji:'⚡', price:1400,desc:'Fend le tissu de la réalité.', stats:{intel:12,dexterite:14,force:8,pa:5} },
  { id:'highpriest_head', name:'Auréole du Grand Prêtre',slot:'head',  level:5, rarity:'legendary', emoji:'😇', price:1000,desc:'Cercle de lumière divine.', stats:{sagesse:16,hp:30,magArm:10,pa:3} },
  { id:'highpriest_chest',name:'Vêtement Divin',        slot:'chest',  level:5, rarity:'legendary', emoji:'🌈', price:1150,desc:'Tissé par les dieux.', stats:{sagesse:18,hp:35,magArm:12,pa:4} },
  { id:'highpriest_boots',name:'Sandales de la Résurrection',slot:'boots',level:5,rarity:'legendary',emoji:'☁️',price:950,desc:'Tu marches sur des nuages.', stats:{sagesse:12,vitesse:6,pa:5,hp:20} },
  { id:'highpriest_weapon',name:'Bâton du Firmament',   slot:'weapon', level:5, rarity:'legendary', emoji:'⭐', price:1500,desc:'Le bâton suprême. Les soins sont MASSIFS.', stats:{sagesse:20,pa:6,hp:25,magArm:8} },
];

// ── SORTS ────────────────────────────────────────────────────────────────────
// dmgType: 'physical' | 'magical' | 'heal' | 'buff' | 'debuff'
// scaleStat: stat de scaling
// scaleRatio: multiplicateur sur la stat (1.0 = 100%)
// baseDmg: valeur de base niveau 1
// pa: coût en Points d'Action
// cooldown_base: ms

export const SPELLS = [
  // ── SORT DE BASE (tous les joueurs au départ) ──
  {
    id:'base_attack', name:'Attaque de Base', class:'warrior',
    emoji:'🗡️', dmgType:'physical', scaleStat:'force', scaleRatio:1.0, baseDmg:10, pa:0,
    cooldown_base:10000,
    desc:"L'attaque fondamentale. Rapide et fiable. Disponible pour tous.",
    effects:['10 + 100% Force','13 + 110% Force','16 + 120% Force','19 + 130% Force','22 + 150% Force'],
  },
  // ── GUERRIER ──────────────────────────────────────────────────────────────
  {
    id:'warrior_slash', name:'Taillade', class:'warrior',
    emoji:'⚔️', dmgType:'physical', scaleStat:'force', scaleRatio:1.2, baseDmg:15, pa:2,
    cooldown_base:9000,
    desc:"Un coup d'épée puissant qui tranche l'ennemi.",
    effects:['15 + 120% Force','20 + 130%','25 + 140%','30 + 150%','35 + 170% + saignement'],
  },
  {
    id:'warrior_shield_bash', name:'Coup de Bouclier', class:'warrior',
    emoji:'🛡️', dmgType:'physical', scaleStat:'force', scaleRatio:0.8, baseDmg:10, pa:2,
    cooldown_base:13000,
    desc:"Fracasse l'ennemi avec ton bouclier. L'étourdit brièvement.",
    effects:['10 + 80% Force + Étourdi 1s','14 + 90% + 1.5s','18 + 100% + 2s','22 + 110% + 2.5s','26 + 120% + 3s + -ARM'],
  },
  {
    id:'warrior_war_cry', name:'Cri de Guerre', class:'warrior',
    emoji:'😤', dmgType:'buff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:3,
    cooldown_base:20000,
    desc:"Un cri puissant qui booste ton attaque pendant quelques secondes.",
    effects:['+20% Force 5s','+30% 6s','+40% 7s','+50% 8s','+60% 10s + immunité peur'],
  },
  {
    id:'warrior_whirlwind', name:'Tourbillon', class:'warrior',
    emoji:'🌀', dmgType:'physical', scaleStat:'force', scaleRatio:1.5, baseDmg:20, pa:4,
    cooldown_base:16000,
    desc:"Tu tournes sur toi-même en frappant tout autour (zone).",
    effects:['20 + 150% Force zone','28 + 165%','36 + 180%','44 + 195%','52 + 220% + repousse'],
  },
  {
    id:'warrior_charge', name:'Charge', class:'warrior',
    emoji:'💨', dmgType:'physical', scaleStat:'endurance', scaleRatio:1.2, baseDmg:25, pa:3,
    cooldown_base:18000,
    desc:"Charge l'ennemi à toute vitesse et le renverse.",
    effects:['25 + 120% Enduran. + Chute','34 + 130%','43 + 140%','52 + 150%','61 + 180% + Chute 3s + Trauma'],
  },
  {
    id:'warrior_iron_skin', name:'Peau de Fer', class:'warrior',
    emoji:'⚙️', dmgType:'buff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:3,
    cooldown_base:25000,
    desc:"Durcit ta peau comme du métal. Réduit les dégâts reçus.",
    effects:['-20% dégâts reçus 6s','-25% 7s','-30% 8s','-35% 10s','-40% 12s + renvoi 10%'],
  },
  {
    id:'warrior_execute', name:'Exécution', class:'warrior',
    emoji:'💀', dmgType:'physical', scaleStat:'force', scaleRatio:2.0, baseDmg:30, pa:5,
    cooldown_base:22000,
    desc:"Coup dévastateur. ×2 si la cible est sous 30% de vie.",
    effects:['30 + 200% Force (×2 si <30%)','42 + 215%','54 + 230%','66 + 245%','78 + 270% (×3 si <30%)'],
  },
  {
    id:'warrior_battle_shout', name:'Clameur de Bataille', class:'warrior',
    emoji:'📣', dmgType:'buff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:4,
    cooldown_base:35000,
    desc:"Un cri augmentant la vitesse d'attaque de toute la team.",
    effects:['+15% vitesse team 8s','+20% 10s','+25% 12s','+30% 15s','+40% 20s + +15% dégâts'],
  },
  {
    id:'warrior_last_stand', name:'Dernier Rempart', class:'warrior',
    emoji:'🏳️', dmgType:'buff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:6,
    cooldown_base:60000,
    desc:"Face à la mort, tu trouves une force insoupçonnée.",
    effects:['<20% PV: +50% toutes stats 5s','...+60% 6s','...+70% 7s','...+80% 8s','...+100% 10s + immunité mort 1s'],
  },
  // ── VOLEUR ────────────────────────────────────────────────────────────────
  {
    id:'rogue_backstab', name:'Coup dans le Dos', class:'rogue',
    emoji:'🗡️', dmgType:'physical', scaleStat:'dexterite', scaleRatio:1.8, baseDmg:20, pa:3,
    cooldown_base:11000,
    desc:"Attaque traîtresse. Bonus si positionnée dans le dos.",
    effects:['20 + 180% Dex (×1.5 dos)','27 + 200%','34 + 220%','41 + 240%','48 + 270% (×2 dos)'],
  },
  {
    id:'rogue_poison', name:'Lame Empoisonnée', class:'rogue',
    emoji:'☠️', dmgType:'physical', scaleStat:'dexterite', scaleRatio:0.6, baseDmg:8, pa:2,
    cooldown_base:13000,
    desc:"Enduire ta lame de poison. Dégâts continus sur la durée.",
    effects:['(8+60% Dex)/s ×5s','(10+70%)/s ×5s','(12+80%)/s ×6s','(14+90%)/s ×7s','(16+100%)/s ×8s + affaibli'],
  },
  {
    id:'rogue_shadow_step', name:"Pas de l'Ombre", class:'rogue',
    emoji:'🌑', dmgType:'buff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:2,
    cooldown_base:15000,
    desc:"Te téléporte derrière l'ennemi instantanément.",
    effects:['Téléport + 15% esquive 3s','...+20% 4s','...+25% 5s','...+30%','...+35% 6s + invisible 1s'],
  },
  {
    id:'rogue_smoke_bomb', name:'Bombe Fumigène', class:'rogue',
    emoji:'💨', dmgType:'debuff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:2,
    cooldown_base:18000,
    desc:"Lance une bombe qui aveugle l'ennemi.",
    effects:['Aveugle 2s','2.5s','3s','3.5s','4s + -50% précision'],
  },
  {
    id:'rogue_fan_blades', name:'Éventail de Lames', class:'rogue',
    emoji:'🔪', dmgType:'physical', scaleStat:'dexterite', scaleRatio:0.9, baseDmg:10, pa:3,
    cooldown_base:14000,
    desc:"Lance plusieurs dagues en éventail.",
    effects:['3×(10+90% Dex)','3×(13+100%)','4×(13+110%)','4×(16+120%)','5×(16+140%) + poison'],
  },
  {
    id:'rogue_evasion', name:'Évasion', class:'rogue',
    emoji:'🌪️', dmgType:'buff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:3,
    cooldown_base:25000,
    desc:"Active un état d'esquive totale.",
    effects:['100% esquive 2s','2.5s','3s','3.5s','4s + contre-attaque si esquive'],
  },
  {
    id:'rogue_garrote', name:'Garrot', class:'rogue',
    emoji:'🧵', dmgType:'physical', scaleStat:'dexterite', scaleRatio:2.0, baseDmg:25, pa:4,
    cooldown_base:20000,
    desc:"Étrangle l'ennemi. Dégâts massifs + silence.",
    effects:['25 + 200% Dex + silence 2s','34 + 220% + 2.5s','43 + 240% + 3s','52 + 260% + 3.5s','61 + 300% + 5s + saignement'],
  },
  {
    id:'rogue_mark', name:'Marque de la Proie', class:'rogue',
    emoji:'🎯', dmgType:'debuff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:2,
    cooldown_base:22000,
    desc:"Marque l'ennemi. La team lui inflige plus de dégâts.",
    effects:['+20% dégâts sur cible 6s','+25% 8s','+30% 10s','+35% 12s','+50% 15s + expose armure'],
  },
  {
    id:'rogue_sprint', name:'Sprint', class:'rogue',
    emoji:'🏃', dmgType:'buff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:1,
    cooldown_base:12000,
    desc:"Sprinte à toute allure. Immunité zone temporaire.",
    effects:['+100% vitesse 2s','3s','4s','5s','6s + immunité zone'],
  },
  {
    id:'rogue_death_mark', name:'Marque de Mort', class:'rogue',
    emoji:'💀', dmgType:'physical', scaleStat:'dexterite', scaleRatio:3.0, baseDmg:50, pa:6,
    cooldown_base:60000,
    desc:"Sort maudit qui exécute l'ennemi après délai.",
    effects:['50+300% Dex après 5s','75+350% 4s','100+400% 3s','125+450% 2s','150+500% instantané'],
  },
  // ── MAGE ──────────────────────────────────────────────────────────────────
  {
    id:'mage_fireball', name:'Boule de Feu', class:'mage',
    emoji:'🔥', dmgType:'magical', scaleStat:'intel', scaleRatio:1.5, baseDmg:12, pa:3,
    cooldown_base:10000,
    desc:"Lance une boule de feu explosive sur l'ennemi.",
    effects:['12 + 150% Intel (feu)','17 + 160%','22 + 170%','27 + 180%','32 + 200% + brûlure 3s'],
  },
  {
    id:'mage_frost_bolt', name:'Trait de Givre', class:'mage',
    emoji:'❄️', dmgType:'magical', scaleStat:'intel', scaleRatio:1.2, baseDmg:10, pa:2,
    cooldown_base:9000,
    desc:"Un rayon de glace qui ralentit l'ennemi.",
    effects:['10 + 120% Intel + lent 30% 2s','14 + 130% + 40%','18 + 140% + 50% 3s','22 + 150% + 60%','26 + 170% + gel 2s'],
  },
  {
    id:'mage_arcane_blast', name:'Explosion Arcanique', class:'mage',
    emoji:'💥', dmgType:'magical', scaleStat:'intel', scaleRatio:1.8, baseDmg:20, pa:4,
    cooldown_base:14000,
    desc:"Explosion d'énergie pure. Ignore les résistances magiques.",
    effects:['20 + 180% Intel (ignore ARM)','28 + 195%','36 + 210%','44 + 225%','52 + 250% + affaibli magie'],
  },
  {
    id:'mage_mana_shield', name:'Bouclier de Mana', class:'mage',
    emoji:'🔵', dmgType:'buff', scaleStat:'intel', scaleRatio:2.0, baseDmg:50, pa:3,
    cooldown_base:20000,
    desc:"Crée un bouclier absorbant les dégâts. Se régénère via Intel.",
    effects:['Absorbe 50+200% Intel','68+220%','86+240%','104+260%','122+300% + renvoi 20%'],
  },
  {
    id:'mage_chain_lightning', name:'Foudre en Chaîne', class:'mage',
    emoji:'⚡', dmgType:'magical', scaleStat:'intel', scaleRatio:1.3, baseDmg:20, pa:4,
    cooldown_base:16000,
    desc:"Un éclair qui rebondit sur plusieurs ennemis.",
    effects:['20+130% Intel ×2','27+140% ×3','34+150% ×4','41+160% ×5','48+180% ×6 + paralysie'],
  },
  {
    id:'mage_time_warp', name:'Distorsion Temporelle', class:'mage',
    emoji:'⏳', dmgType:'buff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:5,
    cooldown_base:35000,
    desc:"Ralentit le temps. Réduit tous tes cooldowns.",
    effects:['-30% CD 5s','-40% 6s','-50% 7s','-60% 8s','-70% 10s + hâte permanente'],
  },
  {
    id:'mage_meteor', name:'Météore', class:'mage',
    emoji:'☄️', dmgType:'magical', scaleStat:'intel', scaleRatio:2.5, baseDmg:50, pa:6,
    cooldown_base:30000,
    desc:"Fait tomber un météore. Lent mais DÉVASTATEUR.",
    effects:['50+250% Intel zone','70+270%','90+290%','110+310%','130+350% + stun 2s'],
  },
  {
    id:'mage_polymorph', name:'Métamorphose', class:'mage',
    emoji:'🐑', dmgType:'debuff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:3,
    cooldown_base:25000,
    desc:"Transforme l'ennemi en mouton.",
    effects:['Mouton 2s','2.5s','3s','3.5s','5s + vulnérabilité magie après'],
  },
  {
    id:'mage_ice_nova', name:'Nova de Glace', class:'mage',
    emoji:'🌨️', dmgType:'magical', scaleStat:'intel', scaleRatio:2.0, baseDmg:35, pa:5,
    cooldown_base:22000,
    desc:"Explosion de glace qui gèle tout autour de toi.",
    effects:['35+200% Intel gel 1.5s zone','48+215% 2s','61+230% 2.5s','74+245% 3s','87+270% 4s'],
  },
  {
    id:'mage_arcane_mastery', name:'Maîtrise Arcanique', class:'mage',
    emoji:'🌟', dmgType:'buff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:6,
    cooldown_base:60000,
    desc:"État de pure maîtrise. Tous les sorts décuplés.",
    effects:['+50% dmg magiques 8s','+65% 10s','+80% 12s','+95% 15s','+120% + sorts gratuits 10s'],
  },
  // ── PRÊTRE ────────────────────────────────────────────────────────────────
  {
    id:'priest_heal', name:'Soin', class:'priest',
    emoji:'💚', dmgType:'heal', scaleStat:'sagesse', scaleRatio:1.5, baseDmg:20, pa:2,
    cooldown_base:10000,
    desc:"Soigne une bonne partie de tes PV perdus.",
    effects:['20+150% Sag PV','27+165%','34+180%','41+195%','48+220% + regen 5PV/s 5s'],
  },
  {
    id:'priest_holy_light', name:'Lumière Sacrée', class:'priest',
    emoji:'☀️', dmgType:'magical', scaleStat:'sagesse', scaleRatio:1.0, baseDmg:15, pa:2,
    cooldown_base:9000,
    desc:"Rayon sacré. Brûle les monstres maléfiques.",
    effects:['15+100% Sag (sacré)','20+110%','25+120%','30+130%','35+150% + aveugle 1s'],
  },
  {
    id:'priest_shield', name:'Bouclier Divin', class:'priest',
    emoji:'🌟', dmgType:'buff', scaleStat:'sagesse', scaleRatio:1.5, baseDmg:40, pa:3,
    cooldown_base:15000,
    desc:"Crée un bouclier absorbant les prochains dégâts.",
    effects:['Absorbe 40+150% Sag 4s','53+160% 5s','66+170% 6s','79+180% 7s','92+200% 8s + réflexion 15%'],
  },
  {
    id:'priest_mass_heal', name:'Soin de Masse', class:'priest',
    emoji:'💗', dmgType:'heal', scaleStat:'sagesse', scaleRatio:0.8, baseDmg:10, pa:4,
    cooldown_base:20000,
    desc:"Soigne tous les participants simultanément.",
    effects:['10+80% Sag tous','14+90%','18+100%','22+110%','26+130% + bouclier 20 PV'],
  },
  {
    id:'priest_smite', name:'Châtiment', class:'priest',
    emoji:'⚡', dmgType:'magical', scaleStat:'sagesse', scaleRatio:1.4, baseDmg:25, pa:3,
    cooldown_base:14000,
    desc:"La colère divine frappe l'ennemi. Réduit son ARM.",
    effects:['25+140% Sag + -ARM','34+155%','43+170%','52+185%','61+210% + réduit ARM 20%'],
  },
  {
    id:'priest_regen', name:'Régénération', class:'priest',
    emoji:'🌿', dmgType:'heal', scaleStat:'sagesse', scaleRatio:0.4, baseDmg:5, pa:2,
    cooldown_base:18000,
    desc:"Régénération continue de PV sur la durée.",
    effects:['(5+40% Sag)/s ×10s','(7+50%)/s ×10s','(9+60%)/s ×12s','(11+70%)/s ×12s','(13+80%)/s ×15s + +ARM'],
  },
  {
    id:'priest_dispel', name:'Dissipation', class:'priest',
    emoji:'✨', dmgType:'heal', scaleStat:'sagesse', scaleRatio:0.8, baseDmg:20, pa:2,
    cooldown_base:22000,
    desc:"Supprime tous les effets négatifs et soigne.",
    effects:['Retire debuffs + 20+80% Sag','+ 26+90%','+ 32+100%','+ 38+110%','+ 44+130% + immu debuff 3s'],
  },
  {
    id:'priest_divine_wrath', name:'Courroux Divin', class:'priest',
    emoji:'🌩️', dmgType:'magical', scaleStat:'sagesse', scaleRatio:2.0, baseDmg:40, pa:5,
    cooldown_base:28000,
    desc:"Foudre divine massive. Stun garanti.",
    effects:['40+200% Sag + stun 1s','54+215% + 1.5s','68+230% + 2s','82+245% + 2.5s','96+270% + stun 3s'],
  },
  {
    id:'priest_sanctuary', name:'Sanctuaire', class:'priest',
    emoji:'⛪', dmgType:'heal', scaleStat:'sagesse', scaleRatio:0.5, baseDmg:10, pa:4,
    cooldown_base:35000,
    desc:"Sanctuaire temporaire qui soigne et protège.",
    effects:['(10+50% Sag)/s + -25% dmg 8s','(13+60%)... 10s','(16+70%)... 12s','(19+80%)... 15s','(22+90%) + immu 15s'],
  },
  {
    id:'priest_resurrection', name:'Résurrection', class:'priest',
    emoji:'💫', dmgType:'buff', scaleStat:null, scaleRatio:0, baseDmg:0, pa:6,
    cooldown_base:120000,
    desc:"Si tu meurs, tu reviens avec une partie de tes PV.",
    effects:['Reviens avec 20% PV max','25%','30%','40%','50% + immunité 3s après résurrection'],
  },
];

// ── MONSTRES ─────────────────────────────────────────────────────────────────
export const HP_RANGES = { 1:[300,500], 2:[800,1200], 3:[1600,2000], 4:[2500,3000], 5:[4000,5000] };

export function rollMonsterHp(level) {
  const [min, max] = HP_RANGES[level] || [300, 500];
  return Math.floor(min + Math.random() * (max - min));
}

// Probabilités de spawn par niveau : Lv1=40%, Lv2=30%, Lv3=20%, Lv4=9%, Lv5=1%
const SPAWN_WEIGHTS = [{ level:1, w:40 },{ level:2, w:30 },{ level:3, w:20 },{ level:4, w:9 },{ level:5, w:1 }];

export function rollMonsterLevel() {
  const r = Math.random() * 100;
  let c = 0;
  for (const sw of SPAWN_WEIGHTS) { c += sw.w; if (r < c) return sw.level; }
  return 1;
}

export const MONSTERS = [
  { id:'mushroom',   name:'Champignon Géant',     level:1, emoji:'🍄', attackDmg:1, desc:'Un champignon mutant agressif. Pas très impressionnant.', reward:{xp:50,  gold:{min:5,  max:15},  chestChance:0.3},  respawnSec:30  },
  { id:'slime',      name:'Slime Verdâtre',        level:1, emoji:'🟢', attackDmg:1, desc:'Une masse de gelée verte qui se régénère. Ennuyeux.',     reward:{xp:40,  gold:{min:3,  max:10},  chestChance:0.25}, respawnSec:25  },
  { id:'rat_geant',  name:'Rat des Égouts',        level:1, emoji:'🐀', attackDmg:1, desc:'Un énorme rat des souterrains. Mord fort pour sa taille.',reward:{xp:45,  gold:{min:4,  max:12},  chestChance:0.28}, respawnSec:28  },
  { id:'goblin',     name:'Gobelin Maraudeur',     level:2, emoji:'👺', attackDmg:2, desc:'Un petit gobelin malin et rapide. Pique dans les poches.', reward:{xp:120, gold:{min:15, max:40},  chestChance:0.4},  respawnSec:45  },
  { id:'skeleton',   name:'Squelette Guerrier',    level:2, emoji:'💀', attackDmg:2, desc:'Les os d\'un guerrier mort-vivant. Cliquète mais fait mal.',reward:{xp:100, gold:{min:10, max:30},  chestChance:0.35}, respawnSec:40  },
  { id:'bat_geante', name:'Chauve-Souris Géante',  level:2, emoji:'🦇', attackDmg:2, desc:'Nocturne et rapide. Difficile à toucher en plein vol.',    reward:{xp:110, gold:{min:12, max:35},  chestChance:0.38}, respawnSec:42  },
  { id:'gnome',      name:'Gnome Explosif',        level:3, emoji:'🧙', attackDmg:3, desc:'Un gnome maniaque qui lance des bombes artisanales.',      reward:{xp:250, gold:{min:40, max:100}, chestChance:0.5},  respawnSec:60  },
  { id:'troll',      name:'Troll des Marais',      level:3, emoji:'👹', attackDmg:3, desc:'Un troll massif qui se régénère. Frapper fort et vite.',   reward:{xp:350, gold:{min:60, max:130}, chestChance:0.55}, respawnSec:70  },
  { id:'witch',      name:'Sorcière Corrompue',    level:3, emoji:'🧙‍♀️',attackDmg:3,desc:'Lance des malédictions. Dangereuse pour les équipiers.',  reward:{xp:280, gold:{min:50, max:120}, chestChance:0.5},  respawnSec:60  },
  { id:'golem',      name:'Golem de Pierre',       level:4, emoji:'🪨', attackDmg:4, desc:'Colosse de pierre animé. Lent mais coups très douloureux.',reward:{xp:600, gold:{min:100,max:200}, chestChance:0.65}, respawnSec:90  },
  { id:'vampire',    name:'Comte Vampyr',          level:4, emoji:'🧛', attackDmg:4, desc:'Un vampire qui se soigne en attaquant. Éliminer vite.',    reward:{xp:500, gold:{min:80, max:180}, chestChance:0.6},  respawnSec:80  },
  { id:'yeti',       name:'Yéti des Neiges',       level:4, emoji:'🦣', attackDmg:4, desc:'Géant des montagnes gelées. Gèle tout sur son passage.',   reward:{xp:700, gold:{min:120,max:250}, chestChance:0.7},  respawnSec:100 },
  { id:'lich',       name:'Liche Ancienne',        level:5, emoji:'🪦', attackDmg:5, desc:'Un archimage mort-vivant dévastateur. Il faut être nombreux.',reward:{xp:1500,gold:{min:300,max:600},chestChance:0.8}, respawnSec:180 },
  { id:'hydra',      name:'Hydre des Profondeurs', level:5, emoji:'🐉', attackDmg:5, desc:'Plusieurs têtes : chaque tête coupée en repousse deux.',   reward:{xp:2000,gold:{min:400,max:800}, chestChance:0.85}, respawnSec:240 },
  { id:'dragon',     name:'Dragon Rouge Ancien',   level:5, emoji:'🔥', attackDmg:5, desc:'⚠️ LÉGENDAIRE — Nécessite toute la communauté. Loot exceptionnel.', reward:{xp:5000,gold:{min:1000,max:2000},chestChance:1.0},respawnSec:600},
];

export function getMonsterById(id) { return MONSTERS.find(m => m.id === id) || null; }
export function getItemById(id)    { return ITEMS.find(i => i.id === id) || null; }
export function getSpellById(id)   { return SPELLS.find(s => s.id === id) || null; }
export function getItemsByLevel(level) { return ITEMS.filter(i => i.level === level); }

export function rollItemForPlayer(playerLevel) {
  const weights = [];
  for (let lvl = 1; lvl <= playerLevel; lvl++) {
    weights.push({ level: lvl, weight: Math.pow(0.4, lvl - 1) * 100 });
  }
  const total = weights.reduce((s, w) => s + w.weight, 0);
  let rand = Math.random() * total, chosen = 1;
  for (const w of weights) { rand -= w.weight; if (rand <= 0) { chosen = w.level; break; } }
  const pool = getItemsByLevel(chosen);
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function rollSpellsForLevelUp(knownSpellIds = []) {
  const all     = SPELLS.filter(s => s.id !== 'base_attack');
  const known   = all.filter(s => knownSpellIds.includes(s.id));
  const unknown = all.filter(s => !knownSpellIds.includes(s.id));
  const pool = [], seen = new Set();
  for (let i = 0; i < 3; i++) {
    const upgrade = Math.random() < 0.4 && known.length > 0;
    let candidate, tries = 0;
    do {
      const src = upgrade ? known : (unknown.length > 0 ? unknown : known);
      candidate = src[Math.floor(Math.random() * src.length)];
      tries++;
    } while (candidate && seen.has(candidate.id) && tries < 20);
    if (candidate && !seen.has(candidate.id)) { pool.push(candidate); seen.add(candidate.id); }
  }
  return pool;
}

export function computePlayerStats(player) {
  const stats = { force:1, intel:1, sagesse:1, endurance:1, dexterite:1, hp:50, arm:1, magArm:1, pa:6, vitesse:1 };
  if (!player) return stats;
  const eq = player.equippedItems || {};
  for (const slot of ['head','chest','boots','weapon']) {
    const item = getItemById(eq[slot]);
    if (!item) continue;
    for (const [s, v] of Object.entries(item.stats || {})) {
      if (stats[s] !== undefined) stats[s] += v;
    }
  }
  stats.hp += (stats.endurance - 1) * 8;
  return stats;
}

// Dégâts / soins : baseDmg * (1 + (lvl-1)*0.3) + stat * scaleRatio
export function computeSpellValue(spell, spellLevel, playerStats) {
  if (!spell || (spell.dmgType === 'buff' || spell.dmgType === 'debuff') && !spell.scaleStat) return 0;
  const base      = spell.baseDmg * (1 + (spellLevel - 1) * 0.3);
  const statBonus = spell.scaleStat ? (playerStats[spell.scaleStat] || 0) * spell.scaleRatio : 0;
  return Math.floor(base + statBonus);
}

// Cooldown réduit par la vitesse (1.5% par point, plafonné à 30%)
export function computeCooldown(spell, spellLevel, playerStats) {
  const lvlReduction = (spellLevel - 1) * 400;
  const speedPct     = Math.min(0.30, ((playerStats.vitesse || 1) - 1) * 0.015);
  return Math.max(2000, (spell.cooldown_base - lvlReduction) * (1 - speedPct));
}

export function expForLevel(level) { return 40 + level * 20; }
