---
title: "Recipe Normalization"
date: "2021-09-07"
coverImage: "./cover.png"
category: ["fun"]
---

In deep learning, we use normalization to solve gradient vanishing or explosion. It kind of inspired me to apply normalization to a recipe.

Let’s dive in.

This is a gluten free, diary free, processed sugar free cake recipe.

* 1/2 cup coconut flour, or 8 tbs
* 1/2 cup cacao
* 1/2 tsp salt 
* 1/2 tsp baking soda 
* 1/4 cup coconut oil
* 1 cup raw honey
* 6 eggs
([Link](https://www.youtube.com/watch?v=Hlh1RJ1Tmig) to recipe & tutorial)

If you are making this for yourself, it’s a pretty big cake. You could freeze it, but the texture becomes suboptimal.

I decided to apply a similar normalization idea. I’ll normalize the recipe wrt the eggs. 

* **1 egg**, and divide everything by 6.
* 1.3 tbs coconut flour (8 tbs/6 = 1.3 tbs approx.)
* 1.3 tbs caco
* 1/12 tsp salt
* 1/12 tsp baking soda
* 4 tsp coconut oil
* 8 tsp raw honey

Now, it yields one serving. You could alternatively normalize wrt the coconut oil or raw honey, just like how we have batch norm, layer norm, etc in deep learning.

Happy cooking.