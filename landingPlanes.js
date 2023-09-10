function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

function getPeaks(list) {
    let node = list
    let numPeaks = 0;

    let prevNode = null;
    while (node) {
        const isPeak = prevNode !== null && prevNode.val < node.val && node.next.val < node.val;

        if (isPeak) {
            numPeaks++;
        }
        prevNode = node;
        node = node.next;
    }

    return numPeaks;
}

function arrayToList(array) {
    const list = array.reduceRight((next, num) => {
        const node = new ListNode(num);
        node.next = next;
        return node;
    }, null);
    return list;
}


//console.log(getPeaks(arrayToList([2, 3, 2, 3, 2])));

function landingPlanes(listOfTimes) {
    let latestLanding = 0;
    let timeSetPerPlane = []
    let maxNumberInAir = 0;

    timeSetPerPlane = listOfTimes.map((times) => {
        let [takeoff, landing] = times;
        if (landing > latestLanding) {
            latestLanding = landing;
        }
        let i = takeoff;
        let planeTimes = new Set()
        while (i < landing) {
            planeTimes.add(i);
            i++;
        }
        return planeTimes;
    })

    for (let i = 0; i < latestLanding; i++) {
        let currentInAir = 0;

        timeSetPerPlane.forEach(set => {
            if (set.has(i)) {
                currentInAir++;
            }
        })
        if (currentInAir > maxNumberInAir) {
            maxNumberInAir = currentInAir;
        }
    }

    return maxNumberInAir;
}

const planeTable = [[1, 4], [2, 6], [7, 9], [5, 8]]

console.log(landingPlanes(planeTable));