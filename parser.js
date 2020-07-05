function run() {
    reset();

    const codeRunner = document.getElementById("code_runner");
    codeRunner.innerHTML = "";

    const codeLines = document.getElementById("code").value.split("\n");
    codeLines.forEach(line => {
        line = line.trim();
        if (line && line[0] !== "*") {
            let newRunnerLine = document.createElement("li");
            newRunnerLine.appendChild(document.createTextNode(line.toLowerCase()));
            codeRunner.appendChild(newRunnerLine);
        }
    });

    parse(codeRunner);
}

function reset() {
    robo.hasBox = false;

    box.hide();
    robo.hide();

    box.show(document.getElementById("box_x").value, document.getElementById("box_y").value);
    robo.show(document.getElementById("robo_x").value, document.getElementById("robo_y").value);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function parse(codeRunner) {
    const codeEditor = document.getElementById("code_editor");

    codeEditor.style.display = "none";
    codeRunner.style.display = "initial";

    let lineCorrect = false;

    for (let lineToParse of codeRunner.getElementsByTagName("li")) {
        let pauseMilliseconds = 3000;

        lineToParse.style.fontWeight = "bold";

        const tokens = lineToParse.innerText.split(" ");
        tokens[tokens.length - 1] = tokens[tokens.length - 1].replace(/\;$/, '');

        if (tokens[0] == "program") {
            await sleep(1000);

            lineToParse.style.fontWeight = "normal";
            continue;
        }
        else if (tokens[0] == "begin") {
            await sleep(1000);

            lineToParse.style.fontWeight = "normal";
            continue;
        }
        else if (tokens[0] == "end") {
            break;
        }
        else if (tokens[0] == "say" || tokens[0] == "say:") {
            tokens.shift();
            robo.say(tokens.join(" "));
            await sleep(3000);
            robo.shutUp();

            lineCorrect = true;
            pauseMilliseconds = 0;
        }
        else if (tokens[0] == "move_sur") {
            lineCorrect = robo.move(null, robo.y + parseInt(tokens[1]));
        }
        else if (tokens[0] == "move_norte") {
            lineCorrect = robo.move(null, robo.y - parseInt(tokens[1]));
        }
        else if (tokens[0] == "move_este") {
            lineCorrect = robo.move(robo.x + parseInt(tokens[1]), null);
        }
        else if (tokens[0] == "move_oeste") {
            lineCorrect = robo.move(robo.x - parseInt(tokens[1]), null);
        }
        else if (tokens[0] == "take_box") {
            lineCorrect = robo.getBox();
        }
        else if (tokens[0] == "put_box") {
            lineCorrect = robo.dropBox();
        }
        else if (tokens[0] == "move") {
            lineCorrect = robo.move(tokens[1], tokens[2]);
        } else {
            alert("¡¡¡Orden " + tokens[0] + " desconocida!!!");
            break;
        }

        if (lineCorrect) {
            await sleep(pauseMilliseconds);
        } else {
            alert("¡¡¡Error al ejecutar la orden " + tokens[0] + "!!!");
            break;
        }

        lineToParse.style.fontWeight = "normal";
    }

    codeRunner.style.display = "none";
    codeEditor.style.display = "initial";
}
