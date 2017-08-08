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
