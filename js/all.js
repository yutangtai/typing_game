console.clear()

// DOM-------------------->
const text_countdown = document.querySelector('#text_countdown')
const text_score = document.querySelector('#text_score')
const keyPress = document.querySelector('#keyPress')
const randomWord = document.querySelector('#randomWord')
const btn = document.querySelector('#btn')

//倒數計時器----------------->
let countdown = 60 //秒數暫定
function timeCount() {
  countdown = 60
  score = 0
  document.addEventListener('keydown', typing)
  let timer = setInterval(function () {
    countdown--
    text_countdown.innerHTML = countdown

    if (countdown < 0) {
      alert('Game over!!! Your score is ' + score)
      text_score.innerHTML = '0'
      keyPress.innerHTML = ''
      randomWord.innerHTML = ''
      btn.disabled = false
      text_countdown.innerHTML = '60' //秒數暫定
      clearInterval(timer) //停止計時
    }
  }, 1000)
}

let strArr //字串轉成陣列
//隨機字串----------------->
function randomString() {
  const characters = 'abcdefghijklmnopqrstuvwxyz' //組成字串的 26 個字母
  let randomStr = '' //空字串
  let char = 0 //字母數量
  let ranChar = 0 //字母位置
  strLen = Math.floor(Math.random() * 6) + 2 //字串隨機長度(至少 2 個字母)

  while (char < strLen) {
    char++
    ranChar = Math.floor(Math.random() * characters.length) //產生隨機數字
    randomStr += characters.substring(ranChar, ranChar + 1) //該隨機數字對應一個字母
  }
  strArr = randomStr.toLocaleUpperCase().split('') //將字串轉陣列
}

// 將鍵入的字母顯示在網頁上---------------->
let newSpan //新增加的 DOM 標籤

function createSpan() {
  randomString()
  //將每個陣列元素單獨成立 span 標籤
  for (let i = 0; i < strArr.length; i++) {
    let span = document.createElement('span') //成立一個新的 span 元素
    span.classList.add('span') //若沒有這一行，NodeList 會是空陣列
    span.innerHTML = strArr[i] //在 span 標籤內輸入字母
    randomWord.appendChild(span) //將新元素加入指定位置
  }
  // newSpan = [...document.querySelectorAll('.span')]
  newSpan = document.querySelectorAll('.span')
  // newSpan = document.getElementsByClassName('span')
}
createSpan()

// 判斷鍵入的字母---------------->
let userType
let userTypeNum = 0 //按下按鍵的次數
let correctNum = 0
let correctTotal = 0

let score = 0

function typing(event) {
  let checker = 0 //檢查是否每個字母已具有背景色
  userType = String(event.code).slice(3)
  console.log(userType)
  userTypeNum++
  keyPress.innerHTML = userType //在畫面上顯示鍵入的字母
  for (let i = 0; i < newSpan.length; i++) {
    if (newSpan[i].innerHTML === userType) {
      //鍵入的字母和陣列中的相同
      if (newSpan[i].classList.contains('bg')) {
        //已有背景色者 => 繼續
        continue
      } else if ((newSpan[i].classList.contains('bg') === false && newSpan[i - 1] === undefined) || newSpan[i - 1].classList.contains('bg') !== false) {
        //沒有背景色，且字母沒出現過，或字母出現過但沒有背景色者 => 增加背景色
        newSpan[i].classList.add('bg')        
        correctNum = i+1
        // console.log(correctNum)
        break
      }
    }
  }
  
  //檢查並計分
  for (let j = 0; j < newSpan.length; j++) {
    // console.log(newSpan[j].classList.contains('span bg')) //為何是 false?
    // console.log(newSpan[j].classList.contains('bg')) //ok
    // console.log(newSpan[j].classList.value === 'span bg') //ok
    
    if (newSpan[j].classList.contains('bg')) {
      checker++
      
      console.log('checker-----------' + checker)
    }
      if (checker === newSpan.length) {
        document.querySelector('#randomWord').classList.remove('span')
        randomWord.classList.add('animate__animated')
        randomWord.classList.add('animate__fadeOut')
        score++
        text_score.innerHTML = score
        // console.log('score' + score)      
        
        document.removeEventListener('keydown', typing)
        
        setTimeout(function () {
          randomWord.classList.remove('animate__animated')
        randomWord.classList.remove('animate__fadeOut')
        checker = 0
        randomWord.innerHTML = ''
        createSpan()
        document.addEventListener('keydown', typing)
      }, 400)
    }
  }
}

function correct(){
  if(correctNum ++){
    console.log('增加的正確數:' + correctNum)
    correctTotal += (correctNum - (correctNum-1))
    console.log('總正確數:' + correctTotal)
  }    
}

//點擊按鈕監聽--------------->
btn.addEventListener('click', function (e) {
  console.clear()
  randomWord.innerHTML = ''
  userTypeNum = 0
  correctNum = 0
  timeCount()
  createSpan()
  btn.disabled = true

  document.addEventListener('keydown', typing)
  document.addEventListener('keydown', correct)
})

/*參考資料：
1.將 Node.list 轉陣列: https://www.jstips.co/zh_tw/javascript/converting-a-node-list-to-an-array/*/
