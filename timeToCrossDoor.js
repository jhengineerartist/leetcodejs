/**
 * @param {number[]} arrival
 * @param {number[]} state
 * @return {number[]}
 */
var timeTaken = function (arrival, state) {
    const output = new Array(arrival.length); // will hold door-traversal times
    const arrivalTimeToPersonList = new Map();
    const exitQueue = [];
    const entrQueue = [];
    let latestArrival = 0;
    let isExiting = true; // true means gate allows exit, false means entrace

    for (let i = 0; i < arrival.length; i++) {
        // find the latest arrival time for our processing loop
        latestArrival = latestArrival < arrival[i] ? arrival[i] : latestArrival;

        if (arrivalTimeToPersonList.has(arrival[i])) {
            arrivalTimeToPersonList.get(arrival[i]).push({ person: i, dest: state[i] });
        }
        else {
            arrivalTimeToPersonList.set(arrival[i], [{ person: i, dest: state[i] }])
        }
    }

    let t = 0;
    let processedArrivals = false;
    while (t <= latestArrival || exitQueue.length > 0 || entrQueue.length > 0) {
        let personsArriving = arrivalTimeToPersonList.get(t); // list of people arriving at t

        if (personsArriving !== undefined) {
            // Enqueue new arrivals in their necessary Queues
            personsArriving.forEach(({ person, dest }) => {
                // dest = true means exit, false means entrance
                if (dest) {
                    exitQueue.push(person);
                }
                else {
                    entrQueue.push(person);
                }
            })
        }
        processedArrivals = exitQueue.length > 0 || entrQueue.length > 0;

        // If our last action was entering and the entrance queue is empty, flip the
        // exit bit
        if (processedArrivals && !isExiting && entrQueue.length === 0) {
            isExiting = true;
        }

        // In an exiting state, first drain the exit queue
        if (isExiting && exitQueue.length > 0) {
            const person = exitQueue.shift(); // dequeue the first person to wait to exit.
            output[person] = t;
        }
        // If we have no one left to exit, we can flip the isExiting bit
        else if (processedArrivals && isExiting && exitQueue.length === 0) {
            isExiting = false;
        }

        // We've handled the exiting case, on to draining the entering case
        if (!isExiting && entrQueue.length > 0) {
            const person = entrQueue.shift(); // dequeue the first person to wait to exit.
            output[person] = t;
        }
        t++;
    }
    return output;
};

console.log(timeTaken([3, 3, 4, 5, 5, 5], [1, 0, 1, 0, 1, 0]))