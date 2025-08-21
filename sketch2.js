//layout//
let margin; 
let x; 
let y;
let rectHeight; 
let rectWidth;  

//animate//
let fr = 60; 

//text//
let titleFont; 
let titleSize; 
let subHFont; 
let subHSize; 
let bodyFont; 
let bodySize; 

//color lib 
let cBackground; 

//wave and disturbance patterns 
let amp = 20, k = 0.06; 
let rippleAmp = 20, rippleFreq = 0.05, rippleDecay = 0.005; 

let inkDrops = []; // array for multiple ink drops

let projectNames = ["A Perfect Storm", "Worn Textile Trade", "Planting Calendar", 
                    "To Capture a Feeling", "Climate Resilience Report", 
                    "La Lettura", "Visualizing the Waste System", "Data sketches", 
                    "Unicef Guidance Note"]; 

// dropdown menu
let projectsOpen = false; 

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(fr);
    pixelDensity(2); 
    colorMode(HSB, 360, 100, 100, 100); 

    titleFont = loadFont('Jura/Jura-Bold.ttf');
    subHFont  = loadFont('Jura/Jura-SemiBold.ttf'); 
    bodyFont  = loadFont('Jura/Jura-Light.ttf'); 

    calculateLayout(); 

  // Basic color library (HSB)
    cBackground = color(0, 0, 0);     // black

  placeInkDrops(); // <- randomize centers within radius
}

function calculateLayout(){
    margin = windowWidth/20; 
    x = width/2; 
    y = height/2; 

    titleSize = sqrt(windowWidth)*4; 
    subHSize = (titleSize/2);
    bodySize = (titleSize/6); 
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    calculateLayout();
    placeInkDrops(); // re-randomize within new radius
}

function draw(){
    background(0, 0, 100, 100); // white

    drawInkDrops(); 
    titleText(); 

    navBar(); 

}


    function navBar(){
        // if (inkDrops && inkDrops.length >= 3) {
        // const midIndex = floor(inkDrops.length / 2); // middle = 1 when length=3
        // const midDrop = inkDrops[midIndex];
    
        // const barHue = midDrop.baseHue;
        // const barSat = midDrop.baseSat;
        // const barBri = midDrop.baseBright;
    
        // noStroke();
        // fill(barHue, barSat, barBri, 40); // HSB with full alpha
        // const barHeight = 60;              // tweak as needed
        // rect(0, 0, width, barHeight);
        // }

        noStroke(); 
        fill(0, 0, 0, 100);
        const barHeight = height/15; 
        rect(0, 0, windowWidth, barHeight); 

        let hovering = false; 
        hovering = projects() || hovering;
        hovering = about() || hovering; 

        if(hovering){
            cursor(HAND);
        } else {
            cursor(ARROW); 
        }
    }

    function projects(){
        textSize(bodySize); 
        textFont(titleFont); 

        const barHeight = height/15; 
        const tx = width/4;
        const ty = barHeight/2; 

        const tw = textWidth("PROJECTS");
        const th = textAscent() + textDescent();

        fill(0, 0, 100, 100);
        text("PROJECTS", tx, ty);

        //label hover detection
        const isMouseOverLabel = 
            mouseX > tx - tw/2 && mouseX < tx + tw/2 &&
            mouseY > ty - th/2 && mouseY < barHeight;

        const boxW = tw * 3;

        const isMouseOverDropdown = projectsOpen && isOverDropdown(tx, barHeight, boxW); 

        //state management
        if(isMouseOverLabel){
            projectsOpen = true; 
        } else if(!isMouseOverDropdown){
            projectsOpen = false; 
        }

        if(projectsOpen){
            drawDropdown(tx, barHeight, boxW);
        }

        return isMouseOverLabel || isMouseOverDropdown; 

    }

    function isOverDropdown(centerX, topY, widthBox){

        const itemH = bodySize * 1.5;
       const totalH = itemH * projectNames.length;
    
        return mouseX > centerX - widthBox/2 && mouseX < centerX + widthBox/2 &&
            mouseY > topY && mouseY < topY + totalH;
    }

        function drawDropdown(centerX, topY, widthBox) {
            let itemH = bodySize * 1.5;
        
            for (let i = 0; i < projectNames.length; i++) {
            let idx = i +1; 
            let y0 = topY + i * itemH;
            let isHover = mouseX > centerX - widthBox/2 && mouseX < centerX + widthBox/2 &&
                            mouseY > y0 && mouseY < y0 + itemH;
        
            if (isHover) {
                fill(0, 0, 90, 90); // hover background
                rect(centerX - widthBox/2, y0, widthBox, itemH);
                fill(0, 0, 0);
                if (mouseIsPressed) {
                window.open('book' + idx + '.html', '_self'); // adjust link targets
                }
            } else {
                fill(0, 0, 95); // normal background
                rect(centerX - widthBox/2, y0, widthBox, itemH);
                fill(0, 0, 0);
            }

            textSize(bodySize); 
            textFont(bodyFont); 
        
            textAlign(CENTER, CENTER);
            text(projectNames[i], centerX, y0 + itemH/2);
            }
        }
        


    function about(){
        textSize(bodySize); 
        textFont(titleFont); 

        const barHeight = height/15; 
        const tx = width/4*3;
        const ty = barHeight/2;
        const tw = textWidth("ABOUT");
        const th = textAscent() + textDescent();

        fill(0, 0, 100, 100);

        let isMouseOver = mouseX > tx - tw/2 && mouseX < tx + tw/2 &&
        mouseY > ty - th/2 && mouseY < ty + th/2;

        if(isMouseOver && mouseIsPressed){
            window.open('about.html', '_self');
        }
        
        text("ABOUT", tx, ty);
        return isMouseOver; 
    }

