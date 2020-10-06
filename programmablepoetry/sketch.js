let font;

//// H O M E P A G E   D O M ////
var titletext;
var about;
var instructions;

//// B U T T O N S ////
var ul;
var button1;
var button2;
var button3;
var button4;

var submit;

var generatemore;
var undo;
var linebreak;
var printpoem;
var writingscrheading;
var writingscrbuttons;
var startoverbutton;

var submitbutton;
var americaexplain;
var americaexplainsctive = false;
var downloadbutton;
var gallerybutton;
var homebutton;


//// I M A G E S ////
var ginsygif;
var rupigif;
var dickinsongif;
var tsgif;


//// S C R E E N   A C T I V E ////
var homepageactive = false;
var titleauthorscractive = false;
var writingscractive = false;
var poemscractive = false;
var galleryscractive = false;
var peskybug = true;


//// P O E M   S T U F F ////
var selectedWords = [];
var allWords = [];
var poem = [];
var finalPoem = [];
var thisStylizedPoem = [];
var source;
var selected = false;
var selectedPoet;
var lineWidth;
var lineWidths = [];
var numberOfLines;


//// U S E R   I N P U T ////
let titleinput;
let authorinput;
var title;
var author;


//// G A L L E R Y ////
var placePoem = false;
var pastpoems;
var keys;
var gallerybkgrd;

//// F I R E B A S E ////
var database;
var ref;


//// C O N S T A N T S ////
var margin = 5;
var marginGallery = 10;
var startingAmount = 20;
var attemptsTimeOut = 50;
var pastPoemsNum = 5;

//   #bfbfbf   (191, 191, 191)  --> light grey
//   #212121   (33, 33, 33)     --> dark grey
//   #3e3e3e   (62, 62, 62)     --> button bg color





////////////////////   S E T   U P   /////////////////// 

