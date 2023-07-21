<!doctype html>
<html lang="ru">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title>Кофе-машина</title>
  </head>
  <body>
    <div class="container">
      <div class="row mt-2">
        <div class="col-6 coffee-list d-flex flex-column justify-content-around">
          <div class="coffee-item" cost="50" data-name="Американо" data-name-eng="Americano" onclick="cookCoffee('Американо', 50, this)">
            <img src="img/americano.png" alt="Американо">
            <span>Американо - 50 руб.</span>
          </div>
          <div class="coffee-item" onclick="cookCoffee('Капучино', 92, this)">
            <img src="img/cappuccino.png" alt="Капучино">
            <span>Капучино - 92 руб.</span>
          </div>
          <div class="coffee-item" onclick="cookCoffee('Эспрессо', 66, this)">
            <img src="img/espresso.png" alt="Эспрессо">
            <span>Эспрессо - 66 руб.</span>
          </div>
          <div class="coffee-item" onclick="cookCoffee('Латтэ', 128, this)">
            <img src="img/latte.jpg" alt="Латтэ">
            <span>Латтэ - 128 руб.</span>
          </div>
        </div>
        <div class="col-6 coffee-oper">
          <div class="row">
            <div class="col-6">
              <div class="display">
                <span>Выберите кофе</span>
                <div class="progress mt-2">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 0%"></div>
                </div>
              </div>
              <div class="cup mt-3">
                <img src="img/americano.png">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-3">
                <input type="text" class="form-control balance" placeholder="Баланс" readonly>
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2">&#8381;</span>
                </div>
              </div>
              <div class="atm">
                <div class="cash-container"></div>
                <img src="img/bill_acc.png" alt="">
              </div>
              <button class="my-3 btn btn-primary btn-block change-button">Сдача</button>
              <div class="change-box">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="money">
      <img src="img/50rub.jpg" data-cost="50" alt="">
      <img src="img/100rub.jpg" data-cost="100" alt="">
      <img src="img/500rub.jpg" data-cost="500" alt="">
    </div>
    <!-- Optional JavaScript -->
    <!--<script src="lesson.js"></script>-->
    <script src="script.js"></script>
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  </body>
</html>