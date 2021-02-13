var svgns = "http://www.w3.org/2000/svg";

function makeDraggable(evt) {
    var svg = evt.target;

    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
    svg.addEventListener('touchstart', startDrag);
    svg.addEventListener('touchmove', drag);
    svg.addEventListener('touchend', endDrag);
    svg.addEventListener('touchleave', endDrag);
    svg.addEventListener('touchcancel', endDrag);

    var selectedElement, offset, transform,
        bbox, minX, maxX, minY, maxY, confined;

    var boundaryX1 = 10.5;
    var boundaryX2 = 30;
    var boundaryY1 = 2.2;
    var boundaryY2 = 19.2;

    redrawLabels();

    function getMousePosition(evnt) {
        var CTM = svg.getScreenCTM();
        if (evnt.touches) { evnt = evnt.touches[0]; }
        return {
            x: (evnt.clientX - CTM.e) / CTM.a,
            y: (evnt.clientY - CTM.f) / CTM.d
        };
    }

    function startDrag(evnt) {
        if (evnt.target.classList.contains('draggable')) {

            selectedElement = evnt.target;
            offset = getMousePosition(evnt);

            // Make sure the first transform on the element is a translate transform
            var transforms = selectedElement.transform.baseVal;

            if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                // Create an transform that translates by (0, 0)
                var translate = svg.createSVGTransform();
                translate.setTranslate(0, 0);
                selectedElement.transform.baseVal.insertItemBefore(translate, 0);
            }

            // Get initial translation
            transform = transforms.getItem(0);
            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;

            confined = evnt.target.classList.contains('confine');
            if (confined) {
                bbox = selectedElement.getBBox();
                minX = boundaryX1 - bbox.x;
                maxX = boundaryX2 - bbox.x - bbox.width;
                minY = boundaryY1 - bbox.y;
                maxY = boundaryY2 - bbox.y - bbox.height;
            }
        }
    }

    function drag(evnt) {
        if (selectedElement) {
            evnt.preventDefault();

            var coord = getMousePosition(evnt);
            var dx = coord.x - offset.x;
            var dy = coord.y - offset.y;

            if (confined) {
                if (dx < minX) { dx = minX; }
                else if (dx > maxX) { dx = maxX; }
                if (dy < minY) { dy = minY; }
                else if (dy > maxY) { dy = maxY; }
            }

            //raster 3
            //dx = dx - (dx % 3);
            //dy = dy - (dy % 3);

            //raster 1
            dx = Math.round(dx);
            dy = Math.round(dy);

            transform.setTranslate(dx, dy);

            redrawLabels();
        }
    }

    function endDrag(evnt) {
        selectedElement = false;
        updateModel();
    }
}

function updateModel() {
    console.log("Update Model");
}

function redrawLabels() {
    removeLabels();
    drawLabels();
}

function removeLabels() {
    Array.from(document.getElementsByClassName("lbl")).forEach(
        function (element, index, array) {
            element.remove();
        }
    );
}

function drawLabels() {
    Array.from(document.getElementsByClassName("draggable")).forEach(
        function (element, index, array) {
            

            var text = document.createElementNS(svgns, 'text');
            text.setAttributeNS(null, 'x', parseFloat(element.getAttribute("x")) + 2);
            text.setAttributeNS(null, 'y', parseFloat(element.getAttribute("y")) + 2);
            text.setAttributeNS("", 'transform', element.getAttributeNS(null, "transform"));

            text.setAttributeNS(null, 'font-size', 1.5);
            text.setAttributeNS(null, 'font-family', "Verdana");

            text.setAttributeNS(null, 'fill', '#222222');
            text.setAttributeNS(null, 'class', 'lbl');
            text.textContent = element.getAttribute("data-label");
            document.getElementById('plan').appendChild(text);
        }
    );
}

function createTable() {
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', 5);
    rect.setAttributeNS(null, 'y', 5);
    rect.setAttributeNS(null, 'height', document.getElementById("objH").value);
    rect.setAttributeNS(null, 'width', document.getElementById("objW").value);
    rect.setAttributeNS(null, 'fill', '#b3d9ff');
    rect.setAttributeNS(null, 'class', 'draggable');
    rect.id = document.getElementById("objId").value;
    rect.setAttributeNS(null, 'data-label', rect.id);
    document.getElementById('plan').appendChild(rect);

    for (var j = 0; j < parseInt(document.getElementById("objC").value); j++)
        createChair(document.getElementById("objId").value, 'C' + j);

    redrawLabels();
}

function createChair(table, chair) {
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', 5);
    rect.setAttributeNS(null, 'y', 5);
    rect.setAttributeNS(null, 'height', 6);
    rect.setAttributeNS(null, 'width', 6);
    rect.setAttributeNS(null, 'fill', '#bf80ff');
    rect.setAttributeNS(null, 'class', 'draggable');
    rect.setAttributeNS(null, 'data-table', table);
    rect.id = table + chair;
    rect.setAttributeNS(null, 'data-label', chair);
    document.getElementById('plan').appendChild(rect);
    redrawLabels();
}

/*
 * 
 * Table have ID and the Label is at the same time the label
 * Chairs does have ID in form of <TableID> + C + <ChairNumber>
 * The Label does only Contain C + <Chairnumber>
 * The chair does have a table attribute, which identifies the table
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

//exports the view as .md file
function exportMD(){
    var output = "";
    var draggables = document.getElementsByClassName("draggable");

    for (var j = 0; j < draggables.length; j++) {

        var style = window.getComputedStyle(draggables[j]);
        var matrix = new WebKitCSSMatrix(style.webkitTransform);

        var x = parseFloat(draggables[j].getAttribute("x")) + matrix.m41;
        var y = parseFloat(draggables[j].getAttribute("y")) + matrix.m42;


        if (draggables[j].hasAttribute("data-table")) { //its a chair
            output += "    * "
                + draggables[j].getAttribute("data-label") + " "
                + x + " " + y + " "
                + "\n";
        } else { //its a table
            output += "* "
                + draggables[j].getAttribute("data-label") + " "
                + x + " " + y + " "
                + draggables[j].getAttribute("width") + " "
                + draggables[j].getAttribute("height") + " "
                + "\n";
        }
    }

    download("plan.md", output);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