function placeInkDrops() {
  // radius around canvas center for ink drop placement
  // tweak factor for tighter/looser clustering
    textSize(titleSize);
    textFont(titleFont || 'Arial');
    const title = "chloe prock";
    const titleW = textWidth(title);

    const cx = width / 2;
    const cy = height / 2 + margin/2;

    // centers at 1/6, 3/6, 5/6 across the span
    const left = cx - titleW / 2;
    const spacing = titleW / 2;
    const centers = [
        { x: left + titleW * (1/6), y: cy },
        { x: left + titleW * (3/6), y: cy },
        { x: left + titleW * (5/6), y: cy }
    ];


    // radius just under half the spacing to avoid overlap
    let r = spacing * 0.75;
    // safety clamp for extremely large/small screens
    r = constrain(r, 8, min(width, height) * 0.35);

    if (inkDrops.length !== 3) {
        inkDrops = centers.map(p => new InkDrop(p.x, p.y, 15, 200));
    } else {
        for (let i = 0; i < 3; i++) {
        inkDrops[i].setCenter(centers[i].x, centers[i].y);
        inkDrops[i].resetGrowth(); // restart intro if you resize
        }
    }

    // Tell each drop its target max radius derived from title width
    for (let d of inkDrops) d.setTargetRadius(r);
}

function titleText(){
  // Fade in based on the *earliest* (max progress) so title appears once any drop is mostly grown
    // const p = inkDrops.length ? max(...inkDrops.map(d => d.getProgressEased())) : 1;
    // const alpha = map(p, 0, 1, 0, 100); 

    fill(0, 0, 100, alpha); 
    noStroke(); 
    textFont(titleFont || 'Arial');
    textAlign(CENTER, CENTER); 
    textSize(titleSize); 


    if(width > 500){
    
    text("chloe prock", x, y); 

    } else if (width <= 500) {
    text("chloe", x, y - margin*2);
    text("prock", x, y + margin*2); 
    }

    console.log(width); 

}

function drawInkDrops(){
    const speed = 1.5; 
    const t = millis() / 1000 * speed; 

    for (let ink of inkDrops) {
        ink.update(mouseX, mouseY, t);
        ink.render();
    }
}

class InkDrop {
    constructor(cx, cy, ringStep = 5, points = 200){
    this.cx = cx;
    this.cy = cy; 
    this.points = points; 
    this.ringStep = ringStep; 

    this.mx = cx; 
    this.my = cy; 
    this.t = 0;
    this.lastT = undefined;

    this.baseHue = 0;
    this.baseSat = 80;
    this.baseBright = 50;

    // growth animation
    this.progress = 0;
    this.growSpeed = 0.08; 
    //this.maxRTarget = windowWidth / 3; 
    }

    setTargetRadius(r){
        this.maxRadiusTarget = max(1, r); 
    }

    resetGrowth(){

        this.progress = 0;
        this.lastT = undefined; 
    }

    setCenter(cx, cy){
        this.cx = cx;
        this.cy = cy;
    }

    update(mx, my, t){
    if (this.lastT === undefined) this.lastT = t;
    const dt = max(0, t - this.lastT);
    this.lastT = t;

    this.mx = mx;
    this.my = my; 
    this.t = t; 

    this.progress = constrain(this.progress + dt * this.growSpeed, 0, 1);

    let a = atan2(this.my - this.cy, this.mx - this.cx);
    if (a < 0) a += TWO_PI;
    this.baseHue = degrees(a); 
}

    getProgressEased(){
    const p = this.progress;
    return 1 - pow(1 - p, 3);
    }

    render() {
    const cx = this.cx;
    const cy = this.cy;

    // size scales with window width (per-drop)
    const targetMaxR = this.maxRadiusTarget;
    const p = this.getProgressEased();
    const maxR = max(1, targetMaxR * p); 

    const numRings = floor(maxR / this.ringStep);
    if (numRings <= 0) return;

    const hueSlope = 80 / maxR;
    const satSlope = 30 / maxR;

    for (let i = numRings; i > 0; i--) {
      const r = i * this.ringStep;

      let hue = this.baseHue + (r * hueSlope);
    if (hue < 0) hue += 360;
    else if (hue >= 360) hue -= 360;

      let sat = this.baseSat + (r * satSlope);
    sat = constrain(sat, 0, 100);

    fill(hue, sat, this.baseBright, 5);
    beginShape();

    for (let pnt = 0; pnt < this.points; pnt++) {
        const angle = TWO_PI * pnt / this.points;
        const radius = r + sin(k * r - this.t) * amp;

        const px = cx + cos(angle) * r;
        const py = cy + sin(angle) * r;
        const dMouse = dist(px, py, this.mx, this.my);

        const ripple =
          sin(rippleFreq * dMouse - this.t * 2.0) *
          rippleAmp *
          exp(-rippleDecay * dMouse);

        const finalR = radius + ripple;

        const x = cx + cos(angle) * finalR;
        const y = cy + sin(angle) * finalR;

        vertex(x, y);
    }
    endShape(CLOSE);
    }
}
}


