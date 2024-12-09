const content = document.getElementById("content");

class Map {
    constructor(size) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(0));
    }

    markPoint(x, y) {
        this.grid[x][y] = 1;
    }

    render() {
        content.innerHTML = "";
        this.grid.forEach(row => {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");

            row.forEach(cell => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cube");
                if (cell === 1) cellDiv.classList.add("pointed");
                rowDiv.append(cellDiv);
            });

            content.append(rowDiv);
        });
    }

    randomWalk(steps) {
        let x = Math.floor(Math.random() * this.size);
        let y = Math.floor(Math.random() * this.size);
        this.markPoint(x, y);

        let stepsTaken = 1; //
        const directions = [
            [-1, 0], // вверх
            [1, 0],  // вниз
            [0, -1], // ліво
            [0, 1]   // право
        ];

        const interval = setInterval(() => {
            const [dx, dy] = directions[Math.floor(Math.random() * 4)];
            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < this.size && newY >= 0 && newY < this.size && this.grid[newX][newY] === 0) {
                x = newX;
                y = newY;
                this.markPoint(x, y);
                stepsTaken++;
            }

            this.render();

            if (stepsTaken >= steps) {
                clearInterval(interval);
                setTimeout(() => alert("Simulation complete!"), 100);
            }
        }, 800);
    }
}
const map = new Map(8);
map.render();
let steps = parseInt(prompt("Enter the number of steps:"), 10);
while (isNaN(steps) || steps <= 0) {
    alert("Please enter a positive number!");
    steps = parseInt(prompt("Enter the number of steps:"), 10);
}
map.randomWalk(steps);
