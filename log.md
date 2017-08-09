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


