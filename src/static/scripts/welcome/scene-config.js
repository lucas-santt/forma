const BACKGROUND_COLOR = [0.051, 0.051, 0.051, 1.0];

const FOV = Math.PI / 4; // 45 degrees
const Z_NEAR = 0.1;
const Z_FAR = 100.0;

IMG_FOLDER = "static/img/bg-home/"

const SCENE_OBJECTS = [
    // Center top row
    new ImageObject(
        IMG_FOLDER + "mimic_art.jpg",
        new Vector3(-.45, 0.65, -2.5),
        new Vector3(0.45, 0.45, 0.0),
    ),

    new ImageObject(
        IMG_FOLDER + "stones.jpg",
        new Vector3(0, .4, -2.0),
        new Vector3(0.25, 0.25, 0.0),
    ),
    
    new ImageObject(
        IMG_FOLDER + "home.jpg",
        new Vector3(.3, .4, -1.5),
        new Vector3(.3, .3, .0),
        0.04,
        0.05,
    ),

    // Center bottom row
    new ImageObject(
        IMG_FOLDER + "lake.jpg",
        new Vector3(-.35, -.55, -2.0),
        new Vector3(0.35, 0.35, 0.0),
        0.04,
        0.03,
    ),

    new ImageObject(
        IMG_FOLDER + "lake_dune.jpg",
        new Vector3(0.0, -1.0, -3.0),
        new Vector3(.36, .36, .0),
    ),

    new ImageObject(
        IMG_FOLDER + "abstract.jpg",
        new Vector3(.32, -.6, -2.0),
        new Vector3(0.2, .2, .0),
    ),

    // Mid right column
    new ImageObject(
        IMG_FOLDER + "dunes.jpg",
        new Vector3(1.4, .4, -4.0),
        new Vector3(0.5, 0.5, 0.0),
    ),

    new ImageObject(
        IMG_FOLDER + "desert_arc.jpg",
        new Vector3(.8, -.2, -2.0),
        new Vector3(0.4, 0.4, 0.0),
    ),

    new ImageObject(
        IMG_FOLDER + "molho.jpg",
        new Vector3(1.575, -.25, -3.0),
        new Vector3(0.45, .45, 0.0),
    ),

    new ImageObject(
        IMG_FOLDER + "typo.jpg",
        new Vector3(1.9, -1.35, -4.0),
        new Vector3(0.7, 0.7, 0.0),
    ),

    new ImageObject(
        IMG_FOLDER + "pattern.jpeg",
        new Vector3(2.3, -1.3, -4.0),
        new Vector3(0.5, 0.5, 0.0),
    ),

    // Far right column
    new ImageObject(
        IMG_FOLDER + "dream_lake_woman.jpg",
        new Vector3(1.25, .665, -2.0),
        new Vector3(0.4, 0.4, 0.0),
    ),

    new ImageObject(
        IMG_FOLDER + "chair.jpg",
        new Vector3(3.0, .4, -4.0),
        new Vector3(.8, .8, 0.0),
    ),

    // Mid left column
    new ImageObject(
        IMG_FOLDER + "womans_face.jpg",
        new Vector3(-1.5, .5, -4.0),
        new Vector3(.75, .75, .0),
    ),

    new ImageObject(
        IMG_FOLDER + "blurred_man.jpg",
        new Vector3(-.6, -.1, -2.0),
        new Vector3(0.2, .2, .0),
    ),

    new ImageObject(
        IMG_FOLDER + "blurred_woman.jpg",
        new Vector3(-1.1, -0.8, -3.0),
        new Vector3(0.5, 0.5, 0.0),
    ),

    // Far left column
    new ImageObject(
        IMG_FOLDER + "dogs_painting.jpg",
        new Vector3(-1, .7, -2.0),
        new Vector3(0.3, .3, .0),
    ),

    new ImageObject(
        IMG_FOLDER + "metal_lake.jpg",
        new Vector3(-2.5, 1.3, -4.0),
        new Vector3(.4, .4, .0),
    ),

    new ImageObject(
        IMG_FOLDER + "melotti.jpg",
        new Vector3(-1.8, 0.5, -3.0),
        new Vector3(0.4, 0.4, 0.0),
    ),

    new ImageObject(
        IMG_FOLDER + "school_photo.jpg",
        new Vector3(-1.3, -.1, -2.0),
        new Vector3(.4, .4, .0),
        0.04,
        0.03,
    ),

    new ImageObject(
        IMG_FOLDER + "aydee.jpg",
        new Vector3(-1.5, -.7, -2.0),
        new Vector3(0.5, 0.5, 0.0),
    ),
]