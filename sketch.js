let margin; 
let x; 
let y;
let rectHeight; 
let rectWidth;  

//books 
let bookHeight; 
let bookWidth;
let numBooks;
let bookSpace;


//color lib 
let purple; 
let lightPurple; 
let black; 
let green; 
let offWhite; 
let midPurple; 

//animate//
let fr = 30; 

//text//
let titleFont; 
let titleSize; 

let subHFont; 
let subHSize; 

let bodyFont; 
let bodySize; 

//clock//
let cx; 
let cy; 
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  frameRate(fr);

  titleFont = loadFont('https://chloeprock.github.io/myPortfolio/Jura/Jura-Bold.ttf');
  
  subHFont = loadFont('https://chloeprock.github.io/myPortfolio/Jura/Jura-SemiBold.ttf'); 
  bodyFont = loadFont('https://chloeprock.github.io/myPortfolio/Jura/Jura-Light.ttf'); 

    // Check if fonts are loaded
    if (titleFont && subHFont && bodyFont) {
      // Fonts are loaded, you can use them

    } else {
      // Fonts failed to load, provide fallback or handle the error
      console.error("Fonts failed to load.");
      // You can provide a fallback font or take other actions here
      titleFont = 'Arial', '20'; 
      subHFont = 'Arial', '12'; 
      bodyFont = 'Arial', '10'; 
    }

  calculateLayout(); 

  //color library 
  purple = color(136, 18, 255); 
  lightPurple = color(237, 218, 255); 
  black = color(0); 
  green = color(141, 196, 139); 
  offWhite = color(245, 255, 249); 
  midPurple = color(170, 145, 189); 
}

function calculateLayout(){
  margin = windowWidth/20; 
  x = margin; 
  y = margin; 
  rectHeight = windowHeight / 2.3; 
  rectWidth = windowWidth / 1.5 - windowWidth/5; 
  titleSize = sqrt(windowWidth)*2; 
  subHSize = (titleSize/2);
  bodySize = (titleSize/3); 
  //console.log(titleSize); 
  //console.log(bodySize); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateLayout();
}

function draw() {
  background(offWhite); 

  drawTitle(); 
  drawAbout(); 

  drawBookcase(); 
  clockSetup(); 
  drawClock();
  drawBooks();

  drawRoom(); 
  
  featuredProject(); 

}

function drawRoom(){
  let lineLength = 50; 

  stroke(purple); 

  //line extending left
  line(x + rectWidth/6, y + (rectHeight*2) - lineLength, x + rectWidth/6 - windowWidth, y + (rectHeight*2) - lineLength); 

  //line extending right 
  line(x + rectWidth/6 + rectWidth + lineLength, y + (rectHeight*2) - lineLength, x + rectWidth/6 + rectWidth + lineLength + windowWidth/4, y + (rectHeight*2) - lineLength); 

  //line extending up 
  line(x + rectWidth/6 + rectWidth + lineLength + windowWidth/4, y + (rectHeight*2) - lineLength, x + rectWidth/6 + rectWidth + lineLength + windowWidth/4, y + (rectHeight*2) - lineLength - windowHeight); 

  //corner 
  line(x + rectWidth/6 + rectWidth + lineLength + windowWidth/4, y + (rectHeight*2) - lineLength, x + rectWidth/6 + rectWidth + lineLength + windowWidth, y + (rectHeight*2) - lineLength + windowHeight);
}

