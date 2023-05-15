const canvas = document.getElementById("canvas");       // canvas düzenlemek için çağırdım
const hsn = canvas.getContext('2d');

var samuray = new Image();
var arkaresim = new Image();  // nesneleri tanımladım 
var biftek = new Image();
var ateş = new Image();
ateş.src = "fire.png"
arkaresim.src = "pxfuel.png";   //nesnelerin resimlerini yükledim
samuray.src="pngegg.png";
biftek.src="biftek.png"
var omlet = new Image();
omlet.src = "omlet.png";

var müzik = new Audio();
müzik.src = "leva-eternity-149473.mp3";
müzik.play();

arkaresim.onload = function(){
    draw();         //draw fonksiyonu cağrılınca resim çizilecek
}
var knmb= 610;  //biftek baslangıc konumu
var ats=460;    // ates  "         "
var oml=1300;   // omlet "         "
var samurayY=370;// samuray zıplama baslangıc y konumu
var skor=0;
var smbas=78;
function draw(){
    
    hsn.drawImage(arkaresim,0,0); //resimin çizileceği canvas kordinatları
    hsn.drawImage(samuray,smbas, 390, 50, 150);
    //samurayın resmi baslangıc kordnatları ve genislik yükseklik
    hsn.drawImage(biftek,knmb, 250, 80,80);
    // biftek resmi baslangıc kordnatları ve genislik yükseklik
    hsn.drawImage(ateş,ats,480,90 ,120);
    //ateş resmi baslangıc kordnatları ve genislik yükseklik
    hsn.drawImage(omlet,oml,250,80,80);
    var sra = 4; // oyunu hızlandırmak için değişkenler kullandım
    var bft = 2 ;
    knmb -= bft; //bu değişkenler skor ile birlikte artacak ve kordinatları daha hızlı kayacak
    ats -= sra;
    oml -=1;
    
    if  (knmb < -50 ) {
        // Biftek resmi ekrandan çıktı, yeni bir bftek oluştur
        knmb = 400 + Math.random()*300;
    }

    if (samurayY + 20 >= 450 && samurayY <= 250 + 80 && knmb <= 78 + 50) {
        // Samuray, biftek ile çarpıştı
        skor++;  

        knmb = 400 + Math.random()*300;
    }
    else if (samurayY + 150 >= 250 && samurayY <= 250 + 80 && oml <= 78 + 50) {
        // Samuray, omlet ile çarpıştı
        skor+=3 ;  

        oml = 700 + Math.random()*300;
        //yeni omlet olustur
    }

    if (samurayY + 150 >= 480 && samurayY <= 480 + 120 && (ats<= 78 + 50 )) {
        // Samuray, ateş ile çarpıştı
            müzik.pause();//müzik durur
              oyunbitti(); // oyun bitti fonksiyonunu çağırır
    }

    if (ats < -20) {
        // Ateş resmi ekrandan çıktı, yeni bir ateş oluştur
        ats = 450 + Math.random()*400;
    }
    
    hsn.fillStyle="white";
        hsn.font = "20px verdena"; // skor yazdırır
        hsn.fillText(skor, 550,120);
        if(skor%4==0){
            sra++;
            bft++;
        }
          
    window.requestAnimationFrame(draw);
    
    
    }

    function jump() {
        hsn.clearRect(78,390,50,150); // eski yeri silmeyi çalıştıramadım 
        
        var zipy = 100; // Samuray'ın zıplama yüksekliği
        var zipsüre = 470; // Samuray'ın zıplama süresi
        var zipmesafe = 100; // Samuray'ın zıplama mesafesi
    
        var startTime = null;
        function jumpAnimation(timestamp) {
            if (!startTime) startTime = timestamp; // time stamp zıplamamanın basladığı anı temsil eder.
            var progress = timestamp - startTime;

            //İlk olarak, startTime değişkeni, animasyonun başlama zamanını saklar. Eğer startTime değişkeni henüz tanımlanmamışsa, !startTime ifadesi doğru değer döndürür ve startTime değişkenine timestamp değeri atanır.

            var newY = samurayY - zipy * Math.sin(Math.PI * (progress / zipsüre));
            var newX = smbas  + zipmesafe * (progress / zipsüre);
            //progress baslangıcından itibaren geçen süreyi tutar
            samurayY = Math.max(newY, 250); // Samuray'ın düşmesini engeller
            hsn.drawImage(samuray, newX, samurayY, 50, 150); // Samuray'ın yeni konumunu çizer
            
            if (progress < zipsüre) {
                window.requestAnimationFrame(jumpAnimation); //zıplama tamamlanmadı ise
            } else {
                // Samuray'ın zıplama tamamlandı 
                hsn.drawImage(samuray, newX, 370, 50, 150);
                 // Samuray'ın son konumunu çizer

            }
            
             
        }
        
        window.requestAnimationFrame(jumpAnimation); //zıplamak için tekrar çağırır
    }
    
    
 
    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            jump();     // olay dinleyici space dinler 
        }
        else if(event.code==="ArrowRight"){
            smbas+=10;
        }
        else if(event.code==="ArrowLeft"){
            smbas-=10;
        }
    });
  
    
    function oyunbitti(){
        hsn.fillText("OYUN BİTTİ",500,300);
        knmb ++; //oyun bitince 
    ats ++;      // değişkenlerin yönü değişir ve kacmaya baslar
    oml ++;
    requestAnimationFrame(oyunbitti);
    }
    
     