function preload() {
    font = loadFont('fonts/InputMono-Regular.ttf');
    titletext = select("#titletext")
    about = select("#about")
    instructions = select("#instructions");
    ul = select("#buttons")
    button1 = select("#loadfile1");
    button2 = select("#loadfile2");
    button3 = select("#loadfile3");
    button4 = select("#loadfile4");

    ul.style('display', 'none');
    button1.style('display', 'none');
    button2.style('display', 'none');
    button3.style('display', 'none');
    button4.style('display', 'none');
    titletext.style('display', 'none');
    about.style('display', 'none');

    writingscrheading = select("#writingscrheading");
    writingscrbuttons = select("#writingscr");
    generatemore = select("#generatemore");
    undo = select("#undo");
    linebreak = select("#linebreak");
    printpoem = select("#printpoem");
    startoverbutton = select('#startover');
    startoverbutton.style('display', 'none');

    submitbutton = select("#submitbutton");
    submitbutton.style('display', 'none');

    americaexplain = select("#americaexplain");
    americaexplain.style('display', 'none');
    gallerybutton = select("#gallerybutton");
    gallerybutton.style('display', 'none');
    downloadbutton = select('#download');
    downloadbutton.style('display', 'none');
    homebutton = select("#homebutton");
    homebutton.style('display', 'none');


    var firebaseConfig = {
        apiKey: "AIzaSyD_iFG7zdoZr3k2TCATpAnXPPkuWNqFFcg",
        authDomain: "technopoetry-5e2fb.firebaseapp.com",
        databaseURL: "https://technopoetry-5e2fb.firebaseio.com",
        projectId: "technopoetry-5e2fb",
        storageBucket: "technopoetry-5e2fb.appspot.com",
        messagingSenderId: "569000949610",
        appId: "1:569000949610:web:14c91aabfc4e5f84511713"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    ref = database.ref('poems');
    ref.on("value", gotData, errData);
}

/**
 * Select DOM elements for homepage
 */
function setup() {
    ginsygif = createImg('loadingscr/ginsyload2.gif', "loading allen ginsberg");
    ginsygif.style('display', 'none');
    rupigif = createImg('loadingscr/rupiload2.gif', 'loading rupi kaur');
    rupigif.style('display', 'none');
    dickinsongif = createImg('loadingscr/dickinsonload2.gif', 'loading emily dickinson');
    dickinsongif.style('display', 'none');
    tsgif = createImg('loadingscr/tselliotload2.gif', 'load t.s. elliot');
    tsgif.style('display', 'none');
    gallerybkgrd = loadImage('img/gallerybackground4.jpg');
    
    homepageactive = true;
    rectMode(CORNER);
    frameRate(30);
    drawHomeScreen();
    lineWidth = width/2 + 20;
}

function draw() {
    
    if (selected == true && frameCount == 260) {
        ginsygif.style('display', 'none');
        rupigif.style('display', 'none');
        dickinsongif.style('display', 'none');
        tsgif.style('display', 'none');
        loadFile();
    } 
    
    if (galleryscractive == true && frameCount == 50) {
        placePoem = true;
    }

    if (homepageactive == true) {
        button1.mousePressed(loadGinsy);
        button2.mousePressed(loadRupi);
        button3.mousePressed(loadDickenson);
        button4.mousePressed(loadTS);
    }
   
    if (writingscractive == true) {
        generatemore.mousePressed(generateMoreWords);
        undo.mousePressed(undoAction);
        linebreak.mousePressed(insertLineBreak);
        printpoem.mousePressed(drawTitleAuthorCanvas);
        startoverbutton.mousePressed(goToHomepage);
//        for (let i = 0; i < selectedWords.length; i++) {
//            selectedWords[i].hovering();
//        }
    }
    
    if (titleauthorscractive == true) {
        submitbutton.mousePressed(submitPoem);
        startoverbutton.mousePressed(backToWriting);
    }
    
    if (poemscractive == true) {
        americaexplain.mousePressed(explanationPopUp);
        downloadbutton.mousePressed(printAtHome)
        gallerybutton.mousePressed(drawGalleryCanvas);
    }
    
    if (galleryscractive == true) {
        homebutton.mousePressed(goToHomepage);
    }
}

/**
 * Ginsy loading screen setup
 */
function loadGinsy() {
    selectedPoet = "allen ginsberg";
    loadingScreen();
    ginsygif.style('width', '100vw');
    ginsygif.style('height', '100vh');
    ginsygif.position(0, 0);
    ginsygif.style('display', 'block');
    source = "text/allenginsberg.txt";
}

/**
 * Rupi loading screen setup
 */
function loadRupi() {
    selectedPoet = "rupi kaur";
    loadingScreen();
    rupigif.style('width', '100vw');
    rupigif.style('height', '100vh');
    rupigif.position(0, 0);
    rupigif.style('display', 'block');
    source = "text/milkandhoney.txt";
}

/**
 * Dickenson loading screen setup
 */
function loadDickenson() {
    selectedPoet = "emily dickinson";
    loadingScreen();
    dickinsongif.style('width', '100vw');
    dickinsongif.style('height', '100vh');
    dickinsongif.position(0, 0);
    dickinsongif.style('display', 'block');
    source = "text/emilydickinson.txt";
}

/**
 * TS loading screen setup
 */
function loadTS() {
    selectedPoet = "t.s. elliot";
    loadingScreen();
    tsgif.style('width', '100vw');
    tsgif.style('height', '100vh');
    tsgif.position(0, 0);
    tsgif.style('display', 'block');
    source = "text/tselliot.txt";
}


/**
 * Style loading screen
 */
function loadingScreen() {
    homepageactive = false;
    titleauthorscractive = false;
    writingscractive = true;
    poemscractive = false;
    galleryscractive = false;
    createCanvas(windowWidth, windowHeight);
    frameCount = 0;
    selected = true;
    ul.style('display', 'none');
    button1.style('display', 'none');
    button2.style('display', 'none');
    button3.style('display', 'none');
    button4.style('display', 'none');
    titletext.style('display', 'none');
    about.style('display', 'none');
}

/**
 * Load selected file
 */
function loadFile() {
    loadStrings(source, fileLoaded);
    drawWritingScreen();
}




///////////////  R E A D   F I L E  ////////////////

/**
 * @param text of file
 *
 * Read file and clean words
 */
function fileLoaded(txt) {
    var seperated = [];
    for (let i = 0; i < txt.length; i++) {
    seperated = seperated.concat(split(txt[i], " "));
    }

    for (let i = 0; i < seperated.length; i++) {
    var clean = seperated[i].replace(/[^\w\s']/gi, '');
        if (clean != "") {
            allWords.push(new Word(clean.toLowerCase(), i));
        }
    }
    generateRandom(allWords, startingAmount); 
    print(allWords);
}

/**
 * @param array to genereate from
 * @param how many words to genereate
 *
 * Generate random words from array of all words
 */
function generateRandom(array, iterations) {
    for (let i = 0; i < iterations; i++) {
      selectedWords.push(random(array));
    }
    writeSelectedWords();
}

/**
 * Generate more words as prompted by user
 */
function generateMoreWords() {
    generateRandom(allWords, 5);
    period();
}






///////////////// P E R I O D /////////////////

/**
 * After each word is chosen
 */
function period() {
    drawWritingScreen();
    writeSelectedWords();
    displayPoem();
}

/**
 * Redraw over everything
 */
function drawWritingScreen() {
    homepageactive = false;
    titleauthorscractive = false;
    writingscractive = true;
    poemscractive = false;
    galleryscractive = false;
    
    createCanvas(windowWidth, windowHeight);
    selected = false;
    
    writingscrheading.style('display', 'block');
    writingscrbuttons.style('display', 'block');
    instructions.style('display', 'block');
    generatemore.style('display', 'inline');
    undo.style('display', 'inline');
    linebreak.style('display', 'inline');
    printpoem.style('display', 'inline');
    startoverbutton.style('display', 'block');
    
    rectMode(CORNER);
    stroke('#bfbfbf');
    strokeWeight(2);
    fill('#212121');
    rect(50, 15, width-100, height-150);
    line(width/2, 15, width/2, height-135);
}

/**
 * Display selected words on screen
 */
function writeSelectedWords() {
    for (let i = 0; i < selectedWords.length; i++) {
        selectedWords[i].updatePosition(i);
        if (selectedWords[i].displayed == false) {
            selectedWords[i].avoidOverlap();
        } else {
            selectedWords[i].display();
        }
    }
    if (peskybug) {
        deleteWord(0);
        peskybug = false;
        period();
    }
}

/**
 * Display poem on screen
 */
function displayPoem() {
    rectMode(CORNER);
    fill(191,191,191);
    textSize(22);
    textFont(font);
    textAlign(LEFT);
    
    if (titleauthorscractive) {
        text(" " + join(poem, " "), width/2 + 20, 200);
    }
    
    if (writingscractive) {
        text(" " + join(poem, " ") + " |", width/2 + 20, 100);
    }
}





//////////////   D R A W   P A G E S   ///////////////


/**
 * Draw Home Screen
 */
function drawHomeScreen() {
    homebutton.style('display', 'none');
    writingscrheading.style('display', 'none');
    startoverbutton.style('display', 'none');
    createCanvas(windowWidth, windowHeight);
    //pagebody.style('display', 'flex');
    ul.style('display', 'flex');
    button1.style('display', 'inline-block');
    button2.style('display', 'inline-block');
    button3.style('display', 'inline-block');
    button4.style('display', 'inline-block');
    titletext.style('display', 'block');
    about.style('display', 'block');
}

/**
 * Draw screen for user to enter author name
 */
function drawTitleAuthorCanvas() {
    homepageactive = false;
    titleauthorscractive = true;
    writingscractive = false;
    poemscractive = false;
    galleryscractive = false;
    createCanvas(windowWidth, windowHeight);
    writingscrheading.style('display', 'none');
    submitbutton.style('display', 'block');
    
    textAlign(LEFT);
        fill(191,191,191);
        noStroke();
        textSize(18);
        textFont(font)
        text("enter your name:", 70, height/2 - 200);
    
    authorinput = createInput();
        authorinput.size(500, 40);
        authorinput.position(70, height/2 - 170);
        authorinput.style('background-color', '#212121');
        authorinput.style('border-style', 'solid');
        authorinput.style('border-color', '#bfbfbf');
        authorinput.style('border-width', '2px');
        authorinput.style('color', '#bfbfbf');
        authorinput.style('font-size', '20px');
        authorinput.style('font-family', 'input-mono, monospace');
        authorinput.style('padding-left', "9px");
    
    textAlign(LEFT);
        fill(191,191,191);
        noStroke();
        textSize(18);
        textFont(font)
        text("give the poem a title:", 70, height/2);
    
    titleinput = createInput();
        titleinput.size(500, 40);
        titleinput.position(70, height/2+30);
        titleinput.style('background-color', '#212121');
        titleinput.style('border-style', 'solid');
        titleinput.style('border-color', '#bfbfbf');
        titleinput.style('border-width', '2px');
        titleinput.style('color', '#bfbfbf');
        titleinput.style('font-size', '20px');
        titleinput.style('font-family', 'input-mono, monospace');
        titleinput.style('padding-left', "9px");
    
    displayPoem();
}


/**
 * Draw screen for displaying final poem
 */
function drawPoemCanvas() {
    homepageactive = false;
    titleauthorscractive = false;
    writingscractive = false;
    poemscractive = true;
    galleryscractive = false;
    
    americaexplain.style('display', 'block');
    downloadbutton.style('display', 'block');
    gallerybutton.style('display', 'block');
    startoverbutton.style('display', 'none');
   
    authorinput.style('display', 'none');
    titleinput.style('display', 'none');
    authorinput.remove();
    titleinput.remove();
    authorinput.style('visibility', 'hidden');
    titleinput.style('visibility', 'hidden');
    createCanvas(windowWidth, windowHeight * 2);
}

/**
 * Draw screen for gallery
 */
function drawGalleryCanvas() {
    homepageactive = false;
    titleauthorscractive = false;
    writingscractive = false;
    poemscractive = false;
    galleryscractive = true;
    frameCount = 0;
    
    americaexplain.style('display', 'none');
    downloadbutton.style('display', 'none');
    gallerybutton.style('display', 'none');
    createCanvas(windowWidth, windowHeight * 2);
    homebutton.style('display', 'block');
    
    image(gallerybkgrd, 0, 0, width, height);
    
    rectMode(CORNER);
    fill(191,191,191);
    textSize(16);
    textFont(font);
    textAlign(LEFT);
    
    text("click where you'd like to add your poem in the gallery.\nscroll to explore the images and poems by other users.", 50, 50);
    putPastPoemsInGallery(pastPoemsNum);
}

/**
 * Go back to writing screen from title/author screen
 */
function backToWriting() {
    period();
    authorinput.style('display', 'none');
    titleinput.style('display', 'none');
    authorinput.remove();
    titleinput.remove();
    authorinput.style('visibility', 'hidden');
    titleinput.style('visibility', 'hidden');
    submitbutton.style('display', 'none');
}





///////////////  L I N E   B R E A K  //////////

/**
 * Insert a line break in poem while writing
 */
function insertLineBreak() {
    lineWidths.push(lineWidth);
    poem = poem.concat("\n");
    lineWidth = width/2 + 20;
    period();
}

///////////////  U N D O  /////////////////

/**
 * Delete work from list of selectedWords (and from screen, effectively)
 */
function deleteWord(position) {
    selectedWords.splice(position, 1); 
}

/**
 * Undo last action in writing poem
 */
function undoAction() {
    if (poem.length === 0) {
        return;
    }
    
    if(poem[poem.length-1] == "\n") {
        lineWidth = lineWidths[lineWidths.length-1];
        lineWidths.splice(lineWidths.length-1,1);
    } else {
        var temp = font.textBounds(poem[poem.length-1], 0, 0, 22);
        lineWidth = lineWidth - (temp.w + (margin*2));
    }
    
    if(poem[poem.length-1] != "\n") {
        selectedWords.push(new Word(poem[poem.length-1], selectedWords.length));
    }
    poem.splice(poem.length-1,1);
    period();
}



////////////////  E N D I N G  //////////////////

/**
 * Submit final poem
 */
function submitPoem() {
     submitbutton.style('display', 'none');
     
     if (poem.length >= 1) {
         if (titleinput.value() != "") {
            title = titleinput.value().toLowerCase();
        } else {
            title = "untitled";
        }
    
        if (authorinput.value() != "") {
            author = authorinput.value().toLowerCase();
        } else {
            author = "anonymous";
        }
         
        formatFinalPoem();
        drawPoemCanvas();
        displayFinalPoem();
     } else {
         authorinput.style('display', 'none');
         titleinput.style('display', 'none');
         goToHomepage();
     }
 }

/**
 * Format poem and push to firebase
 */
function formatFinalPoem() {
    finalPoem = [];
    var line = "";
    for (let i = 0; i < poem.length; i++) {
        if (poem[i] != "\n") {
            if (poem[i-1] == "\n" || i == 0) {
                line = line + poem[i];
            } else {
                line = line + " " + poem[i];
            }

            if (i == poem.length-1) {
                finalPoem = finalPoem.concat(line);
                line = "";
            }
        } else if (poem[i] == "\n") {
            finalPoem = finalPoem.concat(line);
            finalPoem = finalPoem.concat("\n");
            line = "";
        } 
    }
    
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });
    
    var newpoem = {
        title: title,
        author: author,
        poem: finalPoem,
        source: selectedPoet
    }
    
    ref.push(newpoem);
}

/**
 * Display final poem
 */
function displayFinalPoem() { 
    rectMode(CENTER);
    textFont(font);
    
    
    for (let i = 0; i < finalPoem.length; i++) {
        finalPoem[i] = finalPoem[i].replace("\n", "\\n");
    }
    
    thisStylizedPoem = stylizePoem(finalPoem, author, title, selectedPoet);
   
    textAlign(RIGHT);
    textSize(12);
    fill(191,191,191,70);
    numberOfLines = finalPoem.length + 15;
    var ypos = 100;
    for (var j = 1; j < numberOfLines; j++) {
        text(j, width/6 - 50, ypos);
        ypos += 20.1;
    }
    
    textAlign(LEFT);
    textSize(16);
    fill(191,191,191);
    text(join(thisStylizedPoem, " "), width/6, 100);
}

/**
 * @param array of lines of poem
 * @param author string of user author
 * @param title string
 * @param poet source string
 *
 * Sylize poem within code for displaying
 */
function stylizePoem(poem, author, title, source) {
    var stylizedPoem = [];
    stylizedPoem = stylizedPoem.concat("var author1 = " + author + ";\nvar author2 = programmable_poetry;\nvar source = " + source + ";\nvar title = " + title + ";\nvar poem = [];\n\nfunction setup() {\n\tpoem = poem.concat(\n\t\t\"" + join(poem, "\",\n\t\t\"") + "\"\n\t);\n}\n\nfunction draw() {\n\tprint(join(poem, \" \"));\n}");
    return stylizedPoem;
}

/**
 * open window dialog box for printing poem at home
 */
function printAtHome() {
    americaexplain.style('display', 'none');
    downloadbutton.style('display', 'none');
    gallerybutton.style('display', 'none');
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    fill(0);
    textSize(18);
    textFont(font);
    textAlign(LEFT);
    text(join(thisStylizedPoem, " "), width/6, 100);
    
    window.print();
    drawPoemCanvas();
    displayFinalPoem();
}

/**
 * Reveal or hide explanation pop-up
 */
function explanationPopUp() {
    americaexplainsctive = !americaexplainsctive;
    
    if (americaexplainsctive == true) {
        americaexplain.style('background-color', '#212121');
        fill("#3e3e3e");
    } else {
        americaexplain.style('background-color', '#3e3e3e');
        fill("#212121");
    }
    rect(width-270,320,400,310);
    
    if (americaexplainsctive == true) {
        fill("#bfbfbf");
    } else {
        fill("#212121");
    }
    textSize(12);
    textFont(font);
    textAlign(LEFT);
    text("the code to the left displays your poem using p5.js, the coding language used to build programmable_poetry. \n\nlines 1-5 identify the two authors of the poem (you and programmable_poetry), the title of your poem, and source poet you chose. \n\n\nin lines 7-" + (numberOfLines-5) + ", each line of your poem is added to a list (\"\\n\" = line break). \n\nfinally, in lines " + (numberOfLines-3) + "-" + (numberOfLines-1) + ", your poem is digitally \"printed\" to the console, similarly to how you can physically print your poem at home with the button below.", width-270, 350, 325, 295);

    // the code to the left displays your poem using p5.js, a JavaScript client-side library that was used to build the program you used to create it. the code snippet here assigns your name and the name as the program to different \"author\" variables, the title to a \"title\" variable, and the poem as an empty array (or list). the poem array is then filled with the lines of your poem and, finally, \"printed\" to the console, similarly to how your poem prints physically for you to take home.
}



//////////////////  G A L L E R Y  //////////////////

/**
 * @param x value of where to place poem
 * @param y value of where to place poem
 *
 * Draws poem on to the gallery page
 */
function addToGallery(x,y) {
    var receiptpaper = font.textBounds(join(thisStylizedPoem, " "), x, y, 10);
    // adding margin
    receiptpaper.x = receiptpaper.x - 10;
    receiptpaper.y = receiptpaper.y - 10;
    
    rectMode(CORNER);
    fill(191,191,191,250);
    
    var paperLength = assignPaperLength(finalPoem);
    rect(receiptpaper.x - 150, receiptpaper.y, 300, paperLength);
    
    rectMode(CENTER);
    fill(33,33,33);
    textSize(10);
    textFont(font);
    textAlign(LEFT);
    text(join(thisStylizedPoem, " "), x - 150, y);
    
    placePoem = false;
}

/**
 * @param data retrieved from firebase
 *
 * Collects keys from database poems
 */
function gotData(data) {
    pastpoems = data.val();
    keys = Object.keys(pastpoems);
}

/**
 * @param error code
 *
 * Logs error to console if program cannot retrieve data from firebase
 */
function errData(err) {
    console.log("An error occured: " + err);
}

/**
 * @param number of poems to display in gallery
 *
 * Draws poems from firebase into gallery
 */
function putPastPoemsInGallery(n) {
    var selectedKeys = [];
    selectedPastPoems = [];
    for (let i = 0; i < n; i++) {
      selectedKeys.push(random(keys));
    }
    
    for (let j = 0; j < selectedKeys.length; j++) {
        selectedPastPoems.push(new pastPoem(keys[j], j)); 
    }
    
    for (let k = 0; k < selectedPastPoems.length; k++) {
        selectedPastPoems[k].avoidOverlap();
    }
}

/**
 * @param array containing lines of poem
 *
 * Determines height of rectangle poems in gallery are enclosed in
 */
function assignPaperLength(poemArray) {
    var paperLength;
    if (poemArray.length <= 3) {
        paperLength = 225;
    } else if (poemArray.length <= 5) {
        paperLength = 250;
    } else if (poemArray.length <= 7) {
        paperLength = 275;
    } else if (poemArray.length <= 9) {
        paperLength = 300;
    } else if (poemArray.length <= 11) {
        paperLength = 325;
    } else if (poemArray.length <= 13) {
        paperLength = 350;
    } else if (poemArray.length <= 15) {
        paperLength = 375;
    } else if (poemArray.length <= 17) {
        paperLength = 400;
    } else if (poemArray.length <= 19) {
        paperLength = 425;
    } else {
        paperLength = 450;
    }
    return paperLength;
}



//////////////////  S T A R T   O V E R  ///////////////////

/**
 * Return to homepage
 */
function goToHomepage() {
    resetEverything();
    drawHomeScreen();
}

/**
 * Reset all poem-writing variables so user can write a new poem
 */
function resetEverything() {
    homepageactive = true;
    titleauthorscractive = false;
    writingscractive = false;
    poemscractive = false;
    galleryscractive = false;
    selectedWords = [];
    allWords = [];
    poem = [];
    finalPoem = [];
    thisStylizedPoem = [];
    source = "";
    selected = false;
    selectedPoet = "";
    lineWidth = (width/2) + 20;
    lineWidths = [];
    title = "";
    author = "";
    placePoem = false;
    americaexplainsctive = false;
    numberOfLines = 0;
    peskybug = true;
}



//////////////////  B U T T O N  P R E S S E D  ////////////////

/**
 * Check to see if button was pressed
 */
function mousePressed() {
    
    if (writingscractive == true) {
        for (let i = 0; i < selectedWords.length; i++) {
            selectedWords[i].clicked();
        }
    }
    
    if (galleryscractive == true && placePoem == true) {
        addToGallery(mouseX, mouseY);
    }
}




//////////////////  P A S T   P O E M  ////////////////////

class pastPoem {
    constructor(key, position) {
        this.key = key;
        this.position = position;
        this.title = pastpoems[this.key].title;
        this.author = pastpoems[this.key].author;
        this.source = pastpoems[this.key].source;
        this.tempPoem = pastpoems[this.key].poem;
        this.poem = [];
        for (var j = 0; j < this.tempPoem.length; j++) {
            if (this.tempPoem[j] == "\n") {
                this.poem.push("\\n");
            } else {
                this.poem.push(this.tempPoem[j]);
            } 
        }
        this.stylizedPoem = stylizePoem(this.poem, this.author, this.title, this.source);
        
        this.xpos;
        this.ypos;
        this.receiptpaper;
        this.paperLength;
        
        this.left;
        this.right;
        this.top;
        this.bottom;
        
        this.displayable = false;
        this.displayed = false;
        this.attempts = 0;
    }
    
    avoidOverlap() {
        this.xpos = random(10, width-300);
        this.ypos = random(100, height-450);
        
        
        
        this.receiptpaper = font.textBounds(join(this.stylizedPoem, " "), this.xpos, this.ypos, 10);
        // adding margin
        this.receiptpaper.x = this.receiptpaper.x - 10;
        this.receiptpaper.y = this.receiptpaper.y - 10;
        
        this.paperLength = assignPaperLength(this.poem);
        
        this.left = this.receiptpaper.x + marginGallery;
        this.right = this.receiptpaper.x + 300 + marginGallery;
        this.top = this.receiptpaper.y + marginGallery;
        this.bottom = this.receiptpaper.y + this.paperLength + marginGallery;
        
        if (this.position == 0) {
            this.displayable = true;
        } else {
            // else, check to see if it overlaps with any other words
            for (let i = 0; i < this.position; i++) {
                var other = selectedPastPoems[i];;
                if (other.left > this.right || other.right < this.left || other.top > this.bottom || other.bottom < this.top) {
                    
                    this.displayable = true;
                } else {
                    this.displayable = false;
                    // when it overlaps one, it is not displayable
                    this.attempts++;
                    break;
                }
            }
        }
        
        
        if (this.displayable == true) {
            this.display();
        } else {
            // if it's not displayable, try again
            if (this.attempts < attemptsTimeOut) {
                this.avoidOverlap();
            }
        }
    }
    
    display() {
        rectMode(CORNER);
        fill(191,191,191,250);
        rect(this.receiptpaper.x, this.receiptpaper.y, 300, this.paperLength);

        rectMode(CENTER);
        fill(33,33,33);
        textSize(10);
        textFont(font);
        textAlign(LEFT);
        text(join(this.stylizedPoem, " "), this.xpos, this.ypos);
        this.displayed = true;
    }
}



//////////////////    W O R D   C L A S S     //////////////////

class Word {
    constructor(word, position) {
        this.word = word;
        this.x;
        this.y;
        this.r = 33;
        this.g = 33;
        this.b = 33;
        this.position = position;
        this.active
        this.displayed = false;
        this.hovered = false;
        this.displayable = false;
        this.bbox;
//        this.topleftx;
//        this.toprightx;
//        this.bottomleftx;
//        this.bottomrightx;
//        this.toplefty;
//        this.toprighty;
//        this.bottomlefty;
//        this.bottomrighty;
        this.attempts = 0;
        this.left;
        this.right;
        this.top;
        this.bottom;
    }
    
    updatePosition(i) {
        this.position = i;
    }
    
    avoidOverlap() {
//        rectMode(CORNER);
        
        this.x = random(100, (width/2)-110);
        this.y = random(80, height-180);
        this.bbox = font.textBounds(this.word, this.x, this.y, 18);
        
        // adding margin around word
        this.bbox.x = this.bbox.x - 10;
        this.bbox.y = this.bbox.y - 10;
        this.bbox.w = this.bbox.w + 20;
        this.bbox.h = this.bbox.h + 20;
        
//        // assign corners
//        this.topleftx = this.bbox.x;
//        this.toplefty = this.bbox.y;
//        
//        this.toprightx = this.bbox.x + this.bbox.w;
//        this.toprighty = this.bbox.y;
//        
//        this.bottomleftx = this.bbox.x;
//        this.bottomlefty = this.bbox.y + this.bbox.h;
//        
//        this.bottomrightx = this.bbox.x + this.bbox.w;
//        this.bottomrighty = this.bbox.y + this.bbox.h;
        // define edges of bounding box (+ margin)

        this.left = this.bbox.x + margin;
        this.right = this.bbox.x + this.bbox.w + margin;
        this.top = this.bbox.y + margin;
        this.bottom = this.bbox.y + this.bbox.h + margin;
        
        // if it's the first word, display it
        if (this.position == 0) {
            this.displayable = true;
        } else {
            // else, check to see if it overlaps with any other words
            for (let i = 0; i < this.position; i++) {
                var other = selectedWords[i];
                if (other.left > this.right || other.right < this.left || other.top > this.bottom || other.bottom < this.top) {
                    this.displayable = true;
                } else {
                    this.displayable = false;
                    // when it overlaps one, it is not displayable
                    this.attempts++;
                    break;
                }
            }
        }
        
      
        if (this.displayable == true) {
            this.display();
        } else {
            // if it's not displayable, try again
            if (this.attempts < attemptsTimeOut) {
                this.avoidOverlap();
            } else {
                //print("fucking sucks");
                //generateRandom(allWords, 1);
            }
        }
    }

    display() {
        rectMode(CORNER);
        textAlign(CENTER);
        if (this.hover) {
            fill(240);
        } else if (!this.hover) {
            fill(191,191,191);
        }
        
        rect(this.bbox.x, this.bbox.y, this.bbox.w, this.bbox.h);
        fill(this.r, this.g, this.b);
        noStroke();
        textSize(16);
        textFont(font);
        text(this.word, this.x, this.y); 
        this.displayed = true;
    }
    
    clicked() {
        if (mouseX >= this.bbox.x && mouseX <= this.bbox.x + this.bbox.w && mouseY >= this.bbox.y && mouseY <= this.bbox.y + this.bbox.h) {
            lineWidth += this.bbox.w + (margin*2);
            
            if (lineWidth > width-50) {
                insertLineBreak();
                lineWidth += this.bbox.w + margin;
            }
            poem = poem.concat(this.word);
            this.displayed = false;
            deleteWord(this.position);
            generateRandom(allWords, 1);
            period();
                // debug
//                push();
//                stroke(255,0,0);
//                line(lineWidth, 15, lineWidth, 100);
//                pop();
        }
    }
    
    hovering() {
        if (mouseX >= this.bbox.x && mouseX <= this.bbox.x + this.bbox.w && mouseY >= this.bbox.y && mouseY <= this.bbox.y + this.bbox.h) {
            this.hover = true;
            writeSelectedWords();
        } else {
            this.hover = false;
            writeSelectedWords();
        }
    }
}