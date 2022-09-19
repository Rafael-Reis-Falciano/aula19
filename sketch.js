var fundoImg, carroImg, fundo, carro, obstaculoImg, obstaculo, gameOverImg, imagem;
var obstaculos;
var gameState = 1;

function preload(){
    fundoImg = loadImage("imgFundo.png");
    carroImg = loadImage("carro.png");
    obstaculoImg = loadImage("obstaculo.png");
    gameOverImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(400, 400);

    fundo = createSprite(200, 200);
    fundo.addImage(fundoImg);
    fundo.velocityY = 5;
    fundo.scale = 7;
    
    carro = createSprite(130, 300);
    carro.addImage(carroImg);
    carro.scale = 0.2;

    obstaculos = new Group();
}

function draw() {
    background('black');

    fundo.velocityY = 12;
    if(fundo.y > 250){
        fundo.y = height/2;
    }

    if(keyDown('right') & carro.position.x < 200){
        carro.position.x = 270;
    }
    if(keyDown('left') & carro.position.x > 200){
        carro.position.x = 130;
    }

    if(carro.collide(obstaculos)){
        gameState = 2
    }

    gerarObstaculos();

    if(gameState === 2) {
        fundo.velocityY = 0;
        obstaculos.setVelocityYEach(0);
        carro.destroy();
        obstaculos.destroyEach();
        imagem = createSprite(200,200);
        imagem.addImage(gameOverImg);
        imagem.scale = 0.4;
    }

    drawSprites();
}

function gerarObstaculos() {
    if(frameCount %30 === 0){
        var posicoesObstaculos = [130, 270];
        var posicaoAleatoria = random(posicoesObstaculos);

        obstaculo = createSprite(posicaoAleatoria, -30);
        obstaculo.addImage(obstaculoImg);
        obstaculo.velocityY = 12;
        obstaculo.lifetime = 150;
        obstaculo.scale = 0.1;
        obstaculos.add(obstaculo)
    }
}