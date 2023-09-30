/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @return {boolean}
 */
var checkContradictions = function (equations, values) {
    let graph = new Map();
    let visited = new Map();

    const isContradiction = (v, ratio) => {
        let containsContradiction = false;
        if (!visited.has(v)) {
            visited.set(v, ratio);
            const adjacencies = graph.get(v);
            adjacencies.forEach(adj => {
                const [nextV, nextRatio] = adj;
                if (isContradiction(nextV, ratio / nextRatio)) {
                    containsContradiction = true;
                }
            })
        }

        return containsContradiction || Math.abs(visited.get(v) - ratio) >= Math.pow(10, -5);
    }

    for (let i = 0; i < equations.length; i++) {
        let [v1, v2] = equations[i];
        let ratio = values[i];
        if (!graph.has(v1)) {
            graph.set(v1, []);
        }
        if (!graph.has(v2)) {
            graph.set(v2, []);
        }

        graph.get(v1).push([v2, ratio]);

        graph.get(v2).push([v1, 1.0 / ratio]);
    }

    let containsContradictions = false;
    graph.forEach((rates, num, map) => {
        if (!visited.has(num) && isContradiction(num, 1)) {
            containsContradictions = true;
        }
    });

    return containsContradictions;
};