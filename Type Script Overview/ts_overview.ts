/* ==========================================================================  **
##
Making a Shareable Pizza
You're building an app that lets users order a shareable pizza by choosing
different toppings for different parts of the pizza. In this midterm, we'll
build out some of the functionality for this application.
There are several toppings we can put on this pizza:
1. CHEESE
2. CHICKEN
3. PEPPERONI
3. MUSHROOMS
4. SAUCE
Normally, we could encode a pizza as just a list of toppings. However, we would
like to make a shareable pizza. Consequently we would like to encode the ability
to divide the pizza up into sections, and choose different toppings for 
different sections of the pizza. This motivates the following encoding.
** ============================================================================ */

export type Toppings = 
    "CHEESE"
  | "SAUCE"
  | "CHICKEN"
  | "PEPPERONI"
  | "MUSHROOMS";

export type Slice = {
    tag: "SLICE",
    name: string,             // The name of the person that the pizza is for
    toppings: Toppings[]      // An array of toppings,
                              // 0th index contains the toppings at the bottom
                              // duplicate toppings means that we have a double order of those toppings
}

export type Halve = {
    tag: "HALVE",
    halve1: Pizza,
    halve2: Pizza
};

export type Pizza = 
    Slice
  | Halve


export function newSlice(name: string, toppings: Toppings[]): Slice {
    return {
        tag: "SLICE",
        name: name,
        toppings: toppings
    };
}

export function newHalve(halve1: Pizza, halve2: Pizza): Halve {
    return {
        tag: "HALVE",
        halve1: halve1,
        halve2: halve2
    };
}


/* ==========================================================================  **
## 
Example: pizza1
 A ["MUSHROOM", "CHEESE"] slice
 Slice
 |-----------------------------------------------| 
 | Dan                                           |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |       ["MUSHROOOM", "CHEESE"]                 |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |-----------------------------------------------|
 
Example: pizza2
 A ["SAUCE", "CHICKEN", "CHICKEN"] slice
 
 |-----------------------------------------------| 
 | Jane                                          |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |       ["SAUCE", "CHICKEN", "CHICKEN"]         |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |-----------------------------------------------|
 Example: pizza3
 A ["MUSHROOM", "CHEESE"] halve and
 a ["CHICKEN", "CHEESE"] halve
 |-----------------------------------------------| 
 | Dan                                           |
 |                                               |
 |                                               |
 |           ["MUSHROOOM", "CHEESE"]             |
 |                                               |
 |                                               |
 |-----------------------------------------------|
 | Bob                                           |
 |                                               |
 |                                               |
 |            ["CHICKEN", "CHEESE"]              |
 |                                               |
 |                                               |
 |                                               |
 |-----------------------------------------------|
Example: pizza4
 The top halve has A ["MUSHROOM", "CHEESE"] halve slice and
 a ["CHICKEN", "CHEESE"] halve slice.
 The bottom halve has ["SAUCE", "CHICKEN", "CHICKEN"]
 |-----------------------------------------------| 
 | Dan                   | Bob                   |
 |                       |                       |
 |                       |                       |
 | ["MUSHROOMS",         | ["CHICKEN",           |
 |  "CHEESE"]            |  "CHEESE"]            |
 |                       |                       |
 |                       |                       |
 |-----------------------------------------------|
 | Jane                                          |
 |                                               |
 |                                               |
 |  ["SAUCE", "CHICKEN", "CHICKEN"]              |
 |                                               |
 |                                               |
 |-----------------------------------------------|
** ============================================================================ */

export const pizza1 = newSlice("Dan", ["MUSHROOMS", "CHEESE"]);

export const pizza2 = newSlice("Jane", ["SAUCE", "CHICKEN", "CHICKEN"]);

export const pizza3 = 
    newHalve(
        newSlice("Dan", ["MUSHROOMS", "CHEESE"]),
        newSlice("Bob", ["CHICKEN", "CHEESE"]),
    );

