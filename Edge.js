class Edge {
    constructor(vertexOne, vertexTwo) {
        this.vertexOne = vertexOne;
        this.vertexTwo = vertexTwo;
    }
    getTangent() {
        return this.vertexOne.getSubtract(this.vertexTwo);
    }
    getNormalizedTangent() {
        return this.getTangent().getNormalized();
    }
    getPerpendicular() {
        return this.getNormalizedTangent().getPerpendicular();
    }
    getABC() {
        let AB = this.getPerpendicular();
        let dot = AB.getDot(this.vertexOne);
        let C = -dot;
        return { A: AB.x, B: AB.y, C }
    }
    getPixels() {

        let startX = this.vertexOne.x;
        let startY = this.vertexOne.y;
        let endX = this.vertexTwo.x;
        let endY = this.vertexTwo.y;

        let toReturn = [];

        let tangent = this.getNormalizedTangent();
        let absX = Math.abs(tangent.x)
        let absY = Math.abs(tangent.y)
        let m = Math.max(absX, absY);
        let inverse = 1 / m;
        let offTangent = new Vertex2(tangent.x * inverse, tangent.y * inverse)
        let steps = this.getTangent().getLength() / offTangent.getLength();

        let x = startX;
        let y = startY;

        let count = 0;
        while (count < steps) {
            count++;
            toReturn.push(
                new Pixel(
                    Math.round(x),
                    Math.round(y),
                    255, 255, 255));
            x += offTangent.x;
            y += offTangent.y;

        }


        // for(let x = startX; x <= endX; x++){
        //     for(let y = startY; y < endY; y++){
        //         toReturn.push(new Pixel(x,y, 255,255,255))
        //     }
        // }


        return toReturn;
    }
}