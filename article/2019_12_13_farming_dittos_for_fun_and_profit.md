# Farming Dittos for Fun and Profit

![Picture of perfect Ditto](/img/article/ditto/ditto_perfect_ivs.jpg)

## Objectives

This guide will tell you: 

- Where to find Ditto's den.
- How to force a purple beam to spawn Ditto.
- How to reroll a 5 star Ditto.
- How to check IVs.
- How to host a raid.

Why farm ditto?

- Competitive breeding.
- Candies & loot.
- Trading leverage.

While the guide is focused on grinding out the Ditto of your dreams, it also applies to hunting any Gigantamax Pokemon.

## Location of Ditto Den

A Ditto is guaranteed to spawn when there is a purple beam in Den #66, located in _The Stony Wilderness_. To find the den fly to the _Bridge Field_ nursery between _Motostoke_ and _Hammerlocke_, marked by an arrow in the map below.

![Picture of map to Den #66{"square-framed"}](/img/article/ditto/ditto_den_location_map.jpg)
<p class="subtext">Arrow indicates nursery location, smiley face indicates den location.</p>

Head north while hugging the cliff wall and pass under a bridge. When you enter _The Stony Wilderness_ you'll see some tall grass, on the other side is a small island of normal grass with 1 den and 1 tree, that's #66.

![Picture of Den #66{"square-framed"}](/img/article/ditto/ditto_den_location.jpg)
<p class="subtext">Den #66 in The Stony Wilderness</p>

## Forcing Purple Beam Den

![Picture of Purple Beam{"square-framed"}](/img/article/ditto/ditto_purple_beam.jpg)

The next trick is to force a purple beam so we can guarantee a Ditto to spawn in the den.

Preparation:
- Go to options, set text speed to slow. This is optional, but very useful when you first start off.
- Go to options, set `Autosave` to `Manual`.
- Save.

Process:
- Throw a Wishing Piece into the den, when it asks you to save press yes.
- The instant a beam appears press the Home button.
  - If the beam was red, reset by pressing `X` to close the game and reload to repeat the process.
  - If the beam was purple, congrats! Now is a good time to save.

## Reroll 5 Stars

![Picture of outlined 5 start ditto{"square-framed"}](/img/article/ditto/ditto_5_star.jpg)

Now that we have our purple beam den we are guaranteed to have a 3* or better Ditto inside - but we don't want to settle for 3 stars. Every day, the pokemon in a den will reset. We can game this by changing the time to reset until we get a 5*, which is guaranteed at least 4 perfect IVs. As a side benefit, you'll also end up farming a lot of watts.

Preparation:
- Go into `System Settings -> System Date and Time`.
- Set `Synchronize Clock via Internet` to `Off`.
- Open your Y-Comm by pressing `Y` and switch to local mode by pressing `+` if you aren't already local.
- Save.

Process:
- Open the Den and select `Invite Others`.
- Press the `Home` button.
- Go into `System Settings -> System Date and Time`.
- Move the date forward by one day.
- Go back into the game and back out of the battle by selecting `Quit`.
- Collect 2000W from the den.
- Check the den to see if 5*.
- If 5* congrats! Save your game now.
- If not, rinse and repeat until you get another 5*.

We now have a 5* Ditto in our den, it will stay in this den until:
- You complete a battle against it.
- The system time changes over to a different day. Be warned, I hear PVP battle tower matches reset your system clock.

If you want to keep it for multiple days rewind your system to 1AM daily to prevent it from resetting.

## Checking IVs: Solo

Preparation:
- Ensure you have the IV Checker unlocked in the battle tower.
- Go to options, set `Autosave` to `Manual`.
- Save.

Process:
- Battle the Ditto.
- Capture it.
- Check IVs.
  - If IVs are undesireable, close the game and reload. Then reset by forcing 5 stars again.
  - If you do like them you can either keep it or reload to host it for others to grind.

## Checking IVs: Hosting

Hosting is the process of inviting others to join your raid, allowing them to catch, farm and check the IVs for you. If the IVs are desireable you can either catch it for yourself or keep hosting it for others to farm out. If the IVs were undesireable, keep rerolling as outlined above until you get another 5* pokemon. Rinse and repeat.

Preparation:
- Save.
- Open Y-Comm and press `+` to go online.

Process:
- Select `Invite Others to Play`.
- Let people know you are hosting on discord.
- Select `Start Battle` when full.
- Anytime after you see yourself kneeling you can leave by hitting home and closing the game.
- As soon as you get back in game you can host again, you don't need to wait for the previous fight to finish.

Hosting is great with a group of friends, but if you don't have friends don't worry! You can do this with strangers too, join the [/r/PokeMonSwordAndShield discord](https://discord.gg/pokemonswordshield). There's always a plethora of people hosting and joining raids who will happily check IVs in exchange for being able to farm out dittos. If you find a good group of people, some will trade back some of the dittos to you in exchange for you hosting.

## Tips

### Fighting

The best way to fight a Ditto is with legendaries, this way it can't transform and do any damage back to your team. Zacian is very good, since it is fairy type most of it's moves are super effective and will damage Ditto even through it's shields.

The best pokeball to use is a Repeat Ball which has a 3.5 catch rate (only if you already have ditto in your pokedex.) Repeat Balls can be bought from Wyndon Pokeshop's second shopkeeper for $1000 or by some dude in the wilderness for 50W.

### What to Look for in a Ditto

People are usually very happy with a 5 IV (Probability 63/1024) Ditto, but here are some to keep an eye out for:

- 6 IV (Probability 1/1024).
- 5 IV, 0 Speed (Probability 1/6144) - for Trick Room builds.
- 5 IV, 0 Attack (Probability 1/6144) - for Special Attack builds.

The overall probability for one of these three to occur is 1/768.

Be on the lookout shiny or HA Dittos. HA stands for Hidden Ability, Ditto's HA is [Imposter](https://bulbapedia.bulbagarden.net/wiki/Imposter_(Ability)), which allows it to transform as soon as it enters combat.

After you get your Ditto, be sure to try to trade for a foreign one. As a foreign Ditto is more likely to breed shinies.

### Probabilities

How probabilities are computed, thanks to @Calculus#0240.

A 5* Ditto is guaranteed 4 IVs. Of the other 2 IVs, each has 1/32 chance to be 'best'.

```
P(6IV) = P(both stats best) = 1/32^2 = 1/1024
P(5IV) = P(stat 1 best) + P(stat 2 best) - P(both stats best) = 1/32 + 1/32 - 1/32^2 = 63/1024
P(5IV, 0 Attack) = P(stat 1 best) * P(stat 2 no good) * P(stat 2 is attack)  = 1/6144
P(5IV, 0 Speed) = P(stat 1 best) * P(stat 2 no good) * P(stat 2 is speed)  = 1/6144
P(6IV) or P(5IV, 0 Speed) or P(5IV, 0 Attack) = 6/6144 + 1/6144 + 1/6144 = 1/768
```

## Extras & and Credits

If you notice anything wrong with this, DM me @lordbunson [ IGN . ]#0718 in the /r/SWSH Discord. I'm a pokemon noob, so there's likely several mistakes. If you found this guide helpful feel free to `+ rep` me in the `#bot_spam` channel.

- Thanks to @Calculus#0240 for the probabilities.
- Thanks to /u/Stan64 for his Guide [How to: Hunt Super-Rare Gigantamax Pokémon from Dens](https://www.reddit.com/r/pokemon/comments/dz2n3d/how_to_hunt_superrare_gigantamax_pok%C3%A9mon_from_dens/).
- Everyone in [/r/PokeMonSwordAndShield Discord](https://discord.gg/pokemonswordshield) for holding my hand through the process.
