function generateInitialRoute(n) {
    // Generate a random initial route
    const route = Array.from({length: n}, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [route[i], route[j]] = [route[j], route[i]];
    }
    return route;
}

function calculateTotalDistance(route, distance_matrix) {
    // Calculate the total distance of a given route
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
        totalDistance += distance_matrix[route[i]][route[i + 1]];
    }
    return totalDistance;
}

function twoOptSwap(route, i, k) {
    // Perform a 2-opt swap by reversing segment between i and k
    const newRoute = [...route.slice(0, i), ...route.slice(i, k + 1).reverse(), ...route.slice(k + 1)];
    return newRoute;
}

function tsp_ls(distance_matrix) {
    const n = distance_matrix.length;
    if (n <= 2) return 0; // For 1 or 2 cities, the route is trivial

    let route = generateInitialRoute(n);
    let bestDistance = calculateTotalDistance(route, distance_matrix);
    let improved = true;

  // Stop when no improvement is found after a full iteration over all possible swaps
    while (improved) {
        improved = false;

        for (let i = 1; i < n - 2; i++) {
            for (let k = i + 1; k < n - 1; k++) {
                const newRoute = twoOptSwap(route, i, k);
                const newDistance = calculateTotalDistance(newRoute, distance_matrix);

                if (newDistance < bestDistance) {
                    route = newRoute;
                    bestDistance = newDistance;
                    improved = true;
                    break; // Exit early for the first improvement found
                }
            }
            if (improved) break; // Restart the search for further improvements
        }
    }

    return bestDistance;
}