export const pizza4 =
    newHalve(
        pizza3,
        pizza2,
    );

export const pizz5 = newHalve(pizza1, pizza3);



/* ==========================================================================  **
## Problem 1: Basic functions on pizza slices (20 pts)
** ============================================================================ */


/* ----------------------------------------------------- **
### Problem 1a (5 pts):
Write a *pure* function that renames a slice.
Example:
    renameSlice(pizza1, "Daniel") = 
        { 
            tag: 'SLICE',
            name: 'Daniel',
            toppings: [ 'MUSHROOMS', 'CHEESE' ]
        }
Example:
    renameSlice(pizza1, "Danny") = 
        { 
            tag: 'SLICE',
            name: 'Danny',
            toppings: [ 'MUSHROOMS', 'CHEESE' ] 
        }
** ----------------------------------------------------- */

export function renameSlice(slice: Slice, newName: string): Slice {
    
    let temp1 = newSlice(slice.name, slice.toppings);
    temp1.name = newName;
    return temp1;
}

/* ----------------------------------------------------- **
### Problem 1b (5 pts):
Write a *pure* function that adds toppings to the top of a pizza slice.
Duplicate toppings **are** allowed. Remember, this corresponds to having
an extra serving of that topping.
Example:
    addToppingsToSlice(pizza1, []) =
        { 
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE' ] 
        }
Example:
    addToppingsToSlice(pizza1, ["CHICKEN"])
        {
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE', 'CHICKEN' ]
        }
Example:
    addToppingsToSlice(pizza1, ["CHICKEN", "CHEESE"]) = 
        {
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE', 'CHICKEN', 'CHEESE' ]
        }
Example:
    addToppingsToSlice(pizza2, ["CHICKEN", "CHEESE", "SAUCE"]) = 
        {
            tag: 'SLICE',
            name: 'Jane',
            toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN', 'CHICKEN', 'CHEESE', 'SAUCE' ]
        }
** ----------------------------------------------------- */

export function addToppingsToSlice(slice: Slice, toppings: Toppings[]): Slice {
    const t: Slice = {
        tag: slice.tag,
        name: slice.name,
        toppings: []
    };


    for(const x of slice.toppings){
        t.toppings.push(x)
    }

    for(const x of toppings){
        t.toppings.push(x);
    }

    return t
}


/* ----------------------------------------------------- **
### Problem 1c (10 pts):
Write a *pure* function that removes a topping from a pizza slice.
If the topping does not exist, return the slice unchanged.
Example:
    removeToppingFromSlice(pizza2, "CHICKEN") = 
        { tag: 'SLICE', name: 'Jane', toppings: [ 'SAUCE' ] }
Example:
    removeToppingFromSlice(pizza2, "SAUCE") = 
        { tag: 'SLICE', name: 'Jane', toppings: [ 'CHICKEN', 'CHICKEN' ] }
Example:
    removeToppingFromSlice(pizza2, "CHEESE") =
        {
            tag: 'SLICE',
            name: 'Jane',
            toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
        }
** ----------------------------------------------------- */

export function removeToppingFromSlice(slice: Slice, topping: Toppings): Slice {

    let top: Toppings[] = slice.toppings;
    let result;

    result = top.filter(function(x){
        return x !== topping;
    })

    return newSlice(slice.name, result);
}

/* ==========================================================================  **
## Problem 2: Basic functions on Pizzas (35 pts)
** ============================================================================ */

/* ----------------------------------------------------- **
### Problem 2a (10 pts):
Write a *pure* function that gives the weight of a topping.
The weight of toppings is given below.
CHEESE: 4
CHICKEN: 6
MUSHROOMS: 2
PEPPERONI: 1
SAUCE: 3
Example:
    weightOfTopping("CHEESE") = 4
Example:
    weightOfTopping("CHICKEN") = 6
Example:
    weightOfTopping("MUSHROOMS") = 2
Example:
    weightOfTopping("PEPPERONI") = 1
Example:
    weightOfTopping("SAUCE") = 3
** ----------------------------------------------------- */

