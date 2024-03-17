[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/C_k9ew3E)
# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.


## Runtime Analysis of TSP Local Search Implementation Using 2-opt Algorithm

### Time Complexity Analysis:
- **Initial Route Generation**: The generation and shuffling of the initial route have a linear complexity $O(n)$, as it involves iterating over each city once.
- **Distance Calculation**: Calculating the total distance of a route is also linear $O(n)$, due to the iteration over consecutive city pairs in the route.
- **2-opt Swap**: Each swap operation, where a route segment is reversed, runs in $O(n)$ in the worst case when reversing a significant portion of the route. This function is key for exploring new routes that might provide a shorter total distance.
- **Main Algorithm**: The crucial part to the algorithm is the iterative improvement process. For each iteration, potentially $O(n^2)$ 2-opt-swaps must be considered (all possible $(i, k)$ pairs). If each swap's impact is assessed by recalculating the total route distance $O(n)$, the per-iteration complexity reaches $O(n^3)$ in the worst case.

Based on the iterative nature and depending on the stopping criteria's design (e.g., a fixed number of iterations, or until no improvement is found), the total time complexity for the entire process typically reaches $Θ(n^3)$ in the worst case scenario.

### Memory Complexity Analysis:
- **Distance Matrix Storage**: The largest fixed memory requirement is the storage of the distance matrix, with a complexity of $O(n^2)$.
- **Route Storage**: The 2-opt algorithm uses space equivalent to the number of cities, $O(n)$, for tracking both the current route and any alternatives considered during swaps. This is crucial for comparing routes and deciding on improvements.

### Conclusion:
- **Worst-Case Time Complexity**: Potentially $Θ(n^3)$ per iteration, largely dependent on the implementation of the iterative improvement process and stopping criteria.
- **Worst-Case Memory Complexity**: $Θ(n^2)$, dominated by the storage requirements for the distance matrix.