function drawBookcase(){

  fill(lightPurple);  
  stroke(purple);
  strokeWeight(1); 

  let lineLength = 50; 

  //front rect 
  rect(x + rectWidth/6, y + rectHeight, rectWidth, rectHeight); 

  
  //right side rect 
  beginShape(); 
    //top right line 
    vertex(x + rectWidth/6 + rectWidth, y + rectHeight); 
    vertex(x + rectWidth/6 + rectWidth + lineLength, y + rectHeight - lineLength); 
  
    //right flat line
    vertex(x + rectWidth/6 + rectWidth + lineLength, y + rectHeight - lineLength);
    vertex(x + rectWidth/6 + rectWidth + lineLength, y + (rectHeight*2) - lineLength); 
  
    //botton right line
    vertex(x + rectWidth/6 + rectWidth, y + (rectHeight*2)); 
    vertex(x + rectWidth/6 + rectWidth + lineLength, y + (rectHeight*2) - lineLength); 
  
    //right bookcase line
    vertex(x + rectWidth/6 + rectWidth + lineLength, y + (rectHeight*2) - lineLength); 
    vertex(x + rectWidth/6 + rectWidth, y + (rectHeight*2)); 
  endShape(); 

  //top rect 
  beginShape(); 
    //top left line
    vertex(x + rectWidth/6, y + rectHeight); 
    vertex(x + rectWidth/6 + lineLength, y + rectHeight - lineLength); 

    //top flat line
    vertex(x + rectWidth/6 + lineLength, y + rectHeight - lineLength);
    vertex(x + rectWidth/6 + rectWidth + lineLength, y + rectHeight - lineLength); 

    //top right line
    vertex(x + rectWidth/6 + rectWidth, y + rectHeight); 
    vertex(x + rectWidth/6 + rectWidth + lineLength, y + rectHeight - lineLength); 

    //top bookcase line 
    vertex(x + rectWidth/6 + rectWidth + lineLength, y + rectHeight - lineLength); 
    vertex(x + rectWidth/6 + rectWidth, y + rectHeight); 
  endShape(); 

  //inner shelves 
  
  //shelf dividing line 
  line(x + rectWidth/6, y + rectHeight + (rectHeight/2), x + rectWidth/6 + rectWidth, y + rectHeight + (rectHeight/2));

  //bottom shelf line 
  line(x + rectWidth + rectWidth/6, y + (rectHeight*2) - lineLength, x + rectWidth/6 + lineLength, y + (rectHeight*2) - lineLength);

  //left shelf line -- bottom 
  line(x + rectWidth/6 + lineLength, y + (rectHeight*2) - lineLength, x + rectWidth/6 + lineLength, y + (rectHeight*2) - (rectHeight/2)); 

  //left shelf line -- top 
  line(x + rectWidth/6 + lineLength, y + (rectHeight*2) - (rectHeight/2) - lineLength, x + rectWidth/6 + lineLength, y + rectHeight); 

  //diaganol line 1: bottom shelf 
  line(x + rectWidth/6 + lineLength, y + (rectHeight*2) - lineLength, x + rectWidth/6 - sqrt(lineLength)/10, y + (rectHeight*2) + sqrt(lineLength)/10); 

  //diagonal line 2: mid shelf 
  line(x + rectWidth/6 + lineLength, y + (rectHeight*2) - lineLength - (rectHeight/2), x + rectWidth/6 - sqrt(lineLength)/10, y + (rectHeight*2) + sqrt(lineLength)/10 - (rectHeight/2)); 

  //shelf dividing line 
  line(x + rectWidth/6 + lineLength, y + rectHeight + (rectHeight/2) - lineLength, x + rectWidth/6 + rectWidth, y + rectHeight + (rectHeight/2) - lineLength);


}

let bookNames = ["Interactive Visualizations", "Print Design", "Client Work"];
let bookNamesB = ["Research", "Textile Art"];

