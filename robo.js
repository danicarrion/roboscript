const robo = {
    x: null,
    y: null,
    currentCell: null,
    hasBox: false,
    show: function (newX, newY) {
        if (newX !== null && newX !== undefined) {
            this.x = parseInt(newX);
        }
        if (newY !== null && newY !== undefined) {
            this.y = parseInt(newY);
        }

        if (this.hasBox) {
            box.x = this.x;
            box.y = this.y;
        }

        this.currentCell = document.getElementById("cell_" + this.x.toString() + this.y.toString());
        if (!(this.currentCell)) {
            return false;
        }

        if (box.x == this.x && box.y == this.y) {
            if (this.hasBox) {
                this.currentCell.style.backgroundImage = "url('box.png'), url('robo.png')";
                this.currentCell.style.backgroundSize = "50%, cover";
            } else {
                this.currentCell.style.backgroundImage = "url('robo.png'), url('box.png')";
                this.currentCell.style.backgroundSize = "cover, cover";
            }
        } else {
            this.currentCell.style.backgroundImage = "url('robo.png')";
            this.currentCell.style.backgroundSize = "cover";
        }

        return true;
    },
    hide: function () {
        if (this.currentCell) {
            this.currentCell.style.backgroundImage = null;
            this.currentCell = null;

            if (!(this.hasBox) && box.x == this.x && box.y == this.y) {
                box.show();
            }
        }
    },
    move: function (newX, newY) {
        this.hide();

        return this.show(newX, newY);
    },
    getBox: function () {
        if (box.x == this.x && box.y == this.y) {
            this.hasBox = true;
            return this.show();
        } else {
            return false;
        }
    },
    dropBox: function () {
        if (this.hasBox) {
            this.hasBox = false;
            return this.show();
        } else {
            return false;
        }
    },
    say: function (text) {
        const tooltip = document.getElementById("tooltip_" + this.x.toString() + this.y.toString());
        tooltip.appendChild(document.createTextNode(text));
        tooltip.style.visibility = "visible";
    },
    shutUp: function () {
        const tooltip = document.getElementById("tooltip_" + this.x.toString() + this.y.toString());
        tooltip.style.visibility = "hidden";
        tooltip.innerHTML = "";
    }
}