export function weightOfTopping(topping: Toppings): number {

    let top: Toppings = topping
    switch(top){
        case("CHEESE"):
            return 4;
        case("CHICKEN"):
            return 6;
        case("MUSHROOMS"):
            return 2;
        case("PEPPERONI"):
            return 1;
        case("SAUCE"):
            return 3;

    }
}

/* ----------------------------------------------------- **
### Problem 2b (10 pts): 
Write a *pure* function that splits a slice in half if the name of the slice 
matches the given name. The first halve of the pizza should be the original
slice. The second halve of the pizza should be the pizza. If the name of the
slice does not match, return the slice unchanged.
Example:
    weightOfToppingsInSlice(pizza1) = 6
Example:
    weightOfToppingsInSlice(pizza2) = 15
** ----------------------------------------------------- */

export function weightOfToppingsInSlice(slice: Slice): number {
    let temp = 0;
    let tempSlice = newSlice(slice.name, slice.toppings);
    for(let i = 0; i < tempSlice.toppings.length; i++){
        temp += weightOfTopping(tempSlice.toppings[i]);
    }

    return temp
}


/* ----------------------------------------------------- **
### Problem 2c (15 pts):
Write a *pure* function that, given a pizza halve and a name, removes
the pizza halve slice with that name. This means that the unremoved
half will "double" in size.
1. Do *not* recurse.
2. As a reminder, you can assume that there are no duplicate names.
3. If the name does not exist, return the halve unchanged.
Example:
    removeSliceFromHalve(pizza3, "Dan") = 
        { tag: 'SLICE', name: 'Bob', toppings: [ 'CHICKEN', 'CHEESE' ] }
Example:
    removeSliceFromHalve(pizza3, "Bob") =
        { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] }
Example:
    removeSliceFromHalve(pizza3, "Jane") = 
        {
            tag: 'HALVE',
            halve1: { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] },
            halve2: { tag: 'SLICE', name: 'Bob', toppings: [ 'CHICKEN', 'CHEESE' ] }
        }
Example:
    removeSliceFromHalve(pizza4, "Jane") =
        {
            tag: 'HALVE',
            halve1: { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] },
            halve2: { tag: 'SLICE', name: 'Bob', toppings: [ 'CHICKEN', 'CHEESE' ] }
        }
Example:
    removeSliceFromHalve(pizza4, "Dan") =
    {
        tag: 'HALVE',
        halve1: {
            tag: 'HALVE',
            halve1: { tag: 'SLICE', name: 'Dan', toppings: [Array] },
            halve2: { tag: 'SLICE', name: 'Bob', toppings: [Array] }
        },
        halve2: {
            tag: 'SLICE',
            name: 'Jane',
            toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
        }
    }
** ----------------------------------------------------- */

export function removeSliceFromHalve(halve: Halve, name: string): Pizza {

    let temp = newHalve(halve.halve1, halve.halve2);

    if(temp.halve1.tag === "SLICE"){
        if(temp.halve2.tag === "SLICE"){
            if(temp.halve1.name === name) {
                return newSlice(temp.halve2.name, temp.halve2.toppings)
            }else if(temp.halve2.name === name) {
                return newSlice(temp.halve1.name, temp.halve1.toppings)
            }
        } else if(temp.halve2.tag === "HALVE"){
            return newHalve(temp.halve1, removeHelper(temp.halve2, name));

        }
    } else if(temp.halve1.tag === "HALVE"){
        if(temp.halve2.tag === "SLICE"){
            if(temp.halve2.name === name){
                return newHalve(temp.halve1.halve1, temp.halve1.halve2);
            }       
        } else if(temp.halve2.tag === "HALVE"){
            return newHalve(temp.halve1, removeHelper(temp.halve2, name));
        }
    }

    function removeHelper(halve: Halve, name: string): Pizza {
        let tempHelp = newHalve(halve.halve1, halve.halve2);
        if(tempHelp.halve1.tag === "SLICE" && tempHelp.halve2.tag === "SLICE"){
            if(tempHelp.halve1.name === name){
                return newSlice(tempHelp.halve2.name, tempHelp.halve2.toppings);
            }
            if (tempHelp.halve2.name === name){
                return newSlice(tempHelp.halve1.name, tempHelp.halve1.toppings);
            }
        }
        return tempHelp;
    }

    return temp;
}