function drawBooks(){

  let bookOffset = 20; 
  bookHeight = rectHeight/2 - bookOffset; 
  bookWidth = rectWidth/10; 
  numBooks = 3; 
  bookSpace = bookWidth; 

  for(let i = 0; i < numBooks; i++){
    let bookX = x + bookSpace + rectWidth/6; 
    let bookY = y + rectHeight + bookOffset/2; 
    let mouseOverBook = mouseX > bookX && mouseX < bookX + bookWidth && mouseY > bookY && mouseY < bookY + bookHeight;
    
    push();
    let rotationCenterX = bookX + bookWidth/2;
    let rotationCenterY = bookY + bookHeight/2; 
    translate(rotationCenterX, rotationCenterY); 


    if(i == 0){
      rotate(-0.2); 
    } else if (mouseOverBook && i == 0){
      rotate(-0.4); 
    } else if (mouseOverBook && (i == 1 || i == 2)) {
      rotate(0.2); 
    }

    if(mouseOverBook){
      fill(green);  
      strokeWeight(0.5); 
    } else {
      fill(purple); 
    }
    rect(-bookWidth / 2, -bookHeight / 2, bookWidth, bookHeight); // Centered around (0, 0)
    pop(); 

    if(mouseOverBook){
      drawCategory(bookNames[i]); 
      if(mouseIsPressed){
        if(i == 0){
          window.open('book1.html', '_self');
        }
        if(i == 1){
          window.open('book2.html', '_self'); 
        }
        if(i == 2){
          window.open('book3.html', '_self'); 
        }
      }
    }

    bookSpace += bookWidth*2; 
  }

  for(let i = 0; i < numBooks - 1; i++){
    let bookX = x - rectWidth/10 + bookSpace;
    let bookY = y + rectHeight + (rectHeight/2) + bookOffset/2; 
    let mouseOverBook = mouseX > bookX && mouseX < bookX + bookWidth && mouseY > bookY && mouseY < bookY + bookHeight;

    push(); 
    let rotationCenterX = bookX + bookWidth / 2; 
    let rotationCenterY = bookY + bookHeight / 2; 
    translate(rotationCenterX, rotationCenterY); 
    if(i == 1){
      rotate(0.2); 
    } else if (mouseOverBook && (i == 0 || i == 2)){
      rotate(-0.2); 
    }

    if(mouseOverBook){
      fill(green);
      strokeWeight(0.5);
    } else {
      fill(purple); 
    }

    //rect(bookX, bookY, bookWidth, bookHeight); 
    rect(-bookWidth / 2, -bookHeight / 2, bookWidth, bookHeight); // Centered around (0, 0)
    pop(); 

    if(mouseOverBook){
      drawCategory(bookNamesB[i]); 

      if(mouseIsPressed){
        if(i == 0){
          window.open('book4.html', '_self'); 
        }
        if(i == 1){
          window.open('book5.html', '_self'); 
        }
        if(i == 2){
          window.open('book6.html', '_self'); 
        }
      }

    }
    
    bookSpace += bookWidth*2; 

    }
}


function drawCategory(name){
  let lineLength = 50; 
  let offset = lineLength/2; 

  fill(purple);
  noStroke();  

  push();
  textAlign(CENTER); 
  textSize(bodySize);
  textFont(bodyFont); 
  text(name, x + rectWidth/6 + rectWidth/2 + offset, y + rectHeight - offset/1.5);
  pop();

}

function clockSetup(){
  let clockWidth = 75; 
  let clockHeight = 75; 
  let radius = min(clockWidth, clockHeight) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;
  
  //for clock on right side: 
  //cx = x + (rectWidth/6 + rectWidth) - radius*2; 
  //for clock on left side:
  cx = x + (rectWidth/6) + radius*2; 
  cy = y + rectHeight - radius*1.5; 
}

function drawClock(){
    // Draw the clock background

    noStroke();
    fill(purple);
    ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
    fill(offWhite);
    ellipse(cx, cy, clockDiameter, clockDiameter);

    //Draw clock legs 
    let legXR = cx + clockDiameter/2; 
    let legY = cy + clockDiameter/2;
    let legXL = cx - clockDiameter/2; 
    stroke(purple);
    strokeWeight(3);
    line(legXR, legY, legXR + 5, legY + 8); 
    line(legXL, legY, legXL - 5, legY + 8);


    // Angles for sin() and cos() start at 3 o'clock;
    // subtract HALF_PI to make them start at the top
    let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

    // Draw the hands of the clock
    stroke(purple);
    strokeWeight(0.5);
    line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
    strokeWeight(1);
    line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
    strokeWeight(4);
    line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

    // Draw the minute ticks
    strokeWeight(1);
    stroke(purple); 
    beginShape(POINTS);
    
    for (let a = 0; a < 360; a += 6) {
      let angle = radians(a);
      let x = cx + cos(angle) * secondsRadius;
      let y = cy + sin(angle) * secondsRadius;
      vertex(x, y);
    }
    endShape();
  
}


