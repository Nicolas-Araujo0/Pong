const player = document.querySelector("#player");
const enemy = document.querySelector("#enemy");
const ball = document.querySelector("#ball")
const score = document.querySelector("h2")
const stick = document.querySelector(".stick")
const parameters = document.querySelector(".parameters")
const validate = document.querySelector("#validate")

const megumin = document.querySelector("#megumin");
const leftExplo = document.querySelector("#left");
const rightExplo = document.querySelector("#right")
const goalAnimation = document.querySelector("#goal")

let ballY = 49;
let ballX = 50;
let stickHeight;
let playerY;
let enemyY;
let ballSpeedX, ballSpeedY;
let gameStart = false;
let scoreMultiplier = 1;

let paddleSelect;

//Verify form and apply change for ball / colours / pabble
function validateForms() {
    if ((document.querySelector("#ballSize0").checked || document.querySelector("#ballSizeSmall").checked || document.querySelector("#ballSizeMedium").checked || document.querySelector("#ballSizeLarge").checked || document.querySelector("#ballSizeXXL").checked) && (document.querySelector("#paddleSize0").checked || document.querySelector("#paddleSizeSmall").checked || document.querySelector("#paddleSizeMedium").checked || document.querySelector("#paddleSizeLarge").checked || document.querySelector("#paddleSizeXXl").checked) && (document.querySelector("#basic").checked || document.querySelector("#rainbow").checked || document.querySelector("#dark").checked) && (document.querySelector("#normal").checked) || (document.querySelector("#pepe").checked) || (document.querySelector("#camille").checked)) {



        /* ballSize check*/
        if (document.querySelector("#ballSize0").checked) {
            ball.classList.add("ballWut")
        }
        else if (document.querySelector("#ballSizeSmall").checked) {
            ball.classList.add("ballSmall")
        }
        else if (document.querySelector("#ballSizeMedium").checked) {
            ball.classList.add("ballMedium")
        }
        else if (document.querySelector("#ballSizeLarge").checked) {
            ball.classList.add("ballLarge")
        }
        else if (document.querySelector("#ballSizeXXL").checked) {
            ball.classList.add("ballXXL")
        }
        /* Paddle Size */
        if (document.querySelector("#paddleSize0").checked) {
            stickHeight = 2;
            paddleSelect = 1;
        }
        else if (document.querySelector("#paddleSizeSmall").checked) {
            stickHeight = 6;
            paddleSelect = 2;
        }
        else if (document.querySelector("#paddleSizeMedium").checked) {
            stickHeight = 12;
            paddleSelect = 3;
        }
        else if (document.querySelector("#paddleSizeLarge").checked) {
            stickHeight = 20;
            paddleSelect = 4;
        }
        else if (document.querySelector("#paddleSizeXXl").checked) {
            stickHeight = 40;
            paddleSelect = 5;
        }

        /* Colours change */

        if (document.querySelector("#basic").checked) {
            ball.classList.add("white")
            player.classList.add("white")
            enemy.classList.add("white")
        }
        else if (document.querySelector("#rainbow").checked) {
            ball.classList.add("rainbow")
            player.classList.add("rainbow")
            enemy.classList.add("rainbow")
        }
        else if (document.querySelector("#dark").checked) {
            ball.classList.add("dark")
            player.classList.add("dark")
            enemy.classList.add("dark")
            score.classList.add("dark")
            document.querySelector("main").classList.add("white")
        }

        /* Ball aspect */
        if (document.querySelector("#normal").checked) {
            console.log("rien") 
        } 
        else if (document.querySelector("#pepe").checked) {
            ball.classList.add("pepe")
        }

        parameters.style.display = "none";
        gameStart = true;
        playerY = 50 - (stickHeight / 2);
        enemyY = 50 - (stickHeight / 2);
        player.style.height = stickHeight + "vh"
        enemy.style.height = stickHeight + "vh"
        player.style.top = playerY + "vh"
        enemy.style.top = playerY + "vh"
        ballSpeedX = 1, ballSpeedY = 1;

    }
    else {
        alert("Form is not valid")
    }

    if (gameStart == true) {
        document.addEventListener("keydown", function (event) {
            let name = event.key;
            let code = event.code;
            console.log(event.key, event.code)

            //Player input Movement Paddle
            if (name == "z" && code == "KeyW") {
                if (playerY != 0) {
                    playerY -= 2;
                    player.style.top = playerY + "vh";
                    console.log(playerY);
                }
            }
            if (name == "s" && code == "KeyS") {
                if (playerY < 100 - stickHeight) {
                    playerY += 2;
                    player.style.top = `${playerY}vh`;
                    console.log(playerY)
                }
            }
            if (name == "ArrowUp" && code == "ArrowUp") {
                if (enemyY != 0) {
                    enemyY -= 2;
                    enemy.style.top = enemyY + "vh";
                    console.log(enemyY);
                }
            }
            if (name == "ArrowDown" && code == "ArrowDown") {
                if (enemyY < 100 - stickHeight) {
                    enemyY += 2;
                    enemy.style.top = `${enemyY}vh`;
                    console.log(enemyY)
                }
            }

        })

        // Base Score
        let gameEnded = false;
        let playerScore = 0;
        let enemyScore = 0;
        let rebond = 0;

        function moveBall(directionX, directionY) {
            if (rebond == 4) {
                if (stickHeight > 2) {
                    stickHeight -= 2;
                }
                player.style.height = stickHeight + "vh"
                enemy.style.height = stickHeight + "vh"
                rebond = 0;
                scoreMultiplier++
            }

            /* AUTO PLAY
            playerY = ballY-2;
            player.style.top = playerY + "vh";
            enemyY = ballY-2;
            enemy.style.top = enemyY + "vh";

            */
            if (!gameEnded) {

                // Direction Horizontale
                if (directionX) {
                    ballX += ballSpeedX;
                } else {
                    ballX -= ballSpeedX;
                }

                // Direction Verticale

                if (directionY == 2) {
                    ballY -= (ballSpeedY * 2);
                } else if (directionY == 1) {
                    ballY -= ballSpeedY;
                } else if (directionY == -1) {
                    ballY += ballSpeedY;
                } else if (directionY == -2) {
                    ballY += (ballSpeedY * 2);
                }
                ball.style.left = ballX + "%"
                ball.style.top = ballY + "vh"

                // Vérification rebond barre

                if (ballX < 2 && playerY <= ballY && ballY <= playerY + Math.round(stickHeight * .2)) {
                    directionY = 2
                    directionX = true;
                    rebond++
                } else if (ballX < 2 && playerY + Math.round(stickHeight * .2) <= ballY && ballY <= playerY + Math.round(stickHeight * .4)) {
                    directionY = 1;
                    directionX = true;
                    rebond++
                } else if (ballX < 2 && playerY + Math.round(stickHeight * .4) <= ballY && ballY <= playerY + Math.round(stickHeight * .6)) {
                    directionY = 0;
                    directionX = true;
                    rebond++
                } else if (ballX < 2 && playerY + Math.round(stickHeight * .6) <= ballY && ballY <= playerY + Math.round(stickHeight * .8)) {
                    directionY = -1;
                    directionX = true;
                    rebond++
                } else if (ballX < 2 && playerY + Math.round(stickHeight * .8) <= ballY && ballY <= playerY + stickHeight) {
                    directionY = -2;
                    directionX = true;
                    rebond++
                }
                if (ballX >= 97 && enemyY <= ballY && ballY <= enemyY + Math.round(stickHeight * .2)) {
                    directionY = 2
                    directionX = false;
                    rebond++
                } else if (ballX >= 97 && enemyY + Math.round(stickHeight * .2) <= ballY && ballY <= enemyY + Math.round(stickHeight * .4)) {
                    directionY = 1;
                    directionX = false;
                    rebond++
                } else if (ballX >= 97 && enemyY + Math.round(stickHeight * .4) <= ballY && ballY <= enemyY + Math.round(stickHeight * .6)) {
                    directionY = 0;
                    directionX = false;
                    rebond++
                } else if (ballX >= 97 && enemyY + Math.round(stickHeight * .6) <= ballY && ballY <= enemyY + Math.round(stickHeight * .8)) {
                    directionY = -1;
                    directionX = false;
                    rebond++
                } else if (ballX >= 97 && enemyY + Math.round(stickHeight * .8) <= ballY && ballY <= enemyY + stickHeight) {
                    directionY = -2;
                    directionX = false;
                    rebond++
                }

                if (ballY >= 101 && directionY == -2) {
                    directionY = 2
                }
                if (ballY >= 101 && directionY == -1) {
                    directionY = 1
                }
                if (ballY <= 0 && directionY == 1) {
                    directionY = -1
                }
                if (ballY <= 0 && directionY == 2) {
                    directionY = -2
                }
                // Vérification sortie du terrain
                if (ballX <= -2 || ballX >= 100) {
                    gameEnded = true;
                    if (ballX <= 0) {
                        let goal = 1 * scoreMultiplier
                        enemyScore += goal
                        goalAnimation.style.display = "block"
                        megumin.style.display = "block"
                        megumin.style.transform = "rotateY(0deg) scale(2.5)"
                        setTimeout(() => {
                            leftExplo.style.display = "block"
                            leftExplo.style.transform = "rotateZ(90deg) scale(3)"
                            leftExplo.style.top = (ballY - 10) + "vh"
                            megumin.style.display = "none"
                        }, 1000);
                        setTimeout(() => {
                            leftExplo.style.display = "none"
                        }, 1500);
                    } else {
                        let goal = 1 * scoreMultiplier
                        playerScore += goal
                        goalAnimation.style.display = "block"
                        megumin.style.display = "block"
                        megumin.style.transform = "rotateY(180deg) scale(2.5)"
                        setTimeout(() => {
                            rightExplo.style.display = "block"
                            rightExplo.style.transform = "rotateZ(270deg) rotateY(180deg) scale(3)"
                            rightExplo.style.top = (ballY - 10) + "vh"
                            megumin.style.display = "none"
                        }, 1000);
                        setTimeout(() => {
                            rightExplo.style.display = "none"
                        }, 1500);
                    }

                    setTimeout(() => {
                        ballX = 50;
                        ballY = 50;
                        directionY = 0;
                        gameEnded = false;
                        if (directionX) {
                            directionX = false
                        } else if (directionX == false) {
                            directionX = true;
                        }
                        if (paddleSelect == 1) {
                            stickHeight = 2;
                        } else if (paddleSelect == 2) {
                            stickHeight = 6;
                        } else if (paddleSelect == 3) {
                            stickHeight = 12;
                        } else if (paddleSelect == 4) {
                            stickHeight = 20;
                        } else if (paddleSelect == 5) {
                            stickHeight = 40;
                        }
                        if (scoreMultiplier == 1) {
                            score.innerHTML = "Player 1: " + playerScore + " / Player 2: " + enemyScore
                        } else {
                            score.innerHTML = "Player 1: " + playerScore + " / Player 2: " + enemyScore + "<br> +" + (scoreMultiplier - 1) + " additionnal points have been given."
                        }
                        scoreMultiplier = 1;
                        ball.style.left = ballX + "%"
                        ball.style.top = ballY + "vh"
                        player.style.height = stickHeight + "vh"
                        enemy.style.height = stickHeight + "vh"
                        playerY = 50 - (stickHeight / 2);
                        enemyY = 50 - (stickHeight / 2);
                        player.style.top = playerY + "vh"
                        enemy.style.top = enemyY + "vh"
                        rebond = 0;
                        window.requestAnimationFrame(() => {
                            moveBall(directionX, directionY);
                        })
                    }, 1500);

                }


                window.requestAnimationFrame(() => {
                    moveBall(directionX, directionY);
                })
            }
        }


        window.requestAnimationFrame(() => {
            moveBall(true, 0);
        })
    }

}