/* ==========================================================================  **
## Problem 3: Complex functions on Pizzas (45 pts)
** ============================================================================ */

/* ----------------------------------------------------- **
### Problem 3a (20 pts): 
Write a **pure** function that adds toppings to all slices in a pizza.
The behavior of adding toppings to a slice is the same as `addToppingsToSlice`.
Example:
    addToppingsToPizza(pizza1, ["CHEESE"]) =
        {
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE', 'CHEESE' ]
        }
Example:
    addToppingsToPizza(pizza2, ["CHEESE", "CHEESE"]) =
        {
            tag: 'SLICE',
            name: 'Jane',
            toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN', 'CHEESE', 'CHEESE' ]
        }
Example:
    addToppingsToPizza(pizza3, ["SAUCE"]) = 
        {
        tag: 'HALVE',
        halve1: {
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE', 'SAUCE' ]
        },
        halve2: {
            tag: 'SLICE',
            name: 'Bob',
            toppings: [ 'CHICKEN', 'CHEESE', 'SAUCE' ]
        }
        }
Example:
    addToppingsToPizza(pizza4, ["SAUCE"]) =
        {
            tag: 'HALVE',
            halve1: {
                tag: 'HALVE',
                halve1: {
                tag: 'SLICE',
                name: 'Dan',
                toppings: [ 'MUSHROOMS', 'CHEESE', 'SAUCE' ]
                },
                halve2: {
                tag: 'SLICE',
                name: 'Bob',
                toppings: [ 'CHICKEN', 'CHEESE', 'SAUCE' ]
                }
            },
            halve2: {
                tag: 'SLICE',
                name: 'Jane',
                toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN', 'SAUCE' ]
            }
        }
** ----------------------------------------------------- */

export function addToppingsToPizza(pizza: Pizza, toppings: Toppings[]): Pizza {
    

    if(pizza.tag === "SLICE"){
        let temp = addToppingsToSlice(pizza, toppings);
        return temp;
    } else {
        if(pizza.halve1.tag === "SLICE" && pizza.halve2.tag === "SLICE") {
            return newHalve(
                addToppingsToSlice(pizza.halve1, toppings),
                addToppingsToSlice(pizza.halve2, toppings)
            )
        } else{
            return newHalve(
                addToppingsToPizza(pizza.halve1, toppings),
                addToppingsToPizza(pizza.halve2, toppings)
            )
        }
    }
}

/* ----------------------------------------------------- **
### Problem 3b (25 pts): 
Write a **pure** function that gets the weight of all toppings in a pizza.
The weight of toppings in a slice is given by `weightOfToppingsInSlice`.
However, the weight of topping is needs to be adjusted for the size of the
slice. In particular, for every halve that a slice is part of, we should
decrease the weight by 50%.
Thus, if a slice is
1. part of 1 halve, then the weight of the topping should be multiplied by 0.5
2. part of 2 halves, then the weight of the topping should be multiplied by 0.25
3. part of 3 halves, then the weight of the topping should be multiplied by 0.125
4. etc.
Example:
    weightOfToppingsInPizza(pizza1) = 6
Example:
    weightOfToppingsInPizza(pizza2) = 15
Example:
    weightOfToppingsInPizza(pizza3) = 8
Example:
    weightOfToppingsInPizza(pizza4) = 11.5
** ----------------------------------------------------- */

