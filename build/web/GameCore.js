/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//related to server
var socket = new WebSocket("ws://localhost:8080/Orbs/actions");
var players;
var id;
//state to detect if control changed
var previousControlState = {
        action: "update",
        up: false,
        down: false,
        left: false,
        right: false
        };
        
socket.onmessage = onMessage;

function onMessage(event) {
    var  content = JSON.parse(event.data);
    if (content.action === "add") {
        //printDeviceElement(content);
        id = content.id;
        console.log("id received " + id);
    }
    if (content.action === "remove") {
        document.getElementById(content.id).remove();
        //device.parentNode.removeChild(device);
    }
    if (content.action === "toggle") {
        var node = document.getElementById(content.id);
        var statusText = node.children[2];
        if (content.status === "On") {
            statusText.innerHTML = "Status: " + content.status + " (<a href=\"#\" OnClick=toggleDevice(" + content.id + ")>Turn off</a>)";
        } else if (content.status === "Off") {
            statusText.innerHTML = "Status: " + content.status + " (<a href=\"#\" OnClick=toggleDevice(" + content.id + ")>Turn on</a>)";
        }
    }

}

// conection functions
function startSession(){
    var message = {
        action: "connect"
    };
    socket.send(JSON.stringify(message));
}

function updateControls(controls){
    var controlState = {
        action: "update",
        up: controls.up,
        down: controls.down,
        left: controls.left,
        right: controls.right
    };
    
    if(changedState(controls)){
        socket.send(JSON.stringify(controlState));
        previousControlState = controlState;
    }
}

function changedState(newState){

    return (previousControlState.up !== newState.up
            || previousControlState.down !== newState.down
            || previousControlState.left !== newState.left
            || previousControlState.right !== newState.right
            );
}

//keeps the state of keys
var keys;

//configuration of renderer
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    var game = new Phaser.Game(config);
    
 // load assets   
     function preload ()
    {
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
        startSession();
    }

//starts objects on scene
    function create ()
    {   
        keys = this.input.keyboard.createCursorKeys();
        this.add.image(400, 300, 'sky');

        var particles = this.add.particles('red');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        var logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
    }

//executed every frame
function update(){

    var controlState = {
        up: keys.up.isDown,
        down: keys.down.isDown,
        left: keys.left.isDown,
        right: keys.right.isDown
        
    };
    
    updateControls(controlState);
    //console.log();
}