// function titleRect() {
//   let noiseScale = 0.2;

//   for (var i = 1; i <= rectIndex + rectToShow && i <= numRects; i++) {
//     let baseRectHeight = windowWidth/1.5; // Calculate base size
//     let baseRectWidth = windowHeight/1.5;

//     let n = noise(xOff + i);
//     let ny = map(n, 0, 3, -baseRectHeight/8, baseRectHeight/8);

//     let corner = 10; 
//     fill(random(120, 137, ), 113, 255, 50);
//     //stroke(255, 255, 255);
//     noStroke(); 
//     rect(x + ny, y + ny, baseRectHeight, baseRectWidth); // Use base size here
//   }

//   // Move to the next rectangle in the next frame
//   if (frameCount % fr === 0 && rectIndex < numRects) {
//     rectIndex++;
//   }

//   // Keep looping for jittering effect even after all rectangles have been drawn
//   if (rectIndex >= numRects) {
//     rectIndex = 0;
//   }
// }

function drawTitle(){
  fill(purple); 
  noStroke(); 
  textSize(titleSize); 
  textFont(titleFont);
  text("chloe prock", x + titleSize/2, y + titleSize); 
}

function drawAbout() {
  let baseWidth = windowWidth / 1.6;

  let ex = x + titleSize * 1.65 + baseWidth;
  let ey = y + titleSize / 1.2;

  strokeWeight(2);

  // Check if the mouse is over the ellipse
  let isMouseOverEllipse = mouseX > ex - subHSize * 2 && mouseX < ex + subHSize * 2 && mouseY > ey - subHSize && mouseY < ey + subHSize;

  if (isMouseOverEllipse) {
    fill(green);
    stroke(purple); 

    if(mouseIsPressed){
      window.open('about.html', '_self'); 
    }

  } else {
    noFill();
    stroke(purple); 
  }

  push(); 
  rectMode(CENTER); 
  rect(ex, ey, subHSize * 4, subHSize * 2);
  ellipse(ex, ey - subHSize*2, 2, 2); 
  strokeWeight(0.5);
  line(ex, ey - subHSize*2, ex - subHSize*2, ey - subHSize); 
  line(ex, ey - subHSize*2, ex + subHSize*2, ey - subHSize); 
  pop(); 

  // Draw the text "about" with the same condition
  if (isMouseOverEllipse) {
    fill(purple); // Change text color when mouse is over
    noStroke(); 
  } else {
    fill(purple); // Default text color
    noStroke(); 
  }
  push();
  textAlign(CENTER);
  textSize(subHSize);
  textFont(bodyFont);
  text("about", ex, ey + subHSize / 3);
  pop(); 
}

function featuredProject(){
  let baseWidth = windowWidth / 1.6;

  let fx = x + titleSize * 1.65 + baseWidth;
  let fy = y + titleSize * 4;

  strokeWeight(2);

  // Check if the mouse is over the ellipse
  let isMouseOverStar = mouseX > fx - subHSize * 2 && mouseX < fx + subHSize * 2 && mouseY > fy - subHSize && mouseY < fy + subHSize;

  if (isMouseOverStar) {
    fill(green);
    stroke(purple); 

    if(mouseIsPressed){
      window.open('featured.html', '_self'); 
    }

  } else {
    noFill();
    stroke(purple); 
  }

  push(); 
  rectMode(CENTER); 
  translate(fx, fy);
  rotate(frameCount / 200.0);
  star(0, 0, subHSize * 2.5, subHSize * 1.5, 12);
  pop(); 

  // Draw the text "about" with the same condition
  if (isMouseOverStar) {
    fill(purple); // Change text color when mouse is over
    noStroke(); 
  } else {
    fill(purple); // Default text color
    noStroke(); 
  }
  
  push();
  textAlign(CENTER);
  textSize(subHSize/2);
  textFont(bodyFont);
  text("featured", fx, fy + subHSize / 10);
  text("project", fx, fy + subHSize / 1.5);
  pop(); 


}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}







  
