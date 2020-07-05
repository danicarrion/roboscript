const box = {
    x: null,
    y: null,
    currentCell: null,
    show: function (newX, newY) {
        if (newX !== null && newX !== undefined) {
            this.x = parseInt(newX);
        }
        if (newY !== null && newY !== undefined) {
            this.y = parseInt(newY);
        }

        this.currentCell = document.getElementById("cell_" + this.x.toString() + this.y.toString());
        if (!(this.currentCell)) {
            return false;
        }

        this.currentCell.style.backgroundImage = "url('box.png')";
        this.currentCell.style.backgroundSize = "cover";

        return true;
    },
    hide: function () {
        if (this.currentCell) {
            this.currentCell.style.backgroundImage = null;
            this.currentCell = null;

            if (robo.x == this.x && robo.y == this.y) {
                robo.show();
            }
        }
    }
}
