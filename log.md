# Logs

Tried the svg method of displaying the elements. The elements display pretty well, the CSS works fine enough. The positioning is tight, and it looks like it is going to work.

---

Setting up the foundation structure of the game logic. I followed a micro controller style execution loop, following the Arduino `setup` and `loop` naming conventions.

Included certain features right from the start - fps and game state. Probably should add a default state later on. For now, putting it in `setup` will do.

---

Doesn't seem like I am able to access the `cx` and `cy` of the circles easily. I wanted to build a library free pure vanilla web game. Looks like I am going back to the absolute positioning method.

From celljs experience, I learnt that you can actually embed data in the HTML elements themselves, I am going to make full use of these feature in the game. Storing all the positioning on the elements themselves.

---

I am going to add the centering of the circles early on to prevent future calculation nightmares. Created a new function `draw` for all these updating of elements.

Have to check on how to delete HTML elements.

---

the physics now is not really realistic, but i guess it will do for now. it doesn't take into account the change in the strength of gravity as the distance between the planets changes.

---

now figuring out how to make the player orbit around the planet after engaged in orbit.

tried to use the actual physics calculation of setting a tangent and then making the object keep falling towards the planet (through gravity). it produces a very good effect, it is very realistic, but it doesn't work well for gameplay.

trying simple geometrical orbit instead.

---

instead of writing the math to calculate the change in the direction, imma setting the position directly. it will be much simpler. but it is not that simpler.

i think the update bearing function must be called only when needed. by only updating the bearing when needed, the direction is set and the direction will not change when the hero is in orbit.

---

checked the keyboard event for firefox and chrome. looks like i have to use the `key` as the identifier to tell which key stroke is pressed.

---

function to rebase the planet and generate a new target planet is done. time to work on the jumping function. from one planet to the other. from `base` to `target`.

---

now that jumping works, the game physics is almost done. now just have to do all the gameplay logic, score and the rest of the game mechanics.

with the addition of the checking of external boundaries. the basic game is done. time to add the blings blings.

---

now are changing to using global variables for the game canvas for easier calculation, to prevent bugs, where the player freezes when it is beyond the borders. the problem lies in the x, y positioning of the elements is offset by the radius, hence the complications in determining if the elements is out of boundaries.

refactoring done. time to add the bell and whistles. first up, tokens to collect.

---

**side track**: a little talk about the reasons why i picked to have everything round for this particular project. it is for a very simple reasons. the calculations are much easier. being very lazy, it would be a chore to implement multiple axis checks using axis collision detection. hence the decision to use round elements. just check the radius and you are done.

abit of refactoring done here for future easy generation of circle objects. that's all for now. next part, i will adding in the coins. refactoring is an important part of creating good and clean code. always leave the code a bit better than you found it.

---

**part 5**

okay, i realize the inconsistency in the live videos length. i will now try to keep it around 30 mins.

this part, i will be adding in the coins for the game play.

the generation of coins is done, together with the movement and removal of coins. now for the scoring mechanism 

---

**part 6**

getting the coins to work, the scoring. i am going to design it such that it is possible for me to add coins path in the middle of the planets later on.

the game mechanics is pretty much done. added the scoring mechanism. it's a playable game.

there is some lag happening here. i guess i am updating the style far too often. now imma refactor the code to reduce the restyling.

removed the redrawing every loop. loks like that's not the problem, but rather it is more the issue of having too many coins.

imma ending this part here. in the next part, we will be focusing on resolving the problem of lag.

---

**part 7**

last time, we were looking for a solution for the lag. we got it down to the number of coin checks for each round. we found this out because of the significant lag after we altered the number of coins to appear. a recap on how we test this out.

one of the ways we can do this is to do a bearing check and then just doing a distance check on a few coins in the range. the double counting might be a even greater overhead. i will embed the counting inside the main check function instead.

much faster now, using the bearing for calculation. looks like the `get_distance` calculation is pretty expensive. now i just got to make sure the bearing of the player do not jumps from one planet to another, which results in glitchy removal of coins.

for accuracy, using half segments of the maximum coin for checking. significant reduction in laginess. good progress. now for the line of coins in between the planets. imma working out some values on paper first.

setting up the basic structure for adding the path coins in. in the next part, we will be adding the coins into the loop.

---

**part 8**

this section, we are going to be adding in the coins on the paths between the planets. these coins will be placed closed to the target planet along the way. the straight line path. after that, we will change according to the difficulty.

now that we make it appear, we must make a dissappear when it reaches the target planet as well. we will be adding the following into the `check_engaged` portion of the code.

now to add in the function to put the coins into gameplay. the path coins are now in play.

---

**part 9**

this part, we will be adding in the sun. the sun has a very very high gravity. this will make the curvature a little harder.

there is a little lag. but we will deal with that later. now taht we got the sun displayed, we will add in the gravity pull for the sun.

i figured this will take some time. let me debug this first. in the next section, we will be fixing the problem of the sun causing the player to freeze without errors.

---

**part 10**

last part, we had a bug which caused the player to freeze up. i found the bug after searching for a while. it looks like we have forgotten to give the sun gravity. because we never did define the `sun.g`. the `add_gravity` function went bonkers.

anyway, that's fixed now. so now, we are testing the value of the sun's gravity, testing to see which value works better. because the sun is much much closer to the player at the start of the journey, we will have to greatly decrease the value of its pull. unless, we place it in another position.

this value looks good enough for now. we will be sticking to this value. together with the random generation of the sun, this game looks complete. next up, asteriods. but before that, let's shift the sun towards the target a little.

additional score for jumping quick. each uncollected planet coins is worth 3. adding asteriods in the next section.

---

**part 11**

other than adding in the asteriods, i will be putting in the details to make the game a little harder, help increasing the difficulty of the game itself. some how the value doesn't seem to increase. this is probably a bug that i need to fix.

the difficulty increase looks fine, now we will be moving on to the asteroid generation. drew the asteriod (or the stone). that will be all for now. in the next section, we will be adding the collision detection to the asteriod.

---

**part 12**

this part, we will be adding the asteriod collision logic. let's see what we have for now.

the game is mostly done now. even the reset. now for the instructions. the work here is almost done.

yep and we are done. a game in pure vanilla javascript, html and css

---

**part 13**

this last part, we will be adding in the score feature. for global scoring. it is not a fool proof system, it is in no way secure, but for our usage of a casual game, this is good enough for us.

well... that's it

# fin (for real)