export function weightOfToppingsInPizza(pizza: Pizza): number {
    let temp;
    
    if(pizza.tag === "HALVE"){
        temp = newHalve(pizza.halve1, pizza.halve2);
    } else {
        temp = newSlice(pizza.name, pizza.toppings);
    }

    if(temp.tag === "SLICE"){
        return weightOfToppingsInSlice(temp);
    } else {
        if(temp.halve1.tag === "SLICE" && temp.halve2.tag === "SLICE"){
            return 0.5 * (weightOfToppingsInSlice(temp.halve1) + weightOfToppingsInSlice(temp.halve2));
        } else {
            return 0.5 * (weightOfToppingsInPizza(temp.halve1) + weightOfToppingsInPizza(temp.halve2));
        }
    }

    return 0;
}


/* ==========================================================================  **
## Bonus (30 pts):
Write a **pure** function `tradeSlices` that swaps slices between two people
sharing a pizza. If the names are not found, return the pizza unchanged.
Otherwise, exchange the slices for each other. You may want to do this because
one person has a larger slice than the other.
Example:
    tradeSlices("Dan", "Jane", pizza4) = 
    {
        tag: 'HALVE',
        halve1: {
            tag: 'HALVE',
            halve1: { tag: 'SLICE', name: 'Jane', toppings: [Array] },
            halve2: { tag: 'SLICE', name: 'Bob', toppings: [Array] }
        },
        halve2: { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] }
    }
Example:
    tradeSlices("Dan", "Bob", pizza4) =
        {
            tag: 'HALVE',
            halve1: {
                tag: 'HALVE',
                halve1: { tag: 'SLICE', name: 'Bob', toppings: [Array] },
                halve2: { tag: 'SLICE', name: 'Dan', toppings: [Array] }
            },
            halve2: {
                tag: 'SLICE',
                name: 'Jane',
                toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
            }
        }
Example:
    tradeSlices("Jill", "Dan", pizza4) =
        {
            tag: 'HALVE',
            halve1: {
                tag: 'HALVE',
                halve1: { tag: 'SLICE', name: 'Dan', toppings: [Array] },
                halve2: { tag: 'SLICE', name: 'Bob', toppings: [Array] }
            },
            halve2: {
                tag: 'SLICE',
                name: 'Jane',
                toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
            }
        }
** ============================================================================ */

export function tradeSlices(name1: string, name2: string, pizza: Pizza): Pizza {
    let t: Toppings[];
    let n: Toppings[];
    if(pizza.tag === "HALVE"){
        let temp = newHalve(pizza.halve1, pizza.halve2);
        if(temp.halve1.tag === "SLICE" && temp.halve2.tag === "SLICE"){
            if(temp.halve1.name === name1 || temp.halve1.name === name2){
                t = temp.halve1.toppings
            }
            if(temp.halve2.name === name1 || temp.halve2.name === name2){
                t = temp.halve1.toppings
            }
        } else if(temp.halve1.tag === "HALVE" && temp.halve2.tag === "SLICE"){
            if(temp.halve2.name === name1 || temp.halve2.name === name2){
                n = temp.halve2.toppings

                if(temp.halve1.halve1.tag === "SLICE" && temp.halve1.halve2.tag === "SLICE"){
                    if(temp.halve1.halve1.name === name1 || temp.halve1.halve1.name === name2){
                        t = temp.halve1.halve1.toppings
                        temp.halve1.halve1.toppings = n;
                        temp.halve2.toppings = t;
                    }
                    if(temp.halve1.halve2.name === name1 || temp.halve1.halve2.name === name2){
                        t = temp.halve1.halve2.toppings
                        temp.halve1.halve2.toppings = n;
                        temp.halve2.toppings = t;
                    }
                }
            }
        }
        return temp;
    }
    
    return pizza;
}

