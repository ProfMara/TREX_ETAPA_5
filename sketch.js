var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_correndo, trex_colidido;
var solo, soloInvisivel, soloIMG;
var grupoNuvem, nuvemIMG;
var grupoObs, obs, obs1, obs2, obs3, obs4, obs5, obs6;
var ponto = 0;
var gameOverImg, restartImg


function preload() {
    trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_colidido = loadAnimation("trex_collided.png");

    soloIMG = loadImage("ground2.png");

    nuvemIMG = loadImage("cloud.png");

    obs1 = loadImage("obstacle1.png");
    obs2 = loadImage("obstacle2.png");
    obs3 = loadImage("obstacle3.png");
    obs4 = loadImage("obstacle4.png");
    obs5 = loadImage("obstacle5.png");
    obs6 = loadImage("obstacle6.png");

    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("gameOver.png")

}

function setup() {
    createCanvas(600, 200);

    trex = createSprite(50, 180, 20, 50);
    trex.addAnimation("correndo", trex_correndo);
    trex.addAnimation("colidido", trex_colidido);
    trex.scale = 0.5;

    solo = createSprite(200, 180, 400, 20);
    solo.addImage("chão", soloIMG);
    solo.x = solo.width / 2;

    /*  gameOver = createSprite(300, 100);
        gameOver.addImage(gameOverImg);

        restart = createSprite(300, 140);
        restart.addImage(restartImg);


        gameOver.scale = 0.5;
        restart.scale = 0.5;
    */
    soloInvisivel = createSprite(200, 190, 400, 10);
    soloInvisivel.visible = false;

    //criar Grupos de Obstáculos e Nuvens
    grupoObs = createGroup();
    grupoNuvem = createGroup();

    trex.setCollider("rectangle", 0, 0, 400, 100);
    trex.debug = true;
    score = 0;

}

function draw() {

    background(180);
    //exibir pontuação
    text("Pontuação: " + ponto, 500, 50);

    if (gameState === PLAY) {

        //mover o chão
        solo.velocityX = -4;
        //pontuação
        ponto = ponto + Math.round(frameCount / 60);

        if (solo.x < 0) {
            solo.x = solo.width / 2;
        }

        //pular quando a tecla espaço é pressionada
        if (keyDown("space") && trex.y >= 100) {
            trex.velocityY = -12;
        }

        //acrescentar gravidade
        trex.velocityY += 0.8;

        //gerar as nuvens
        gerarNuvens();

        //gerar obstáculos no chão
        gerarObs()

        if (grupoObs.isTouching(trex)) {
            gameState = END;
        }

    } else if (gameState === END) {

        solo.velocityX = 0;
        trex.velocityY = 0;

        //mudar a animação do trex


        //definir tempo de vida dos objetos do jogo para que eles nunca sejam destruídos


        grupoObs.setVelocityXEach(0);
        grupoNuvem.setVelocityXEach(0);
    }


    //impedir que trex caia
    trex.collide(soloInvisivel);



    drawSprites();
}

function gerarObs() {
    if (frameCount % 60 === 0) {
        var obs = createSprite(600, 165, 10, 40);
        obs.velocityX = solo.velocityX;

        //gerar obstáculos aleatórios
        var rand = Math.round(random(1, 6));
        switch (rand) {
            case 1:
                obs.addImage(obs1);
                break;
            case 2:
                obs.addImage(obs2);
                break;
            case 3:
                obs.addImage(obs3);
                break;
            case 4:
                obs.addImage(obs4);
                break;
            case 5:
                obs.addImage(obs5);
                break;
            case 6:
                obs.addImage(obs6);
                break;
            default:
                break;
        }

        //atribuir dimensão e tempo de vida ao obstáculo           
        obs.scale = 0.5;
        obs.lifetime = 300;

        //adicionar cada obstáculo ao grupo
        grupoObs.add(obs);
    }
}

function gerarNuvens() {
    //escreva o código aqui para gerar as nuvens
    if (frameCount % 60 === 0) {
        nuvem = createSprite(600, 100, 40, 10);
        nuvem.y = Math.round(random(10, 60));
        nuvem.addImage(nuvemIMG);
        nuvem.scale = 0.5;
        nuvem.velocityX = -3;

        //atribua tempo de vida à variável
        nuvem.lifetime = 210;

        //ajuste a profundidade
        trex.depth = nuvem.depth + 1;

        //adicionar nuvens ao grupo
        grupoNuvem.add(nuvem);
    }
}