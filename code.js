function generateInitialRoute(n) {
    // O(n) - Generate a random initial route
    let route = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [route[i], route[j]] = [route[j], route[i]]; // Swap
    }
    return route;
}

function calculateRouteLength(route, distance_matrix) {
    // O(n) - calculate total length of a route
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
        totalDistance += distance_matrix[route[i]][route[i + 1]];
    }
    return totalDistance;
}

function tsp_ls(distance_matrix) {
    const n = distance_matrix.length;
    let route = generateInitialRoute(n); // Random initial route
    let bestLength = calculateRouteLength(route, distance_matrix);
    let improvement = true;
    const maxIterationsWithoutImprovement = 1000; // Stopping criterion
    let iterationsWithoutImprovement = 0;

    while (improvement) {
        improvement = false;

        // Nested loops contribute to O(n^2) complexity per iteration
        for (let i = 1; i < n - 1 && iterationsWithoutImprovement < maxIterationsWithoutImprovement; i++) {
            for (let k = i + 1; k < n && iterationsWithoutImprovement < maxIterationsWithoutImprovement; k++) {
                let newRoute = 2optSwap(route, i, k); // O(n) - Performs the 2-opt swap
                let newLength = calculateRouteLength(newRoute, distance_matrix);

                // check for improvement to update best route found
                if (newLength < bestLength) {
                    route = newRoute;
                    bestLength = newLength;
                    improvement = true;
                    iterationsWithoutImprovement = 0; // Reset counter on improvement
                } else {
                    iterationsWithoutImprovement++;
                }
            }
        }

        if (!improvement) {
            break; // Exit loop if no improvement found
        }
    }

    return bestLength; // returns length of the shortest tour found
}

function 2optSwap(route, i, k) {
    // O(n) - reverses the route between i and k
    const newRoute = [
        ...route.slice(0, i),
        ...route.slice(i, k + 1).reverse(),
        ...route.slice(k + 1)
    ];
    return newRoute;
}
