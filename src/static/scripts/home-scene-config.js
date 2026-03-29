const BACKGROUND_COLOR = [0.051, 0.051, 0.051, 1.0];

const FOV = Math.PI / 4; // 45 degrees
const Z_NEAR = 0.1;
const Z_FAR = 100.0;


const SCENE_OBJECTS = [
    
    new ImageObject(
        "static/img/dream_lake_woman.jpg",
        new Vector3(1.3, .67, -2.0),
        new Vector3(0.4, 0.4, 0.0),
    ),

    new ImageObject(
        "static/img/typo.jpg",
        new Vector3(1.9, -1.35, -4.0),
        new Vector3(0.7, 0.7, 0.0),
    ),

    new ImageObject(
        "static/img/blurred_woman.jpg",
        new Vector3(-1.1, -0.8, -3.0),
        new Vector3(0.5, 0.5, 0.0),
    ),

    new ImageObject(
        "static/img/mimic_art.jpg",
        new Vector3(-.45, 0.75, -2.5),
        new Vector3(0.45, 0.45, 0.0),
    ),

    new ImageObject(
        "static/img/home.jpg",
        new Vector3(.33, .44, -1.5),
        new Vector3(.3, .3, .0),
    ),

    new ImageObject(
        "static/img/melotti.jpg",
        new Vector3(-1.8, 0.5, -3.0),
        new Vector3(0.4, 0.4, 0.0),
    ),

    new ImageObject(
        "static/img/dunes.jpg",
        new Vector3(1.4, .4, -4.0),
        new Vector3(0.5, 0.5, 0.0),
    ),

    new ImageObject(
        "static/img/aydee.jpg",
        new Vector3(-1.5, -.7, -2.0),
        new Vector3(0.5, 0.5, 0.0),
    ),

    new ImageObject(
        "static/img/chair.jpg",
        new Vector3(3.0, .4, -4.0),
        new Vector3(.8, .8, 0.0),
    ),

    new ImageObject(
        "static/img/stones.jpg",
        new Vector3(0, .5, -2.0),
        new Vector3(0.25, 0.25, 0.0),
    ),

    new ImageObject(
        "static/img/molho.jpg",
        new Vector3(1.575, -.25, -3.0),
        new Vector3(0.45, .45, 0.0),
    ),

    new ImageObject(
        "static/img/desert_arc.jpg",
        new Vector3(.8, -.2, -2.0),
        new Vector3(0.4, 0.4, 0.0),
    ),

    new ImageObject(
        "static/img/abstract.jpg",
        new Vector3(.3, -.5, -2.0),
        new Vector3(0.2, .2, .0),
    ),

    new ImageObject(
        "static/img/lake.jpg",
        new Vector3(-.35, -.5, -2.0),
        new Vector3(0.35, 0.35, 0.0),
    ),

    new ImageObject(
        "static/img/lake_dune.jpg",
        new Vector3(0.0, -.9, -3.0),
        new Vector3(.36, .36, .0),
    ),

    new ImageObject(
        "static/img/school_photo.jpg",
        new Vector3(-1.3, -.1, -2.0),
        new Vector3(.4, .4, .0),
    ),

    new ImageObject(
        "static/img/dogs.jpg",
        new Vector3(-1, .7, -2.0),
        new Vector3(0.3, .3, .0),
    ),

    new ImageObject(
        "static/img/blurred_man.jpg",
        new Vector3(-.6, -.1, -2.0),
        new Vector3(0.2, .2, .0),
    ),

    new ImageObject(
        "static/img/leaf.jpg",
        new Vector3(-1.5, .5, -4.0),
        new Vector3(.75, .75, .0),
    ),

    new ImageObject(
        "static/img/metal.jpg",
        new Vector3(-2.5, 1.3, -4.0),
        new Vector3(.4, .4, .0),
    ),

    new ImageObject(
        "static/img/pattern.jpeg",
        new Vector3(2.3, -1.3, -4.0),
        new Vector3(0.5, 0.5, 0.0),
    )
]